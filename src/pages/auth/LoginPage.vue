<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import api from "../../axios"
import InputField from "@/components/InputField.vue"

const router = useRouter()

const email = ref(null)
const password = ref(null)
const errors = ref({})
const isProcessing = ref(false)


const submitForm = () => {
  
  if (!email.value) {
    errors.value.email = "Email is required!"
    return
  }
  if (!password.value) {
    errors.value.password = "Passwords is required!"
    return
  }
  isProcessing.value = true

  api.post("/login", {
      email: email.value,
      password: password.value,
    })
    .then(({data}) => {
      if (data.status === 'success' && data.data.token) {
        const token = data.data.token
        localStorage. setItem("token", data.data.token)
        localStorage.setItem('authenticated', true)
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`
        router.push("/")
      }
      isProcessing.value = false
    })
    .catch((error) => {
      isProcessing.value = false
      if(error.response.data.message) {
        errors.value.error = error.response.data.message
      }
      console.log("There was an error fetching the data:", error)
    })
}

const clearError = (field) => {
  errors.value?.[field] ? (errors.value[field]  = "") : ""
  errors.value.error = ""
}

</script>

<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm p-4 bg-dark" style="width: 400px; background-color: #ffffff;">
      <h3 class="text-center mb-4 text-warning">Login</h3>

      <form @submit.prevent="submitForm">

        <div class="mb-3">
          <InputField 
            v-model="email"
            type="email"
            placeholder="Enter your email"
            :error="errors.email"
            @update:modelValue="clearError('email')" 
          />
        </div>

        <div class="mb-5">
          <InputField 
            v-model="password"
            type="password"
            placeholder="Enter your password"
            :error="errors.password"
            @update:modelValue="clearError('password')" 
          />
        </div>

        <button
          type="submit"
          class="btn btn-warning w-100 mb-3 "
          :disabled="isProcessing"
        >
          <span >{{ isProcessing ? "Processing..." : "Login" }}</span>
        </button>

      </form>

      <button
        class="btn btn-secondary w-100 mb-3"
        :disabled="isProcessing"
        @click="router.push('/register')"
      >
        <span>{{ isProcessing ? "Processing..." : "Register" }}</span>
      </button>

      <button
        class="btn btn-link text-white w-100 mb-3"
        :disabled="isProcessing"
        @click="router.push('/forgot-password')"
      >
        <span>Forgot Password?</span>
      </button>

      <div v-if="errors.error" class="alert alert-danger" role="alert">
        {{ errors.error }}
      </div>

    </div>
  </div>
</template>



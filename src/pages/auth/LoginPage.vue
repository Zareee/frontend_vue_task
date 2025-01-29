<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import api from "../../axios"
import InputField from "@/components/InputField.vue"

const router = useRouter()

const email = ref(null)
const password = ref(null)
const errors = ref({})


const submitForm = () => {
  errors.value = {}
  
  if (!email.value) {
    errors.value.email = "Email is required!"
    return
  }
  if (!password.value) {
    errors.value.password = "Passwords is required!"
    return
  }

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
    })
    .catch((error) => {
      if(error.response.data.message) {
        errors.value.error = error.response.data.message
      }
      console.log("There was an error fetching the data:", error)
    })
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
          />
        </div>

        <div class="mb-5">
          <InputField 
            v-model="password"
            type="password"
            placeholder="Enter your password"
            :error="errors.password" 
          />
        </div>

        <button
          type="submit"
          class="btn btn-warning w-100 mb-3 "
        >
          <span >Login</span>
        </button>

      </form>

      <button
        class="btn btn-secondary w-100 mb-3"
        @click="router.push('/register')"
      >
        <span>Register</span>
      </button>

      <button
        class="btn btn-link text-white w-100 mb-3"
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



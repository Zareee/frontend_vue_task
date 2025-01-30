<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import api from "../../axios"
import InputField from "@/components/InputField.vue"

const router = useRouter()

const email = ref(null)
const password = ref(null)
const confirmPassword = ref(null)
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
  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = "Passwords do not match!"
    return
  }
  isProcessing.value = true

  api.post("/register", {
      email: email.value,
      password: password.value,
    })
    .then(() => {
      router.push("/login")
    })
    .catch((error) => {
      isProcessing.value = false
      if (error.response && error.response.data && error.response.data.input) {
        errors.value[error.response.data.input] = error.response.data.message
      }
    })
}

const clearError = (field) => {
  errors.value?.[field] ? (errors.value[field]  = "") : ""
}

</script>

<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm p-4 bg-dark" style="width: 400px; background-color: #ffffff;">
      <h3 class="text-center mb-4 text-warning">Register</h3>
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

        <div class="mb-3">
          <InputField 
            v-model="password"
            type="password"
            placeholder="Enter your password"
            :error="errors.password"
            @update:modelValue="clearError('password')" 
          />
        </div>

        <div class="mb-5">
          <InputField 
            v-model="confirmPassword"
            type="password"
            placeholder="Enter your password"
            :error="errors.confirmPassword"
            @update:modelValue="clearError('confirmPassword')"
          />
        </div>

        <button
          type="submit"
          class="btn btn-warning w-100 mb-3"
          :disabled="isProcessing"
        >
          <span>{{ isProcessing ? "Processing..." : "Register" }}</span>
        </button>
        <button
          class="btn btn-secondary w-100"
          :disabled="isProcessing"
          @click="router.push('/login')"
        >
          <span>{{ isProcessing ? "Processing..." : "Back to Login" }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

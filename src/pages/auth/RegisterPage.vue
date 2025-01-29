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
  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = "Passwords do not match!"
    return
  }

  api.post("/register", {
      email: email.value,
      password: password.value,
    })
    .then(() => {
      router.push("/login")
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.input) {
        errors.value[error.response.data.input] = error.response.data.message
      }
    })
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
          />
        </div>

        <div class="mb-3">
          <InputField 
            v-model="password"
            type="password"
            placeholder="Enter your password"
            :error="errors.password" 
          />
        </div>

        <div class="mb-5">
          <InputField 
            v-model="confirmPassword"
            type="password"
            placeholder="Enter your password"
            :error="errors.confirmPassword" 
          />
        </div>

        <button
          type="submit"
          class="btn btn-warning w-100 mb-3"
        >
          <span>Register</span>
        </button>
        <button
          class="btn btn-secondary w-100"
          @click="router.push('/login')"
        >
          <span>Back to Login</span>
        </button>
      </form>
    </div>
  </div>
</template>

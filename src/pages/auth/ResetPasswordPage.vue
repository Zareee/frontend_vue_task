<script setup>
import { ref } from "vue"
import { useRouter, useRoute  } from "vue-router"
import api from "../../axios"
import InputField from "@/components/InputField.vue"

const router = useRouter()
const route = useRoute()

const token = ref(route.query.token)
const email = ref(route.query.email)
const newPassword = ref(null)
const confirmPassword = ref(null)
const errors = ref({})
const isProcessing = ref(false)


const submitForm = () => {

  errors.value = {}

  if (!newPassword.value) {
    errors.value.newPassword = "Passwords is required!"
    return
  }
  if (!confirmPassword.value) {
    errors.value.confirmPassword = "Confirm passwords is required!"
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    errors.value.confirmPassword = "Passwords do not match!"
    return
  }

  isProcessing.value = true

  api.post("/reset-password", {
      token: token.value,
      email: email.value,
      new_password: newPassword.value
    })
    .then(({data}) => {
      if (data.status === 'success') {
        alert("Password reset successful")
       router.push("/login")
      }
    })
    .catch((error) => {
      console.log("There was an error fetching the data:", error)
    })
}

</script>

<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm p-4 bg-dark" style="width: 400px; background-color: #ffffff;">
      <h3 class="text-center mb-4 text-warning">Reset Password</h3>
      <form @submit.prevent="submitForm">

        <div class="mb-3">
          <InputField 
            v-model="newPassword"
            type="password"
            placeholder="Enter your new password"
            :error="errors.newPassword" 
          />
        </div>
        <div class="mb-5">
          <InputField 
            v-model="confirmPassword"
            type="password"
            placeholder="Enter your new password"
            :error="errors.confirmPassword" 
          />
        </div>

        <button
          type="submit"
          class="btn btn-warning w-100 mb-3"
          :disabled="isProcessing"
        >
          <span>{{ isProcessing ? "Processing..." : "Reset Password" }}</span>
        </button>
      </form>
      <button
        class="btn btn-secondary w-100 mb-3"
        :disabled="isProcessing"
        @click="router.push('/login')"
      >
        <span>{{ isProcessing ? "Processing..." : "Back to Login" }}</span>
      </button>
    </div>
  </div>
</template>

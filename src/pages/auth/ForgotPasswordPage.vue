<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import api from "../../axios"
import InputField from "@/components/InputField.vue"

const router = useRouter()

const email = ref(null)
const errors = ref({})
const isProcessing = ref(false)

const submitForm = () => {

  if (!email.value) {
    errors.value.email = "Email is required!"
    return
  }
  isProcessing.value = true

  api.post("/send-link", {
      email: email.value,
    })
    .then(({data}) => {
      if (data.status === 'success') {
        alert("Link sent to email successful")
        router.push("/login")
      }
      isProcessing.value = false
    })
    .catch((error) => {
      isProcessing.value = false
      console.log("There was an error fetching the data:", error)
    })
}

const clearError = (field) => {
  errors.value?.[field] ? (errors.value[field]  = "") : ""
}

</script>

<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm p-4 bg-dark" style="width: 400px; background-color: #ffffff;">
      <h3 class="text-center mb-4 text-warning">Forgot Password?</h3>
      <form @submit.prevent="submitForm">

        <div class="mb-5">
          <InputField 
            v-model="email"
            type="email"
            placeholder="Enter your email"
            :error="errors.email"
            @update:modelValue="clearError('email')" 
          />
        </div>

        <button
          type="submit"
          class="btn btn-warning w-100 mb-3"
          :disabled="isProcessing"
        >
          <span>{{ isProcessing ? "Processing..." : "Send Email" }}</span>
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

<script setup>
import { defineProps } from "vue";

defineProps({
  message: String,
});

</script>

<template>
  <div v-if="message" class="text-danger small mt-1">
    {{ message }}
  </div>
</template>
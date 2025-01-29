<script setup>
import { defineProps, defineEmits } from "vue"

defineProps(["image", "index"])

const emit = defineEmits(["remove-image"])

</script>

<template>

  <div class="card shadow-sm">
    <img class="card-img-top" :src="image.link" :alt="image.title" />
    <div class="card-body text-white bg-dark">
      
      <h5 class="card-title">{{ `${index + 1}: ${image.title}` }}</h5>

      <button
        class="btn btn-danger btn-sm"
        @click="emit('remove-image', index)"
        title="Remove"
      >
        Remove
      </button>
    </div>
  </div>

</template>



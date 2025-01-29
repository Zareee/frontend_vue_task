<script setup>
import {  defineProps, defineEmits } from "vue"
import ImageCard from "@/components/ImageCard.vue"

const props = defineProps({
  images: Array
})

const emit = defineEmits(["remove-image"])

</script>

<template>
  <div class="container">
    <h1 class="text-center mb-4">Image Gallery</h1>
    <div class="row">

      <div
        class="col-sm-3"
        v-for="(image, index) in props.images"
        :key="index"
      >
        <ImageCard
          :image="image"
          :index="index"
          @remove-image="emit('remove-image', index)"
        />
      </div>

    </div>
  </div>
</template>


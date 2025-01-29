<script setup>
import { ref, onMounted } from "vue"
import ImageGallery from "@/components/ImageGallery.vue"

const images = ref([
  {
    title: "Image 1",
    link: "https://images.unsplash.com/photo-1509223197845-458d87318791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300&h=200",
  },
  {
    title: "Image 2",
    link: "https://images.unsplash.com/photo-1509223197845-458d87318791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300&h=200",
  },
  {
    title: "Image 3",
    link: "https://images.unsplash.com/photo-1509223197845-458d87318791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300&h=200",
  },
  {
    title: "Image 4",
    link: "https://images.unsplash.com/photo-1509223197845-458d87318791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300&h=200",
  },
])

const loaded = ref(false)

onMounted(() => {
  loaded.value = true
})

const removeImage = (index) => {
  images.value.splice(index, 1)
}

</script>

<template>
  <div class="container">

    <ImageGallery
      v-if="loaded"
      :images="images"
      @remove-image="removeImage"
    />

  </div>
</template>


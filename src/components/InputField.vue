<script setup>
import { defineProps, defineEmits , watch, ref } from "vue";
import InputError from "@/components/InputError.vue"

const props = defineProps({
  modelValue: String,
  label: String,
  type: String,
  placeholder: String,
  error: String,
});

const emit = defineEmits(["update:modelValue"]);

const model = ref(props.modelValue);

watch(model, (newValue) => {
  emit("update:modelValue", newValue);
});

</script>

<template>
  <div class="mb-3">
    <label :for="type" class="form-label text-warning">{{ label }}</label>
    <input
      v-model="model"
      :type="type"
      class="form-control"
      :class="{ 'is-invalid': error }"
      :placeholder="placeholder"
    />
    <InputError :message="error" />
  </div>
</template>
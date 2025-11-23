<template>
  <input
    type="text"
    v-model="modelValue"
    placeholder="Search products..."
    class="search-bar"
  />
</template>

<script setup>
defineProps({ modelValue: String })
defineEmits(['update:modelValue'])
</script>

<style scoped>
.search-bar {
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
</style>

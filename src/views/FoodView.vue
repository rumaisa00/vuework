<template>
  <div class="manage-page max-w-6xl mx-auto px-6 py-12">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Manage Food Items</h1>
      <button @click="addFood" class="btn-primary">+ Add Food</button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="food in foods" :key="food.id" class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
        <h2 class="text-xl font-semibold mb-2">{{ food.name }}</h2>
        <p class="text-gray-600 mb-1"><strong>Type:</strong> {{ food.type }}</p>
        <p class="text-gray-600 mb-1"><strong>Quantity:</strong> {{ food.quantity }}</p>
        <p class="mb-4">
          <span
            :class="{
              'badge-available': food.status === 'Available',
              'badge-low': food.status === 'Low Stock'
            }"
            class="px-3 py-1 rounded-full text-white text-sm"
          >
            {{ food.status }}
          </span>
        </p>
        <div class="flex gap-2">
          <button @click="editFood(food)" class="btn-secondary w-full">Edit</button>
          <button @click="removeFood(food.id)" class="btn-danger w-full">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const foods = ref([
  { id: 1, name: 'Dog Food', type: 'Dry', quantity: 50, status: 'Available' },
  { id: 2, name: 'Cat Food', type: 'Wet', quantity: 20, status: 'Low Stock' }
])

const addFood = () => alert('Add Food functionality coming soon')
const editFood = (food) => alert(`Edit ${food.name}`)
const removeFood = (id) => alert(`Remove food ID ${id}`)
</script>

<style scoped>
.btn-primary {
  @apply px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition;
}
.btn-secondary {
  @apply px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition;
}
.btn-danger {
  @apply px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition;
}
.badge-available {
  @apply bg-green-500;
}
.badge-low {
  @apply bg-yellow-500;
}
</style>

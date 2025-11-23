<template>
  <div class="manage-page max-w-6xl mx-auto px-6 py-12">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Manage Supplies</h1>
      <button @click="addSupply" class="btn-primary">+ Add Supply</button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="supply in supplies" :key="supply.id" class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
        <h2 class="text-xl font-semibold mb-2">{{ supply.name }}</h2>
        <p class="text-gray-600 mb-1"><strong>Quantity:</strong> {{ supply.quantity }}</p>
        <p class="mb-4">
          <span
            :class="{
              'badge-available': supply.status === 'Available',
              'badge-low': supply.status === 'Low Stock'
            }"
            class="px-3 py-1 rounded-full text-white text-sm"
          >
            {{ supply.status }}
          </span>
        </p>
        <div class="flex gap-2">
          <button @click="editSupply(supply)" class="btn-secondary w-full">Edit</button>
          <button @click="removeSupply(supply.id)" class="btn-danger w-full">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const supplies = ref([
  { id: 1, name: 'Leash', quantity: 30, status: 'Available' },
  { id: 2, name: 'Bowl', quantity: 10, status: 'Low Stock' }
])

const addSupply = () => alert('Add Supply functionality coming soon')
const editSupply = (supply) => alert(`Edit ${supply.name}`)
const removeSupply = (id) => alert(`Remove supply ID ${id}`)
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

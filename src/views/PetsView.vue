<template>
  <div class="manage-page max-w-6xl mx-auto px-6 py-12">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Manage Pets</h1>
      <button @click="addPet" class="btn-primary">+ Add New Pet</button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="pet in pets" :key="pet.id" class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
        <h2 class="text-xl font-semibold mb-2">{{ pet.name }}</h2>
        <p class="text-gray-600 mb-1"><strong>Type:</strong> {{ pet.type }}</p>
        <p class="text-gray-600 mb-1"><strong>Age:</strong> {{ pet.age }}</p>
        <p class="mb-4">
          <span
            :class="{
              'badge-available': pet.status === 'Available',
              'badge-sold': pet.status === 'Sold'
            }"
            class="px-3 py-1 rounded-full text-white text-sm"
          >
            {{ pet.status }}
          </span>
        </p>
        <div class="flex gap-2">
          <button @click="editPet(pet)" class="btn-secondary w-full">Edit</button>
          <button @click="removePet(pet.id)" class="btn-danger w-full">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pets = ref([
  { id: 1, name: 'Buddy', type: 'Dog', age: '2 years', status: 'Available' },
  { id: 2, name: 'Kitty', type: 'Cat', age: '1 year', status: 'Sold' }
])

const addPet = () => alert('Add Pet functionality coming soon')
const editPet = (pet) => alert(`Edit ${pet.name}`)
const removePet = (id) => alert(`Remove pet ID ${id}`)
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
.badge-sold {
  @apply bg-red-500;
}
</style>

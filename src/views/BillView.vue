<template>
  <div class="bill-page max-w-5xl mx-auto px-6 py-12">
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">Bill</h1>

    <table class="w-full table-auto border-collapse mb-6">
      <thead>
        <tr class="bg-blue-100">
          <th class="border px-4 py-2">Item</th>
          <th class="border px-4 py-2">Quantity</th>
          <th class="border px-4 py-2">Price</th>
          <th class="border px-4 py-2">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in billItems" :key="item.id" class="hover:bg-gray-50">
          <td class="border px-4 py-2">{{ item.name }}</td>
          <td class="border px-4 py-2">{{ item.quantity }}</td>
          <td class="border px-4 py-2">${{ item.price }}</td>
          <td class="border px-4 py-2">${{ item.quantity * item.price }}</td>
        </tr>
      </tbody>
    </table>

    <div class="text-right font-bold text-xl mb-4">Total Amount: ${{ total }}</div>
    <button @click="printBill" class="btn-primary float-right">Print PDF</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const billItems = ref([
  { id: 1, name: 'Dog Food', quantity: 2, price: 15 },
  { id: 2, name: 'Cat Toy', quantity: 1, price: 10 }
])

const total = computed(() => billItems.value.reduce((sum, i) => sum + i.quantity * i.price, 0))

const printBill = () => alert('Print PDF functionality coming soon')
</script>

<style scoped>
.btn-primary {
  @apply px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition;
}
</style>

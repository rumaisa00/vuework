<template>
  <div class="cart-page max-w-5xl mx-auto px-6 py-12">
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">My Cart</h1>

    <div v-if="cart.length" class="space-y-6">
      <div v-for="item in cart" :key="item.id" class="bg-white p-6 rounded-xl shadow hover:shadow-lg flex justify-between items-center">
        <div>
          <h2 class="text-xl font-semibold">{{ item.name }}</h2>
          <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
          <p class="text-gray-600">Price: ${{ item.price }}</p>
        </div>
        <div class="flex flex-col items-end">
          <p class="font-bold text-lg">Total: ${{ item.quantity * item.price }}</p>
          <button @click="removeItem(item.id)" class="btn-danger mt-2">Remove</button>
        </div>
      </div>

      <div class="text-right font-bold text-xl mt-4">
        Total: ${{ total }}
      </div>

      <button @click="checkout" class="btn-primary mt-4 float-right">Checkout</button>
    </div>

    <div v-else class="text-center text-gray-500 text-lg">Your cart is empty</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const cart = ref([
  { id: 1, name: 'Dog Food', quantity: 2, price: 15 },
  { id: 2, name: 'Cat Toy', quantity: 1, price: 10 }
])

const total = computed(() => cart.value.reduce((sum, item) => sum + item.quantity * item.price, 0))

const removeItem = (id) => { cart.value = cart.value.filter(i => i.id !== id) }
const checkout = () => alert(`Total payment: $${total.value}`)
</script>

<style scoped>
.btn-primary {
  @apply px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition;
}
.btn-danger {
  @apply px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition;
}
</style>

<template>
  <div class="bill-page">
    <h2>Bill</h2>
    <p>Total Amount: ${{ total }}</p>
    <p>Thank you for shopping at SmartPetShop!</p>
    <button @click="goHome">Back to Shop</button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const total = route.params.total || 0

const goHome = () => router.push('/customer')
</script>

<style scoped>
.bill-page {
  padding: 2rem;
  text-align: center;
}
button {
  margin-top: 1rem;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  background: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover { background: #45a049; }
</style>

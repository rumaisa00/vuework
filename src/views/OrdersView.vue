<template>
  <div class="orders-page">
    <h2>Your Orders</h2>
    <div v-if="orders.length === 0">No orders yet.</div>
    <div v-else class="order-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <p>Order #{{ order.id }}</p>
        <p>Items: {{ order.items.map(i => i.name).join(', ') }}</p>
        <p>Total: ${{ order.total }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const orders = ref([
  // Example order
  { id: 101, items: [{ name: 'Dog Food' }, { name: 'Cat Toy' }], total: 25 }
])
</script>

<style scoped>
.orders-page { padding: 2rem; }
.order-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>

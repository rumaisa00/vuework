<template>
  <div class="orders-page max-w-6xl mx-auto px-6 py-12">
    <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">Orders Overview</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="order in orders" :key="order.id" class="order-card p-6 rounded-xl shadow hover:shadow-lg transition" :class="order.status">
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-semibold text-lg">{{ order.title }}</h3>
          <span class="status px-3 py-1 rounded-full text-white text-sm">{{ order.status }}</span>
        </div>
        <p class="text-gray-600 mb-4">{{ order.description }}</p>
        <div class="flex justify-between text-sm text-gray-500">
          <span>👤 {{ order.customer }}</span>
          <span>📅 {{ order.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const orders = ref([
  { id: 1, title: 'Laptop Purchase', description: 'Dell XPS ordered by Sara', customer: 'Sara Khalil', date: '2025-11-20', status: 'pending' },
  { id: 2, title: 'Office Desk', description: 'Wooden desk for Admin Office', customer: 'Rumaitha', date: '2025-11-18', status: 'completed' },
  { id: 3, title: 'Headphones', description: 'Sony WH-1000XM4 for new employee', customer: 'Ala Malik', date: '2025-11-19', status: 'processing' }
])
</script>

<style scoped>
.order-card.pending { border-left: 4px solid #ffb400; }
.order-card.processing { border-left: 4px solid #007bff; }
.order-card.completed { border-left: 4px solid #07c23b; }
.status.pending { background: #ffb400; }
.status.processing { background: #007bff; }
.status.completed { background: #07c23b; }
</style>

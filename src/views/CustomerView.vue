<template>
  <div class="px-4 py-10 max-w-7xl mx-auto">
    <div class="text-center mb-10">
      <h1 class="text-4xl font-bold text-green-600">Customer Dashboard</h1>
      <p class="text-gray-600 text-lg mt-2">Welcome, {{ customerName }}</p>
    </div>

    <h2 class="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>

    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <router-link
        v-for="action in actions"
        :key="action.title"
        :to="action.link"
        class="block bg-white rounded-xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-100"
      >
        <div class="text-4xl mb-3">{{ action.icon }}</div>
        <h3 class="text-lg font-semibold text-gray-700 mb-1">{{ action.title }}</h3>
        <p class="text-sm text-gray-500">{{ action.description }}</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const customerName = ref("Customer");

const actions = ref([
  { title: "View Menu", description: "Check pets, food, and supplies", link: "/menu", icon: "🛍️" },
  { title: "My Orders", description: "View order status and bills", link: "/my-orders", icon: "🛒" },
  { title: "Cart", description: "Add or edit items", link: "/cart", icon: "🛒" },
  { title: "Rate Services", description: "Rate our shop", link: "/rate", icon: "⭐" },
]);
</script>

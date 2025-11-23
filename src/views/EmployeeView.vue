<template>
  <div class="px-4 py-10 max-w-7xl mx-auto">
    <div class="text-center mb-10">
      <h1 class="text-4xl font-bold text-green-600">Employee Dashboard</h1>
      <p class="text-gray-600 text-lg mt-2">Welcome, {{ employeeName }}</p>
    </div>

    <!-- Stats -->
    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-12">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white rounded-xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1"
      >
        <div class="text-4xl mb-3">{{ stat.icon }}</div>
        <h3 class="text-lg font-semibold text-gray-700">{{ stat.label }}</h3>
        <p class="text-2xl font-bold text-green-600">{{ stat.value }}</p>
      </div>
    </div>

    <!-- Actions -->
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Employee Tools</h2>

    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2">
      <router-link
        v-for="action in actions"
        :key="action.title"
        :to="action.link"
        class="block bg-white rounded-xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-100"
      >
        <div class="text-4xl mb-3">{{ action.icon }}</div>
        <h3 class="text-lg font-semibold text-gray-700">{{ action.title }}</h3>
        <p class="text-sm text-gray-500">{{ action.description }}</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const employeeName = ref("Employee");

const stats = ref([
  { label: "Customers", value: 85, icon: "👥" },
  { label: "Orders", value: 230, icon: "🛒" },
]);

const actions = ref([
  { title: "Manage Customers", description: "Add, edit, or remove customers", link: "/manage-customers", icon: "👤" },
  { title: "Manage Orders", description: "View and update orders", link: "/manage-orders", icon: "📝" }
]);
</script>

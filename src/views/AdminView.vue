<template>
  <div class="px-4 py-10 max-w-7xl mx-auto">
    <!-- Title -->
    <div class="text-center mb-10">
      <h1 class="text-4xl font-bold text-green-600">Admin Dashboard</h1>
      <p class="text-gray-600 text-lg mt-2">Welcome, {{ adminName }}</p>
    </div>

    <!-- Stats Section -->
    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-12">
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

    <!-- Action Section -->
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Management</h2>

    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <router-link
        v-for="action in actions"
        :key="action.title"
        :to="action.link"
        class="block bg-white rounded-xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-100"
      >
        <div class="text-4xl mb-3">{{ action.icon }}</div>
        <h3 class="text-lg font-semibold text-gray-700 mb-1">
          {{ action.title }}
        </h3>
        <p class="text-sm text-gray-500">{{ action.description }}</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const adminName = ref("Admin");

const stats = ref([
  { label: "Animals", value: 120, icon: "🐶" },
  { label: "Customers", value: 85, icon: "👥" },
  { label: "Orders", value: 230, icon: "🛒" },
  { label: "Employees", value: 15, icon: "🧑‍💼" },
]);

const actions = ref([
  { title: "Manage Pets", description: "Add, edit, or remove pets", link: "/manage-pets", icon: "🐾" },
  { title: "Manage Food", description: "Add, edit, or remove food items", link: "/manage-food", icon: "🍖" },
  { title: "Manage Supplies", description: "Update stock and details", link: "/manage-supplies", icon: "📦" },
  { title: "Manage Orders", description: "View and update customer orders", link: "/manage-orders", icon: "📝" },
  { title: "Manage Employees", description: "Add, edit, or remove employees", link: "/manage-employees", icon: "🧑‍💼" },
]);
</script>

<style scoped>
body {
  font-family: "Poppins", sans-serif;
}
</style>

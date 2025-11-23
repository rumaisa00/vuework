<template>
  <div class="home-view max-w-7xl mx-auto px-6 py-12">
    <!-- Hero Section -->
    <section class="hero rounded-xl bg-gradient-to-r from-green-100 to-green-50 p-10 text-center shadow-md">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Welcome to SmartPetShop</h1>
      <p class="text-lg md:text-xl text-gray-600 mb-8">
        Manage pets, food, supplies, customers, and orders with a modern, smart dashboard
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <RouterLink to="/manage-pets" class="btn-primary">Browse Pets</RouterLink>
        <RouterLink to="/login" class="btn-secondary">Login</RouterLink>
        <RouterLink to="/signup" class="btn-secondary">Sign Up</RouterLink>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features mt-16">
      <h2 class="text-3xl font-semibold text-center text-gray-900 mb-10">Features</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="feature-card p-6 rounded-xl bg-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
          <div class="icon text-5xl mb-4">🐶</div>
          <h3 class="text-xl font-semibold mb-2 text-gray-900">Manage Pets</h3>
          <p class="text-gray-600">Add, edit, and remove pets from the store inventory</p>
        </div>

        <div class="feature-card p-6 rounded-xl bg-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
          <div class="icon text-5xl mb-4">🍖</div>
          <h3 class="text-xl font-semibold mb-2 text-gray-900">Food & Supplies</h3>
          <p class="text-gray-600">Track stock, update quantities, and control product availability</p>
        </div>

        <div class="feature-card p-6 rounded-xl bg-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
          <div class="icon text-5xl mb-4">🛒</div>
          <h3 class="text-xl font-semibold mb-2 text-gray-900">Customer Orders</h3>
          <p class="text-gray-600">Customers can place orders and view detailed bills</p>
        </div>

        <div class="feature-card p-6 rounded-xl bg-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
          <div class="icon text-5xl mb-4">⭐</div>
          <h3 class="text-xl font-semibold mb-2 text-gray-900">Ratings</h3>
          <p class="text-gray-600">View customer feedback and store ratings</p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-gradient-to-r from-green-400 to-green-500 p-10 rounded-xl text-white shadow-md">
      <div class="stat-item text-center">
        <h3 class="text-4xl font-bold mb-2">{{ stats.pets }}</h3>
        <p class="text-lg">Pets Available</p>
      </div>
      <div class="stat-item text-center">
        <h3 class="text-4xl font-bold mb-2">{{ stats.foods }}</h3>
        <p class="text-lg">Food Items</p>
      </div>
      <div class="stat-item text-center">
        <h3 class="text-4xl font-bold mb-2">{{ stats.customers }}</h3>
        <p class="text-lg">Customers</p>
      </div>
      <div class="stat-item text-center">
        <h3 class="text-4xl font-bold mb-2">{{ stats.orders }}</h3>
        <p class="text-lg">Total Orders</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const stats = ref({
  pets: 12,
  foods: 25,
  customers: 8,
  orders: 4,
});
</script>

<style scoped>
.btn-primary {
  @apply px-6 py-3 rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold shadow-md transition hover:shadow-lg hover:-translate-y-1;
}

.btn-secondary {
  @apply px-6 py-3 rounded-lg bg-white text-blue-500 border-2 border-blue-500 font-semibold shadow-sm transition hover:bg-blue-500 hover:text-white hover:shadow-md;
}
</style>

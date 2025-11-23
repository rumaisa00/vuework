<template>
  <div class="home-view w-full">

    <!-- HERO SECTION WITH SEARCH BAR -->
    <section class="hero bg-gradient-to-r from-green-100 to-green-50 py-16 px-6 text-center">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Find Everything Your Pet Needs
        </h1>

        <p class="text-lg md:text-xl text-gray-600 mb-8">
          Browse pets, food, accessories & supplies — all in one smart shop.
        </p>

        <!-- SEARCH BAR -->
        <div class="relative flex justify-center">
          <input
            v-model="search"
            type="text"
            placeholder="Search for pets, food, toys..."
            class="w-full md:w-3/4 lg:w-1/2 px-6 py-4 rounded-full shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
          />
          <button
            class="absolute right-4 top-1/2 -translate-y-1/2 px-5 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600"
          >
            Search
          </button>
        </div>
      </div>
    </section>

    <!-- FEATURE CATEGORIES -->
    <section class="mt-20 px-6 max-w-7xl mx-auto">
      <h2 class="text-3xl font-semibold text-gray-900 mb-10 text-center">
        Shop by Category
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        <RouterLink to="/pets" class="category-card">
          <div class="p-8 bg-white rounded-2xl shadow-lg text-center hover:shadow-2xl transition">
            <div class="text-6xl mb-4">🐶</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Pets</h3>
            <p class="text-gray-600">Adopt or buy dogs, cats, birds & more.</p>
          </div>
        </RouterLink>

        <RouterLink to="/supplies" class="category-card">
          <div class="p-8 bg-white rounded-2xl shadow-lg text-center hover:shadow-2xl transition">
            <div class="text-6xl mb-4">🦴</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Pet Supplies</h3>
            <p class="text-gray-600">Everything from toys to grooming tools.</p>
          </div>
        </RouterLink>

        <RouterLink to="/food" class="category-card">
          <div class="p-8 bg-white rounded-2xl shadow-lg text-center hover:shadow-2xl transition">
            <div class="text-6xl mb-4">🍖</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Food & Treats</h3>
            <p class="text-gray-600">Healthy meals and snacks for your pets.</p>
          </div>
        </RouterLink>

      </div>
    </section>

    <!-- STATISTICS SECTION -->
    <section
      class="mt-20 bg-gradient-to-r from-green-400 to-green-500 p-12 rounded-xl text-white max-w-7xl mx-auto shadow-lg"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">

        <div>
          <h3 class="text-4xl font-bold">{{ stats.pets }}</h3>
          <p class="text-lg">Pets Available</p>
        </div>

        <div>
          <h3 class="text-4xl font-bold">{{ stats.foods }}</h3>
          <p class="text-lg">Food Items</p>
        </div>

        <div>
          <h3 class="text-4xl font-bold">{{ stats.customers }}</h3>
          <p class="text-lg">Happy Customers</p>
        </div>

        <div>
          <h3 class="text-4xl font-bold">{{ stats.orders }}</h3>
          <p class="text-lg">Total Orders</p>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from "vue";

const search = ref("");

const stats = ref({
  pets: 12,
  foods: 25,
  customers: 8,
  orders: 4,
});
</script>

<style scoped>
.category-card {
  transition: transform 0.3s;
}
.category-card:hover {
  transform: translateY(-6px);
}
</style>
<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto flex justify-between items-center p-4">
      <RouterLink to="/" class="flex items-center gap-2">
        <span class="text-3xl">🐾</span>
        <h1 class="text-xl font-bold text-gray-800">SmartPetShop</h1>
      </RouterLink>

      <nav class="hidden md:flex gap-4">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink v-if="userRole==='admin'" to="/admin" class="nav-link">Admin</RouterLink>
        <RouterLink v-if="userRole==='employee'" to="/employee" class="nav-link">Employee</RouterLink>
        <RouterLink v-if="userRole==='customer'" to="/customer" class="nav-link">Customer</RouterLink>

        <RouterLink v-if="userRole" to="/orders" class="nav-link">Orders</RouterLink>
        <RouterLink v-if="!userRole" to="/login" class="nav-link">Login</RouterLink>
        <RouterLink v-if="!userRole" to="/signup" class="nav-link">Signup</RouterLink>
      </nav>

      <button class="md:hidden text-2xl" @click="toggleMenu">
        {{ menuOpen ? '✕' : '☰' }}
      </button>
    </div>

    <nav
      v-if="menuOpen"
      class="md:hidden bg-white shadow-md flex flex-col px-6 py-4 space-y-2"
    >
      <RouterLink to="/" class="nav-link" @click="closeMenu">Home</RouterLink>
      <RouterLink v-if="userRole==='admin'" to="/admin" class="nav-link" @click="closeMenu">Admin</RouterLink>
      <RouterLink v-if="userRole==='employee'" to="/employee" class="nav-link" @click="closeMenu">Employee</RouterLink>
      <RouterLink v-if="userRole==='customer'" to="/customer" class="nav-link" @click="closeMenu">Customer</RouterLink>

      <RouterLink v-if="userRole" to="/orders" class="nav-link" @click="closeMenu">Orders</RouterLink>
      <RouterLink v-if="!userRole" to="/login" class="nav-link" @click="closeMenu">Login</RouterLink>
      <RouterLink v-if="!userRole" to="/signup" class="nav-link" @click="closeMenu">Signup</RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'

const menuOpen = ref(false)
const toggleMenu = () => menuOpen.value = !menuOpen.value
const closeMenu = () => menuOpen.value = false

const userRole = computed(() => localStorage.getItem('userRole') || null)
</script>

<style scoped>
.nav-link {
  padding: 0.5rem 1rem;
  font-weight: 500;
  border-radius: 8px;
  transition: 0.25s;
  color: #1e293b;
}
.nav-link:hover {
  background: #f0fdf4;
  color: #059669;
}
.router-link-active {
  background: #dcfce7;
  color: #059669;
  font-weight: 600;
}
</style>

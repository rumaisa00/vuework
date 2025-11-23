<template>
  <header class="bg-gradient-to-r from-green-500 to-green-400 text-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto flex justify-between items-center p-4">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2">
        <span class="text-2xl">🐾</span>
        <h1 class="text-xl font-bold">SmartPetShop</h1>
      </RouterLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex gap-4">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink v-if="userRole==='admin'" to="/admin" class="nav-link">Admin</RouterLink>
        <RouterLink v-if="userRole==='employee'" to="/employee" class="nav-link">Employee</RouterLink>
        <RouterLink v-if="userRole==='customer'" to="/customer" class="nav-link">Customer</RouterLink>
        <RouterLink v-if="userRole" to="/orders" class="nav-link">Orders</RouterLink>
        <RouterLink v-if="!userRole" to="/login" class="nav-link">Login</RouterLink>
        <RouterLink v-if="!userRole" to="/signup" class="nav-link">Signup</RouterLink>
      </nav>

      <!-- Mobile Toggle -->
      <button @click="toggleMenu" class="md:hidden focus:outline-none">
        <span v-if="!menuOpen" class="text-2xl">☰</span>
        <span v-else class="text-2xl">✕</span>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <nav v-if="menuOpen" class="md:hidden bg-green-500 text-white flex flex-col px-4 py-2 space-y-2">
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
const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu = () => { menuOpen.value = false }

// Example: get role from localStorage (replace with Pinia if used)
const userRole = computed(() => localStorage.getItem('userRole') || null)
</script>

<style scoped>
.nav-link {
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background 0.3s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  font-weight: 600;
}
</style>

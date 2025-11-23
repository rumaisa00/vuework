<template>
  <header class="header">
    <div class="logo">SmartPetShop</div>
    <nav>
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link v-if="!user" to="/signup" class="nav-link">Sign Up</router-link>
      <router-link v-if="user?.role === 'customer'" to="/customer" class="nav-link">Dashboard</router-link>
      <router-link v-if="user?.role === 'admin'" to="/admin" class="nav-link">Admin</router-link>
      <router-link v-if="user" @click.prevent="logout" class="nav-link">Logout</router-link>
    </nav>
  </header>
</template>

<script setup>
import { useUserStore } from './store/user.js'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const store = useUserStore()
const router = useRouter()

const user = computed(() => store.user)

const logout = () => {
  store.logout()
  router.push('/')
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2196f3;
  color: white;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

nav .nav-link {
  margin-left: 1rem;
  color: white;
  font-weight: 500;
}

nav .nav-link:hover {
  text-decoration: underline;
}
</style>

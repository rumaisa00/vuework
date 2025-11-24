<template>
  <div>
    <h1>Admin Dashboard</h1>
    <p>Users:</p>
    <ul>
      <li v-for="u in users" :key="u.id">{{ u.name }} - {{ u.role }}</li>
    </ul>
    <p>Products:</p>
    <ul>
      <li v-for="p in products.allProducts" :key="p.id">{{ p.name }} - ${{ p.price }}</li>
    </ul>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user.js'
import { useProductsStore } from '../stores/productStore.js'

const usersStore = useUserStore()
const products = useProductsStore()

const users = usersStore.users
</script>

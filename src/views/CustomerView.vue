<template>
  <div>
    <h1>Welcome, {{ user?.name }}</h1>
    <div class="search">
      <input v-model="search" placeholder="Search..." />
    </div>
    <div class="categories">
      <button @click="filterCategory('all')" :class="{ active: category==='all' }">All</button>
      <button @click="filterCategory('pets')" :class="{ active: category==='pets' }">Pets</button>
      <button @click="filterCategory('food')" :class="{ active: category==='food' }">Food</button>
      <button @click="filterCategory('supplies')" :class="{ active: category==='supplies' }">Supplies</button>
    </div>
    <div class="products">
      <div v-for="item in filteredProducts" :key="item.id" class="card">
        <img :src="item.image" />
        <h3>{{ item.name }}</h3>
        <p>${{ item.price }}</p>
        <button @click="addToCart(item)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/user.js'
import { useProductsStore } from '../stores/productStore.js'
import { useCartStore } from '../stores/cart.js'

const userStore = useUserStore()
const productStore = useProductsStore()
const cartStore = useCartStore()

const user = userStore.user
const search = ref('')
const category = ref('all')

const filteredProducts = computed(() => {
  let list = productStore.allProducts
  if(category.value !== 'all') list = list.filter(p => p.type === category.value)
  if(search.value.trim()) list = list.filter(p => p.name.toLowerCase().includes(search.value.toLowerCase()))
  return list
})

function filterCategory(c) { category.value = c }
function addToCart(item) { cartStore.addToCart(item); alert('Added to cart!') }
</script>

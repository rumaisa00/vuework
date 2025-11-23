<template>
  <div>
    <Header />
    <div class="customer-dashboard">
      <SearchBar v-model="searchQuery" />
      <div class="nav-buttons">
        <router-link to="/cart" class="btn">Cart</router-link>
        <router-link to="/orders" class="btn">Orders</router-link>
      </div>
      <div class="products-grid">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import ProductCard from '../components/ProductCard.vue'
import SearchBar from '../components/SearchBar.vue'

const searchQuery = ref('')
const cart = ref([])
const products = ref([
  { id: 1, name: 'Dog Food', price: 20, type: 'food' },
  { id: 2, name: 'Cat Toy', price: 5, type: 'toy' },
  { id: 3, name: 'Fish Tank', price: 50, type: 'aquatic' },
])

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  return products.value.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const addToCart = (product) => {
  const existing = cart.value.find(item => item.id === product.id)
  if(existing) existing.quantity += 1
  else cart.value.push({ ...product, quantity: 1 })
  alert(`${product.name} added to cart`)
}
</script>

<style scoped>
.nav-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
.btn {
  padding: 0.5rem 1rem;
  background: #2196f3;
  color: white;
  border-radius: 8px;
  text-decoration: none;
}
.btn:hover { background: #1976d2; }
</style>

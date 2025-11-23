<template>
  <div>
    <Header />
    <div class="customer-dashboard">
      <SearchBar v-model="searchQuery" />
      <div class="products-grid">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product"/>
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
const products = ref([
  { id: 1, name: 'Dog Food', price: 20, type: 'food' },
  { id: 2, name: 'Cat Toy', price: 5, type: 'toy' },
  { id: 3, name: 'Fish Tank', price: 50, type: 'aquatic' },
])

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  return products.value.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
})
</script>

<style scoped>
.customer-dashboard {
  padding: 2rem;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
</style>

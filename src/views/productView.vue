<template>
  <div class="product-view">
    <h2>Products</h2>
    <div class="product-list">
      <div v-for="product in allProducts" :key="product.id" class="product-card">
        <h3>{{ product.name }}</h3>
        <p>Price: ${{ product.price }}</p>
        <p>Stock: {{ product.stock }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from '../stores/cart.js'

const productsStore = useProductsStore()
const allProducts = productsStore.allProducts
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.product-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 6px;
  width: 200px;
}
</style>

<template>
  <div>
    <h3>Food</h3>
    <div class="grid">
      <div v-for="f in food" :key="f.id" class="card">
        <strong>{{ f.name }}</strong>
        <div class="kv">Price: ${{ f.price }}</div>
        <div class="kv">Stock: {{ f.stock }}</div>
        <div style="margin-top:0.6rem">
          <button class="btn btn-primary" @click="add(f,'food')">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from '../views/productView.vue'
import { useCartStore } from '../stores/cart.js'

const products = useProductsStore()
const cart = useCartStore()
const food = products.food

function add(item) { cart.addToCart(item, 'food') }
</script>

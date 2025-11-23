<template>
  <div>
    <h3>Supplies</h3>
    <div class="grid">
      <div v-for="s in supplies" :key="s.id" class="card">
        <strong>{{ s.name }}</strong>
        <div class="kv">Price: ${{ s.price }}</div>
        <div class="kv">Stock: {{ s.stock }}</div>
        <div style="margin-top:0.6rem">
          <button class="btn btn-primary" @click="add(s,'supply')">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from '../stores/productStore.js'
import { useCartStore } from '../stores/cart.js'

const products = useProductsStore()
const cart = useCartStore()
const supplies = products.supplies

function add(item) { cart.addToCart(item, 'supply') }
</script>

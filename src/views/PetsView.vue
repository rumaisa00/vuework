<template>
  <div>
    <div class="card" style="margin-bottom:1rem">
      <div class="form-row">
        <input v-model="q" class="input" placeholder="Search pets, food, supplies..." />
        <button class="btn btn-ghost" @click="q = ''">Clear</button>
      </div>
    </div>

    <h3>Pets</h3>
    <div class="grid">
      <div v-for="p in pets" :key="p.id" class="card">
        <div style="min-height:42px"><strong>{{ p.name }}</strong></div>
        <div class="kv">Price: ${{ p.price }}</div>
        <div class="kv">Stock: {{ p.stock }}</div>
        <div style="margin-top:0.6rem">
          <button class="btn btn-primary" @click="add(p, 'pet')">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'

const q = ref('')
const products = useProductsStore()
const cart = useCartStore()

const pets = computed(() => {
  if (!q.value) return products.pets
  return products.search(q.value).filter(p => p.type && (p.type.includes('dog') || p.type.includes('cat') || p.type.includes('fish') || !p.type))
})

function add(p, kind) { cart.addToCart(p, kind) }
</script>

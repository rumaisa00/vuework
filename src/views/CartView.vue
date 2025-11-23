<template>
  <div class="card">
    <h2>Your Cart</h2>

    <div v-if="items.length === 0" class="empty">Your cart is empty — add something from Pets/Food/Supplies.</div>

    <div v-else>
      <div v-for="it in items" :key="it.id" class="card" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.6rem">
        <div>
          <strong>{{ it.name }}</strong>
          <div class="kv">qty: {{ it.qty }} · ${{ it.price }} each</div>
        </div>
        <div>
          <button class="btn small" @click="remove(it.id)">Remove</button>
        </div>
      </div>

      <div style="margin-top:1rem;text-align:right">
        <div class="kv">Total: ${{ total }}</div>
        <button class="btn btn-primary" style="margin-top:0.8rem" @click="onCheckout">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart.js'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

const items = cart.items
const total = cart.total

function remove(id) { cart.removeItem(id) }

function onCheckout() {
  try {
    const order = cart.checkout()
    // navigate to Bill with order id and total as query
    router.push({ name: 'Bill', query: { orderId: order.id, total: order.total } })
  } catch (err) {
    alert(err.message || 'Checkout failed')
  }
}
</script>

<template>
  <div class="cart-page">
    <h2>Your Cart</h2>
    <div v-if="cartItems.length === 0">Your cart is empty.</div>
    <div v-else class="cart-items">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <p>{{ item.name }} - ${{ item.price }} x {{ item.quantity }}</p>
        <button @click="removeItem(item.id)">Remove</button>
      </div>
      <h3>Total: ${{ totalPrice }}</h3>
      <button @click="checkout">Checkout</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const cartItems = ref([
  // Example item
  // { id: 1, name: 'Dog Food', price: 20, quantity: 2 }
])

const removeItem = (id) => {
  cartItems.value = cartItems.value.filter(item => item.id !== id)
}

const totalPrice = computed(() =>
  cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
)

const checkout = () => {
  if(cartItems.value.length === 0) return alert('Cart is empty!')
  alert('Checkout successful!')
  router.push({ name: 'Bill', params: { total: totalPrice.value } })
}
</script>

<style scoped>
.cart-page {
  padding: 2rem;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
button {
  background: #ff9800;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
button:hover { background: #f57c00; }
</style>

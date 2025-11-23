<template>
  <div class="card">
    <h2>Bill / Receipt</h2>
    <div v-if="!order">
      <div class="empty">No bill data found.</div>
    </div>
    <div v-else>
      <div class="kv">Order #: {{ order.id }}</div>
      <div class="kv">Date: {{ new Date(order.date).toLocaleString() }}</div>
      <div style="margin-top:1rem">
        <div v-for="it in order.items" :key="it.productId" class="kv">{{ it.qty }} × {{ it.name }} — ${{ it.price }}</div>
      </div>
      <div style="margin-top:1rem;text-align:right"><strong>Total: ${{ order.total }}</strong></div>
      <div style="margin-top:1rem">
        <button class="btn btn-primary" @click="goHome">Back to shop</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'

const route = useRoute()
const router = useRouter()
const user = useUserStore()

const orderId = Number(route.query.orderId)
const order = user.user?.orders?.find(o => o.id === orderId) || null

function goHome() { router.push('/pets') }
</script>

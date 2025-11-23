<template>
  <div class="card">
    <h2>Your Orders</h2>
    <div v-if="orders.length === 0" class="empty">No orders yet.</div>

    <div v-else>
      <div v-for="o in orders" :key="o.id" class="card" style="margin-bottom:0.8rem">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div><strong>Order #{{ o.id }}</strong></div>
            <div class="kv">Date: {{ new Date(o.date).toLocaleString() }}</div>
            <div class="kv">Status: {{ o.status }}</div>
          </div>
          <div><strong>${{ o.total }}</strong></div>
        </div>
        <div style="margin-top:0.6rem">
          <div v-for="item in o.items" :key="item.productId" class="kv">{{ item.qty }} × {{ item.name }} — ${{ item.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/user'

const user = useUserStore()
const orders = computed(() => user.user?.orders || [])
</script>

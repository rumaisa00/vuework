<template>
  <div class="orders-view">
    <h1>📦 Orders Management</h1>

    <p class="subtitle">
      View, update, and manage all pet store customer orders.
    </p>

    <!-- Orders List -->
    <div class="orders-container">
      <div
        class="order-card"
        v-for="order in orders"
        :key="order.id"
      >
        <h3>Order #{{ order.id }}</h3>

        <p><strong>Customer:</strong> {{ order.customer }}</p>
        <p><strong>Total Amount:</strong> ${{ order.total }}</p>
        <p><strong>Status:</strong> <span class="status">{{ order.status }}</span></p>

        <button class="btn" @click="updateStatus(order.id)">
          Update Status
        </button>
      </div>
    </div>

    <!-- Empty message -->
    <div v-if="orders.length === 0" class="empty-message">
      No orders found.
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const orders = ref([
  { id: 101, customer: "Sara Khalil", total: 85, status: "Pending" },
  { id: 102, customer: "Rumaitha Kareem", total: 120, status: "Processing" },
  { id: 103, customer: "Ala Malik", total: 60, status: "Delivered" },
]);

function updateStatus(id) {
  const order = orders.value.find(o => o.id === id);
  if (!order) return;

  if (order.status === "Pending") order.status = "Processing";
  else if (order.status === "Processing") order.status = "Delivered";
  else order.status = "Delivered"; // final status
}
</script>

<style scoped>
.orders-view {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 2.6rem;
  margin-bottom: 10px;
  color: #2c3e50;
}

.subtitle {
  color: #7f8c8d;
  margin-bottom: 2.5rem;
  font-size: 1.15rem;
}

.orders-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.3rem;
}

.order-card {
  background: white;
  padding: 1.8rem;
  border-radius: 14px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease;
}

.order-card:hover {
  transform: translateY(-6px);
}

.order-card h3 {
  margin-bottom: 0.8rem;
  color: #2c3e50;
}

.order-card p {
  color: #555;
  font-size: 0.95rem;
  margin: 4px 0;
}

.status {
  background: #dfe6e9;
  padding: 4px 8px;
  border-radius: 6px;
}

.btn {
  margin-top: 1rem;
  background: #3498db;
  color: white;
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  font-size: 0.95rem;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #217dbb;
}

.empty-message {
  margin-top: 2rem;
  color: #7f8c8d;
  font-size: 1.1rem;
}
</style>

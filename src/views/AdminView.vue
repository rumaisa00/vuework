<template>
  <div>
    <Header />
    <div class="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <!-- Tabs for Food, Supplies, Orders -->
      <div class="tabs">
        <button @click="activeTab='food'" :class="{active: activeTab==='food'}">Food</button>
        <button @click="activeTab='supplies'" :class="{active: activeTab==='supplies'}">Supplies</button>
        <button @click="activeTab='orders'" :class="{active: activeTab==='orders'}">Orders</button>
      </div>

      <!-- Food Management -->
      <div v-if="activeTab==='food'" class="tab-content">
        <h3>Manage Food</h3>
        <div class="add-form">
          <input v-model="newProduct.name" placeholder="Food Name" />
          <input v-model.number="newProduct.price" type="number" placeholder="Price" />
          <input v-model="newProduct.type" placeholder="Type" />
          <button @click="addProduct('food')">Add Food</button>
        </div>
        <div class="product-list">
          <div v-for="(item,index) in food" :key="index" class="product-card">
            <p>{{ item.name }} - ${{ item.price }} ({{ item.type }})</p>
            <button @click="removeProduct('food', index)">Remove</button>
          </div>
        </div>
      </div>

      <!-- Supplies Management -->
      <div v-if="activeTab==='supplies'" class="tab-content">
        <h3>Manage Supplies</h3>
        <div class="add-form">
          <input v-model="newProduct.name" placeholder="Supply Name" />
          <input v-model.number="newProduct.price" type="number" placeholder="Price" />
          <input v-model="newProduct.type" placeholder="Type" />
          <button @click="addProduct('supplies')">Add Supply</button>
        </div>
        <div class="product-list">
          <div v-for="(item,index) in supplies" :key="index" class="product-card">
            <p>{{ item.name }} - ${{ item.price }} ({{ item.type }})</p>
            <button @click="removeProduct('supplies', index)">Remove</button>
          </div>
        </div>
      </div>

      <!-- Orders View -->
      <div v-if="activeTab==='orders'" class="tab-content">
        <h3>Customer Orders</h3>
        <div v-if="orders.length===0">No orders yet.</div>
        <div v-else class="order-list">
          <div v-for="order in orders" :key="order.id" class="order-card">
            <p>Order #{{ order.id }}</p>
            <p>Items: {{ order.items.map(i => i.name).join(', ') }}</p>
            <p>Total: ${{ order.total }}</p>
          </div>
        </div>
      </div>

    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const activeTab = ref('food')

const food = ref([
  { name: 'Dog Food', price: 20, type: 'dry' },
  { name: 'Cat Food', price: 15, type: 'wet' },
])
const supplies = ref([
  { name: 'Leash', price: 10, type: 'pet accessory' },
  { name: 'Pet Bed', price: 50, type: 'furniture' },
])
const orders = ref([
  { id: 101, items: [{ name: 'Dog Food' }], total: 20 },
  { id: 102, items: [{ name: 'Leash' }, { name: 'Cat Food' }], total: 25 }
])

const newProduct = ref({ name: '', price: 0, type: '' })

const addProduct = (category) => {
  if (!newProduct.value.name || newProduct.value.price <= 0 || !newProduct.value.type) {
    return alert('Please fill all fields')
  }
  const product = { ...newProduct.value }
  if(category==='food') food.value.push(product)
  if(category==='supplies') supplies.value.push(product)
  newProduct.value = { name: '', price: 0, type: '' }
}

const removeProduct = (category, index) => {
  if(category==='food') food.value.splice(index, 1)
  if(category==='supplies') supplies.value.splice(index, 1)
}
</script>

<style scoped>
.admin-dashboard { padding: 2rem; }
.tabs { display: flex; gap: 1rem; margin-bottom: 1rem; }
.tabs button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: #ccc;
  color: white;
}
.tabs button.active { background: #2196f3; }
.tab-content { margin-top: 1rem; }
.add-form { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.add-form input { padding: 0.5rem; border-radius: 6px; border: 1px solid #ccc; }
.add-form button { background: #4caf50; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; }
.add-form button:hover { background: #45a049; }
.product-card, .order-card {
  border: 1px solid #ddd;
  padding: 0.8rem;
  border-radius: 10px;
  margin-bottom: 0.8rem;
}
.product-card button { background: #ff9800; color: white; border: none; padding: 0.3rem 0.8rem; border-radius: 6px; cursor: pointer; }
.product-card button:hover { background: #f57c00; }
</style>

<template>
  <div class="admin-wrap">
    <div class="admin-header">
      <h2>Admin Dashboard</h2>
      <div class="admin-header-right">
        <div class="stat card">
          <div class="stat-label">Pets</div>
          <div class="stat-value">{{ pets.length }}</div>
        </div>
        <div class="stat card">
          <div class="stat-label">Food</div>
          <div class="stat-value">{{ food.length }}</div>
        </div>
        <div class="stat card">
          <div class="stat-label">Supplies</div>
          <div class="stat-value">{{ supplies.length }}</div>
        </div>
        <div class="stat card">
          <div class="stat-label">Users</div>
          <div class="stat-value">{{ users.length }}</div>
        </div>
        <div class="stat card">
          <div class="stat-label">Orders</div>
          <div class="stat-value">{{ ordersCount }}</div>
        </div>
      </div>
    </div>

    <div class="tabs">
      <button :class="{ active: tab === 'pets' }" @click="tab = 'pets'">Pets</button>
      <button :class="{ active: tab === 'food' }" @click="tab = 'food'">Food</button>
      <button :class="{ active: tab === 'supplies' }" @click="tab = 'supplies'">Supplies</button>
      <button :class="{ active: tab === 'users' }" @click="tab = 'users'">Users</button>
      <button :class="{ active: tab === 'orders' }" @click="tab = 'orders'">Orders</button>
    </div>

    <!-- PETS TAB -->
    <section v-if="tab === 'pets'" class="tab-panel">
      <div class="tab-top">
        <h3>Manage Pets</h3>
        <button class="btn btn-primary" @click="openAdd('pet')">+ Add Pet</button>
      </div>

      <div class="table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Name</th><th>Type</th><th>Price</th><th>Stock</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in pets" :key="'pet-'+p.id">
              <td>{{ p.name }}</td>
              <td>{{ p.type || '-' }}</td>
              <td>${{ p.price }}</td>
              <td>{{ p.stock }}</td>
              <td class="actions">
                <button class="btn small" @click="startEdit('pet', p)">Edit</button>
                <button class="btn small btn-ghost" @click="remove('pet', p.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- FOOD TAB -->
    <section v-if="tab === 'food'" class="tab-panel">
      <div class="tab-top">
        <h3>Manage Food</h3>
        <button class="btn btn-primary" @click="openAdd('food')">+ Add Food</button>
      </div>

      <div class="table-wrap">
        <table class="admin-table">
          <thead><tr><th>Name</th><th>Type</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
          <tbody>
            <tr v-for="f in food" :key="'food-'+f.id">
              <td>{{ f.name }}</td>
              <td>{{ f.type || '-' }}</td>
              <td>${{ f.price }}</td>
              <td>{{ f.stock }}</td>
              <td class="actions">
                <button class="btn small" @click="startEdit('food', f)">Edit</button>
                <button class="btn small btn-ghost" @click="remove('food', f.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- SUPPLIES TAB -->
    <section v-if="tab === 'supplies'" class="tab-panel">
      <div class="tab-top">
        <h3>Manage Supplies</h3>
        <button class="btn btn-primary" @click="openAdd('supply')">+ Add Supply</button>
      </div>

      <div class="table-wrap">
        <table class="admin-table">
          <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
          <tbody>
            <tr v-for="s in supplies" :key="'supply-'+s.id">
              <td>{{ s.name }}</td>
              <td>{{ s.type || '-' }}</td>
              <td>${{ s.price }}</td>
              <td>{{ s.stock }}</td>
              <td class="actions">
                <button class="btn small" @click="startEdit('supply', s)">Edit</button>
                <button class="btn small btn-ghost" @click="remove('supply', s.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- USERS TAB -->
    <section v-if="tab === 'users'" class="tab-panel">
      <div class="tab-top">
        <h3>Manage Users</h3>
      </div>

      <div class="table-wrap">
        <table class="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
          <tbody>
            <tr v-for="u in users" :key="'user-'+u.id">
              <td>{{ u.name }}</td>
              <td>{{ u.email }}</td>
              <td>{{ u.role }}</td>
              <td class="actions">
                <button class="btn small" @click="toggleRole(u)">{{ u.role === 'admin' ? 'Demote' : 'Promote' }}</button>
                <button class="btn small btn-ghost" @click="deleteUser(u.id)">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ORDERS TAB -->
    <section v-if="tab === 'orders'" class="tab-panel">
      <div class="tab-top">
        <h3>Manage Orders</h3>
      </div>

      <div class="orders-list">
        <div v-if="allOrders.length === 0" class="empty card">No orders yet.</div>

        <div v-for="o in allOrders" :key="'order-'+o.id" class="card order-card">
          <div class="order-row">
            <div>
              <div><strong>Order #{{ o.id }}</strong></div>
              <div class="kv">By: {{ findUserName(o.userId) }} • {{ new Date(o.date).toLocaleString() }}</div>
              <div class="kv">Status: <span class="badge">{{ o.status }}</span></div>
            </div>
            <div class="order-actions">
              <button class="btn small" @click="changeOrderStatus(o, nextStatus(o.status))">{{ nextStatus(o.status) }}</button>
            </div>
          </div>

          <div style="margin-top:0.6rem">
            <div v-for="it in o.items" :key="it.productId" class="kv">{{ it.qty }} × {{ it.name }} — ${{ it.price }}</div>
            <div style="margin-top:6px"><strong>Total: ${{ o.total }}</strong></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal: Add / Edit -->
    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal card">
        <h3>{{ modalMode === 'add' ? 'Add' : 'Edit' }} {{ modalTargetLabel }}</h3>

        <div class="form-grid">
          <input v-model="form.name" placeholder="Name" class="input" />
          <input v-model="form.type" placeholder="Type / Category" class="input" />
          <input v-model.number="form.price" placeholder="Price" type="number" class="input" />
          <input v-model.number="form.stock" placeholder="Stock" type="number" class="input" />
          <input v-model="form.image" placeholder="Image URL (optional)" class="input" />
        </div>

        <div style="margin-top:10px;text-align:right">
          <button class="btn btn-ghost" @click="closeModal">Cancel</button>
          <button class="btn btn-primary" @click="saveModal">{{ modalMode === 'add' ? 'Add' : 'Save' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useProductsStore } from '../stores/products'
import { useUserStore } from '../stores/user'
/*
  Assumptions:
    - products store exposes: pets, food, supplies arrays and add/remove/update functions:
      addPet, updatePet, removePet (and equivalents for food/supplies)
    - user store keeps a `users` array, and user objects may have `orders` in them
      If your user store doesn't expose these exact names, adapt accordingly.
*/

const products = useProductsStore()
const usersStore = useUserStore()

// tabs
const tab = ref('pets')

// local copies / accessors
const pets = computed(() => products.pets || [])
const food = computed(() => products.food || [])
const supplies = computed(() => products.supplies || [])
const users = computed(() => usersStore.users || [])

// gather all orders across users
const allOrders = computed(() => {
  const arr = []
  (users.value || []).forEach(u => {
    if (u.orders && u.orders.length) {
      u.orders.forEach(o => arr.push({ ...o, userId: u.id }))
    }
  })
  // sort by date desc
  return arr.sort((a,b)=> new Date(b.date) - new Date(a.date))
})
const ordersCount = computed(() => allOrders.value.length)

// modal state
const showModal = ref(false)
const modalMode = ref('add') // 'add' | 'edit'
const modalTarget = ref('pet') // 'pet' | 'food' | 'supply'
const editingId = ref(null)

const form = reactive({
  name: '',
  type: '',
  price: 0,
  stock: 0,
  image: ''
})

const modalTargetLabel = computed(() => modalTarget.value === 'pet' ? 'Pet' : modalTarget.value === 'food' ? 'Food' : 'Supply')

// helper: open add modal
function openAdd(target) {
  modalMode.value = 'add'
  modalTarget.value = target === 'supply' ? 'supply' : target === 'food' ? 'food' : 'pet'
  editingId.value = null
  resetForm()
  showModal.value = true
}

// helper: start edit
function startEdit(target, item) {
  modalMode.value = 'edit'
  modalTarget.value = target === 'supply' ? 'supply' : target === 'food' ? 'food' : 'pet'
  editingId.value = item.id
  form.name = item.name
  form.type = item.type || ''
  form.price = item.price || 0
  form.stock = item.stock || 0
  form.image = item.image || ''
  showModal.value = true
}

function resetForm(){
  form.name = ''
  form.type = ''
  form.price = 0
  form.stock = 0
  form.image = ''
}

function closeModal(){
  showModal.value = false
  resetForm()
  editingId.value = null
}

// save (add or update)
function saveModal(){
  // simple validation
  if(!form.name || form.price <= 0){
    alert('Please provide a valid name and price.')
    return
  }

  const payload = { name: form.name, type: form.type, price: Number(form.price), stock: Number(form.stock), image: form.image || '' }

  if(modalMode.value === 'add'){
    if(modalTarget.value === 'pet') products.addPet(payload)
    if(modalTarget.value === 'food') products.addFood(payload)
    if(modalTarget.value === 'supply') products.addSupply(payload)
    alert(`${modalTargetLabel.value} added.`)
  } else {
    // update
    if(modalTarget.value === 'pet') products.updatePet?.(editingId.value, payload) || fallbackUpdateArray(products.pets, editingId.value, payload)
    if(modalTarget.value === 'food') products.updateFood?.(editingId.value, payload) || fallbackUpdateArray(products.food, editingId.value, payload)
    if(modalTarget.value === 'supply') products.updateSupply?.(editingId.value, payload) || fallbackUpdateArray(products.supplies, editingId.value, payload)
    alert(`${modalTargetLabel.value} updated.`)
  }
  closeModal()
}

// fallback update for simple arrays if store doesn't implement updateX
function fallbackUpdateArray(arrRef, id, payload){
  const idx = arrRef.findIndex(i=>i.id === id)
  if(idx !== -1){
    arrRef[idx] = { ...arrRef[idx], ...payload }
  }
}

// remove items
function remove(kind, id){
  if(!confirm('Are you sure?')) return
  if(kind === 'pet') products.removePet?.(id) || (products.pets = products.pets.filter(p=>p.id !== id))
  if(kind === 'food') products.removeFood?.(id) || (products.food = products.food.filter(p=>p.id !== id))
  if(kind === 'supply') products.removeSupply?.(id) || (products.supplies = products.supplies.filter(p=>p.id !== id))
}

// user actions
function toggleRole(u){
  if(!confirm('Change role for ' + u.name + '?')) return
  u.role = u.role === 'admin' ? 'customer' : 'admin'
  // if user store has updateUser, call it
  usersStoreUpdate(u)
}
function deleteUser(id){
  if(!confirm('Delete user?')) return
  usersStoreDelete(id)
}

// helper wrappers that call store functions if exist, else mutate local arrays
function usersStoreUpdate(u){
  if(usersStore.updateUser) usersStore.updateUser(u.id, { role: u.role })
  else {
    const idx = users.value.findIndex(x=>x.id === u.id)
    if(idx !== -1) users.value[idx] = { ...users.value[idx], role: u.role }
  }
}
function usersStoreDelete(id){
  if(usersStore.deleteUser) usersStore.deleteUser(id)
  else {
    // mutate original array if writable
    if(Array.isArray(users.value)) {
      const idx = users.value.findIndex(x=>x.id === id)
      if(idx !== -1) users.value.splice(idx,1)
    }
  }
}

// orders helpers
function findUserName(userId){
  const u = users.value.find(x=>x.id === userId)
  return u ? u.name : 'Unknown'
}
function nextStatus(current){
  if(current === 'pending') return 'complete'
  if(current === 'complete') return 'pending'
  return 'complete'
}
function changeOrderStatus(order, status){
  if(!confirm(`Change status to ${status}?`)) return
  // find original user and change order status in their orders array
  const u = users.value.find(x=>x.id === order.userId)
  if(!u || !u.orders) return
  const idx = u.orders.findIndex(o=>o.id === order.id)
  if(idx !== -1){
    u.orders[idx].status = status
    // if user store exposes updateUserOrder or similar, call it (not implemented by default)
    if(usersStore.updateOrder) usersStore.updateOrder(u.id, u.orders[idx])
  }
}

// expose users store for wrappers
const usersStore = usersStore

</script>

<style scoped>
.admin-wrap { padding: 1.2rem; }
.admin-header { display:flex;justify-content:space-between;gap:1rem;align-items:center;margin-bottom:1rem; }
.admin-header h2 { margin:0; }
.admin-header-right { display:flex;gap:0.6rem;align-items:center; }
.stat { padding:0.6rem 0.9rem; min-width:80px; text-align:center; }
.stat-label { font-size:0.8rem;color:#666 }
.stat-value { font-size:1.15rem;font-weight:700 }

.tabs { display:flex; gap:0.6rem; margin-bottom:1rem; }
.tabs button{ padding:0.6rem 0.9rem;border-radius:8px;border:none;background:#eee;cursor:pointer }
.tabs button.active { background:#1976d2;color:#fff }

.tab-panel { margin-top:0.8rem; }
.tab-top { display:flex;justify-content:space-between;align-items:center;margin-bottom:0.8rem }
.table-wrap { overflow:auto; background:transparent }
.admin-table { width:100%; border-collapse:collapse; min-width:720px }
.admin-table th, .admin-table td { text-align:left;padding:10px;border-bottom:1px solid #f0f0f0 }
.admin-table thead th { font-weight:600;color:#333;background:#fafafa }
.actions { display:flex;gap:0.4rem }

.btn { padding:0.5rem 0.8rem;border-radius:8px;border:none;cursor:pointer;background:#1976d2;color:white }
.btn.small { padding:0.35rem 0.6rem;font-size:0.85rem }
.btn-ghost { background:transparent;border:1px solid #1976d2;color:#1976d2 }

.card { background:#fff;border-radius:8px;padding:0.8rem;box-shadow:0 6px 18px rgba(20,20,40,0.04) }
.input { padding:0.6rem;border-radius:8px;border:1px solid #ddd;width:100% }
.form-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:0.6rem;margin-top:0.6rem }

.modal-backdrop {
  position:fixed;inset:0;background:rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;padding:1rem;z-index:50;
}
.modal { width:100%;max-width:720px }

.order-card { margin-bottom:0.8rem;padding:0.8rem }
.order-row { display:flex;justify-content:space-between;align-items:center }
.kv { color:#666;font-size:0.95rem }
.badge { background:#f0f0f0;padding:4px 8px;border-radius:12px }

.empty { text-align:center;padding:2rem;color:#777 }

@media (max-width:800px){
  .admin-header-right { display:none }
  .admin-table { min-width:600px }
  .tabs { flex-wrap:wrap }
}
</style>

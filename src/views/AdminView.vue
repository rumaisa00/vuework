<script setup>
import { ref, reactive, computed } from 'vue'
import { useProductsStore } from '../stores/products'
import { useUserStore } from '../stores/user'

const products = useProductsStore()
const usersStore = useUserStore() // declare only once

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
    if(modalTarget.value === 'pet') products.updatePet?.(editingId.value, payload) || fallbackUpdateArray(products.pets, editingId.value, payload)
    if(modalTarget.value === 'food') products.updateFood?.(editingId.value, payload) || fallbackUpdateArray(products.food, editingId.value, payload)
    if(modalTarget.value === 'supply') products.updateSupply?.(editingId.value, payload) || fallbackUpdateArray(products.supplies, editingId.value, payload)
    alert(`${modalTargetLabel.value} updated.`)
  }
  closeModal()
}

// fallback update for simple arrays
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
  const u = users.value.find(x=>x.id === order.userId)
  if(!u || !u.orders) return
  const idx = u.orders.findIndex(o=>o.id === order.id)
  if(idx !== -1){
    u.orders[idx].status = status
    if(usersStore.updateOrder) usersStore.updateOrder(u.id, u.orders[idx])
  }
}
</script>

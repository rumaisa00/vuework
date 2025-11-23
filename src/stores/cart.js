import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'
import { useProductsStore } from './products'

export const useCartStore = defineStore('cart', () => {
  const items = ref([]) // { id, productId, name, price, qty, kind }

  const total = computed(() => items.value.reduce((s, it) => s + it.price * it.qty, 0))

  function addToCart(product, kind = 'product') {
    const existing = items.value.find(i => i.productId === product.id && i.kind === kind)
    if (existing) existing.qty += 1
    else items.value.push({ id: Date.now(), productId: product.id, name: product.name, price: product.price, qty: 1, kind })
  }

  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function clear() { items.value = [] }

  function checkout() {
    const user = useUserStore()
    if (!user.user) throw new Error('Not logged in')
    // create order in user's orders
    const order = {
      id: Date.now(),
      userId: user.user.id,
      items: items.value.map(i => ({ productId: i.productId, name: i.name, qty: i.qty, price: i.price })),
      total: total.value,
      date: new Date().toISOString(),
      status: 'pending'
    }
    // store orders in user store
    user.orders = user.orders || []
    user.orders.push(order)
    clear()
    return order
  }

  return { items, total, addToCart, removeItem, clear, checkout }
})

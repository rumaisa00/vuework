import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const pets = ref([
    { id: 1, name: 'Golden Retriever', price: 300, stock: 3, type: 'dog', image: '' },
    { id: 2, name: 'Siamese Cat', price: 180, stock: 5, type: 'cat', image: '' },
    { id: 3, name: 'Goldfish', price: 10, stock: 20, type: 'fish', image: '' }
  ])
  const food = ref([
    { id: 101, name: 'Chicken Kibble', price: 25, stock: 50, type: 'dog-food' },
    { id: 102, name: 'Cat Wet Food', price: 15, stock: 40, type: 'cat-food' }
  ])
  const supplies = ref([
    { id: 201, name: 'Leash (Medium)', price: 12, stock: 25 },
    { id: 202, name: 'Deluxe Bed', price: 45, stock: 10 }
  ])

  const allProducts = computed(() => [...pets.value, ...food.value, ...supplies.value])

  function search(query) {
    if (!query) return allProducts.value
    const q = query.toLowerCase()
    return allProducts.value.filter(p => (p.name + (p.type || '')).toLowerCase().includes(q))
  }

  function addPet(item) {
    item.id = Date.now()
    pets.value.push(item)
  }
  function removePet(id) {
    pets.value = pets.value.filter(p => p.id !== id)
  }

  function addFood(item) {
    item.id = Date.now()
    food.value.push(item)
  }
  function removeFood(id) {
    food.value = food.value.filter(p => p.id !== id)
  }

  function addSupply(item) {
    item.id = Date.now()
    supplies.value.push(item)
  }
  function removeSupply(id) {
    supplies.value = supplies.value.filter(p => p.id !== id)
  }

  return { pets, food, supplies, allProducts, search, addPet, removePet, addFood, removeFood, addSupply, removeSupply }
})

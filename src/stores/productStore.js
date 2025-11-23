// src/stores/productStore.js
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    pets: [],
    food: [],
    supplies: [],
  }),
  actions: {
    addPet(pet) { this.pets.push(pet) },
    addFood(food) { this.food.push(food) },
    addSupply(supply) { this.supplies.push(supply) },

    updatePet(id, payload) {
      const idx = this.pets.findIndex(p => p.id === id)
      if (idx !== -1) this.pets[idx] = { ...this.pets[idx], ...payload }
    },
    updateFood(id, payload) {
      const idx = this.food.findIndex(f => f.id === id)
      if (idx !== -1) this.food[idx] = { ...this.food[idx], ...payload }
    },
    updateSupply(id, payload) {
      const idx = this.supplies.findIndex(s => s.id === id)
      if (idx !== -1) this.supplies[idx] = { ...this.supplies[idx], ...payload }
    },

    removePet(id) { this.pets = this.pets.filter(p => p.id !== id) },
    removeFood(id) { this.food = this.food.filter(f => f.id !== id) },
    removeSupply(id) { this.supplies = this.supplies.filter(s => s.id !== id) },
  }
})

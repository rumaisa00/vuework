import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    pets: [
      { id: 1, name: 'Dog', price: 100, stock: 5, image: 'https://place-puppy.com/200x200' },
      { id: 2, name: 'Cat', price: 80, stock: 3, image: 'https://placekitten.com/200/200' }
    ],
    food: [
      { id: 1, name: 'Dog Food', price: 20, stock: 10, image: 'https://placekitten.com/200/200' },
      { id: 2, name: 'Cat Food', price: 15, stock: 8, image: 'https://placekitten.com/200/201' }
    ],
    supplies: [
      { id: 1, name: 'Collar', price: 10, stock: 15, image: 'https://placekitten.com/200/202' }
    ]
  }),
  getters: {
    allProducts: state => [
      ...state.pets.map(p => ({ ...p, type: 'pets' })),
      ...state.food.map(f => ({ ...f, type: 'food' })),
      ...state.supplies.map(s => ({ ...s, type: 'supplies' }))
    ]
  },
  actions: {
    addPet(p) { this.pets.push(p) },
    addFood(f) { this.food.push(f) },
    addSupply(s) { this.supplies.push(s) }
  }
})

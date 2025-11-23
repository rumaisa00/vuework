import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '../api/api'

export const usePetsStore = defineStore('pets', () => {
  const pets = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchPets() {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get('/pets')
      pets.value = res.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { pets, loading, error, fetchPets }
})

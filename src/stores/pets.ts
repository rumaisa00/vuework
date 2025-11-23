import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';
import { useApiState } from '../composables/useApiState';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface Pet {
  id: number;
  name: string;
  species: string;
  breed?: string;
  age: number;
  price: number;
  stock: number;
  status: 'available' | 'sold' | 'reserved';
  image?: string;
  description?: string;
  gender?: 'male' | 'female';
  color?: string;
  vaccinated?: boolean;
}

export const usePetsStore = defineStore('pets', () => {
  // State
  const pets = ref<Pet[]>([]);
  const { loading, error, start, success, fail } = useApiState();

  // Getters
  const availablePets = computed(() =>
    pets.value.filter(pet => pet.status === 'available' && pet.stock > 0)
  );

  const lowStockPets = computed(() =>
    pets.value.filter(pet => pet.stock > 0 && pet.stock < 5)
  );

  const outOfStockPets = computed(() =>
    pets.value.filter(pet => pet.stock === 0)
  );

  const getPetById = (id: number) => {
    return pets.value.find(p => p.id === id);
  };

  // Actions
  async function fetchPets() {
    start();
    try {
      const res = await axios.get<Pet[]>(`${API_URL}/pets`);
      pets.value = res.data;
      success();
    } catch (err: any) {
      fail(err);
      console.error('Failed to fetch pets:', err);
    }
  }

  async function addPet(pet: Omit<Pet, 'id'>) {
    start();
    try {
      const res = await axios.post<Pet>(`${API_URL}/pets`, pet);
      pets.value.push(res.data);
      success();
      return res.data;
    } catch (err: any) {
      fail(err);
      throw err;
    }
  }

  async function updatePet(id: number, updates: Partial<Pet>) {
    start();
    try {
      const res = await axios.patch<Pet>(`${API_URL}/pets/${id}`, updates);
      const index = pets.value.findIndex(p => p.id === id);
      if (index !== -1) {
        pets.value[index] = res.data;
      }
      success();
      return res.data;
    } catch (err: any) {
      fail(err);
      throw err;
    }
  }

  async function deletePet(id: number) {
    start();
    try {
      await axios.delete(`${API_URL}/pets/${id}`);
      const index = pets.value.findIndex(p => p.id === id);
      if (index !== -1) {
        pets.value.splice(index, 1);
      }
      success();
    } catch (err: any) {
      fail(err);
      throw err;
    }
  }

  function decreaseStock(id: number, quantity: number) {
    const pet = pets.value.find(p => p.id === id);
    if (pet && pet.stock >= quantity) {
      pet.stock -= quantity;
      updatePet(id, { stock: pet.stock });
    }
  }

  function searchPets(query: string) {
    const lowerQuery = query.toLowerCase();
    return pets.value.filter(pet =>
      pet.name.toLowerCase().includes(lowerQuery) ||
      pet.species.toLowerCase().includes(lowerQuery) ||
      pet.breed?.toLowerCase().includes(lowerQuery)
    );
  }

  return {
    // State
    pets,
    loading,
    error,
    // Getters
    availablePets,
    lowStockPets,
    outOfStockPets,
    getPetById,
    // Actions
    fetchPets,
    addPet,
    updatePet,
    deletePet,
    decreaseStock,
    searchPets
  };
});

import { defineStore } from 'pinia';
import axios from '../api/api';
import { ref } from 'vue';
import { useApiState } from '../composables/useApiState';

interface Pet {
  id: number;
  name: string;
  type: string;
  age: number;
  price: number;
  status: string; // available / sold
}

export const usePetsStore = defineStore('pets', () => {
  const pets = ref<Pet[]>([]);
  const { loading, error, start, success, fail } = useApiState();

  async function fetchPets() {
    start();
    try {
      const res = await axios.get<Pet[]>('/pets');
      pets.value = res.data;
      success();
    } catch (err) {
      fail(err);
    }
  }

  return { pets, loading, error, fetchPets };
});

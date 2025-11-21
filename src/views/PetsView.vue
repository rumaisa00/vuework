<script setup lang="ts">
import { onMounted } from 'vue';
import { usePetsStore } from '../stores/pets';

const petsStore = usePetsStore();

onMounted(() => {
  petsStore.fetchPets();
});
</script>

<template>
  <h1>Pets List</h1>
  <div v-if="petsStore.loading">Loading...</div>
  <div v-else-if="petsStore.error">{{ petsStore.error }}</div>
  <ul v-else>
    <li v-for="pet in petsStore.pets" :key="pet.id">
      {{ pet.name }} - {{ pet.type }}
    </li>
  </ul>
</template>

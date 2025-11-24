<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePetsStore } from '../stores/pets';

const petsStore = usePetsStore();
const search = ref("");

onMounted(() => {
  petsStore.fetchPets();
});

// Computed filter
const filteredPets = computed(() =>
  petsStore.pets.filter((p) =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
</script>

<template>
  <div class="pets-page">
    <h1 class="title">🐾 Pets Management</h1>

    <!-- Search Bar -->
    <input
      v-model="search"
      type="text"
      class="search-box"
      placeholder="Search pets by name..."
    />

    <!-- Loading / Error -->
    <div v-if="petsStore.loading" class="status">Loading pets...</div>
    <div v-else-if="petsStore.error" class="status error">{{ petsStore.error }}</div>

    <!-- Pets Grid -->
    <div v-else class="pets-grid">
      <div class="pet-card" v-for="pet in filteredPets" :key="pet.id">
        <div class="pet-icon">🐶</div>
        <h2>{{ pet.name }}</h2>
        <p class="type">{{ pet.type }}</p>

        <div class="actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>

      <!-- Add New Pet Button -->
      <div class="add-card">
        <button class="add-btn">＋ Add New Pet</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pets-page {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
}

.title {
  text-align: center;
  font-size: 2.4rem;
  margin-bottom: 20px;
}

.search-box {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.status {
  text-align: center;
  margin-top: 30px;
  font-size: 1.2rem;
}

.error {
  color: red;
}

.pets-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}

.pet-card {
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  transition: 0.3s;
  cursor: pointer;
}

.pet-card:hover {
  transform: translateY(-5px);
}

.pet-icon {
  font-size: 3rem;
}

.type {
  color: #666;
  margin: 5px 0 15px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.edit-btn, .delete-btn {
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
}

.edit-btn {
  background-color: #4a90e2;
}

.delete-btn {
  background-color: #e24a4a;
}

.add-card {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f3f3;
  border-radius: 15px;
}

.add-btn {
  padding: 12px 20px;
  border: none;
  font-size: 1.2rem;
  background: #4a90e2;
  color: white;
  border-radius: 12px;
  cursor: pointer;
}
</style>

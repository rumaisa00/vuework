<template>
  <div class="customer-container">
    <AppHeader />

    <div class="hero">
      <h1>Find What Your Pet Needs 🐾</h1>
      <input v-model="search" placeholder="Search pets, food, toys, supplies..." class="search-bar" />
    </div>

    <div class="categories">
      <button @click="filterCategory('all')" :class="{ active: category==='all' }">All</button>
      <button @click="filterCategory('pets')" :class="{ active: category==='pets' }">Pets</button>
      <button @click="filterCategory('food')" :class="{ active: category==='food' }">Food</button>
      <button @click="filterCategory('supplies')" :class="{ active: category==='supplies' }">Supplies</button>
    </div>

    <div class="products">
      <div v-for="item in filteredProducts" :key="item.id" class="card">
        <img :src="item.image" class="img" />
        <h3>{{ item.name }}</h3>
        <p class="price">${{ item.price }}</p>
        <button class="add-btn" @click="addToCart(item)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "../stores/cart.js";
import AppHeader from '../components/layout/AppHeader.vue';

const productStore = useProductsStore();
const cartStore = useCartStore();

const search = ref("");
const category = ref("all");

const filterCategory = (c) => category.value = c;

const filteredProducts = computed(() => {
  let list = productStore.allProducts; // use allProducts from store

  if (category.value !== "all") list = list.filter(p => p.type === category.value);

  if (search.value.trim()) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  return list;
});

const addToCart = (item) => {
  cartStore.addToCart(item);
  alert("Added to cart!");
};
</script>

<style scoped>
.customer-container { width: 100%; }
.hero { text-align: center; margin: 30px 0; }
.search-bar {
  width: 60%; padding: 15px; font-size: 18px;
  border-radius: 15px; border: 1px solid #ccc; margin-top: 10px;
}
.categories { text-align: center; margin: 20px 0; }
.categories button {
  margin: 5px; padding: 10px 20px; border: none;
  border-radius: 20px; background: #ddd; cursor: pointer;
}
.categories .active { background: #4e9cff; color: white; }
.products {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 20px; padding: 20px;
}
.card {
  background: white; padding: 20px; text-align: center;
  border-radius: 12px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}
.img { width: 100%; height: 180px; object-fit: cover; border-radius: 10px; }
.add-btn {
  margin-top: 10px; padding: 10px 20px;
  background: #4e9cff; border: none; color: white;
  border-radius: 10px; cursor: pointer;
}
.price { font-weight: bold; margin-top: 5px; }
</style>
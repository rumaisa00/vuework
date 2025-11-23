<template>
  <div class="product-card">
    <h3>{{ product.name }}</h3>
    <p>Type: {{ product.type }}</p>
    <p>Price: ${{ product.price }}</p>
    <button>Add to Cart</button>
  </div>
</template>

<script setup>
defineProps({
  product: Object
})
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s;
}
.product-card:hover {
  transform: translateY(-5px);
}
button {
  background: #ff9800;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background: #f57c00;
}
</style>

<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h2 class="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Find Your
              <span class="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Perfect Pet
              </span>
            </h2>
            <p class="text-xl text-gray-600">
              Discover a world of love, care, and companionship. Your furry friend awaits!
            </p>
            <div class="flex flex-wrap gap-4">
              <button 
                @click="$router.push('/products')"
                class="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Shop Now
              </button>
              <button 
                @click="$router.push('/about')"
                class="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold border-2 border-purple-600 hover:bg-purple-50 transition-all duration-200"
              >
                Learn More
              </button>
            </div>
            
            <!-- Stats -->
            <div class="grid grid-cols-3 gap-4 pt-8">
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-600">{{ stats.pets }}+</div>
                <div class="text-sm text-gray-600">Happy Pets</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-pink-600">{{ stats.products }}+</div>
                <div class="text-sm text-gray-600">Products</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-orange-600">24/7</div>
                <div class="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
          
          <!-- Hero Image Area -->
          <div class="relative">
            <div class="relative z-10 bg-gradient-to-br from-purple-400/20 to-pink-400/20 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
              <div class="text-9xl text-center mb-4">🐕‍🦺</div>
              <div class="flex justify-center space-x-4 text-6xl">
                <span class="animate-bounce">🐱</span>
                <span class="animate-bounce animation-delay-100">🐦</span>
                <span class="animate-bounce animation-delay-200">🐠</span>
              </div>
            </div>
            <!-- Floating Elements -->
            <div class="absolute -top-4 -right-4 w-24 h-24 bg-purple-400 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-400 rounded-full blur-3xl opacity-50 animate-pulse animation-delay-1000"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Category Filter - Bento Style -->
    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="navigateToCategory(cat.id)"
          class="group relative overflow-hidden p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 bg-white hover:bg-purple-50 text-gray-700 border-2 border-gray-200 hover:border-purple-300"
        >
          <div class="text-4xl mb-2">{{ cat.icon }}</div>
          <div class="font-semibold text-sm">{{ cat.name }}</div>
        </button>
      </div>
    </section>

    <!-- Featured Products Preview -->
    <section class="max-w-7xl mx-auto px-4 py-12">
      <div class="flex items-center justify-between mb-8">
        <h3 class="text-3xl font-bold text-gray-900">Featured Products</h3>
        <button 
          @click="$router.push('/products')"
          class="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2"
        >
          View All
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
          @toggle-favorite="handleToggleFavorite"
          :is-favorite="favorites.includes(product.id)"
        />
      </div>
    </section>

    <!-- Features Section -->
    <section class="max-w-7xl mx-auto px-4 py-20">
      <h3 class="text-4xl font-bold text-center mb-12 text-gray-900">
        Why Choose Us?
      </h3>
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(feature, idx) in features"
          :key="idx"
          class="group p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-200"
        >
          <div class="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
            {{ feature.icon }}
          </div>
          <h4 class="text-2xl font-bold mb-2 text-gray-900">{{ feature.title }}</h4>
          <p class="text-gray-600">{{ feature.desc }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product';
import { useCartStore } from '@/stores/cart';
import ProductCard from '@/components/ProductCard.vue';

const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

const stats = ref({
  pets: 500,
  products: 1000
});

const favorites = ref([]);

const categories = [
  { id: 'all', name: 'All Products', icon: '🏪' },
  { id: 'pets', name: 'Pets', icon: '🐕' },
  { id: 'food', name: 'Food', icon: '🍖' },
  { id: 'supplies', name: 'Supplies', icon: '🏠' },
  { id: 'toys', name: 'Toys', icon: '🎾' },
  { id: 'health', name: 'Health', icon: '💊' },
];

const features = [
  { icon: '🏆', title: 'Quality Products', desc: 'Only the best for your pets' },
  { icon: '🚚', title: 'Fast Delivery', desc: 'Get it delivered to your doorstep' },
  { icon: '💝', title: 'Expert Care', desc: '24/7 support from pet experts' },
];

const featuredProducts = computed(() => {
  return productStore.products.slice(0, 6);
});

const navigateToCategory = (categoryId) => {
  router.push({ name: 'products', query: { category: categoryId } });
};

const handleAddToCart = (product) => {
  cartStore.addItem(product);
};

const handleToggleFavorite = (productId) => {
  const index = favorites.value.indexOf(productId);
  if (index > -1) {
    favorites.value.splice(index, 1);
  } else {
    favorites.value.push(productId);
  }
};

onMounted(async () => {
  await productStore.fetchProducts();
});
</script>

<style scoped>
.animation-delay-100 {
  animation-delay: 0.1s;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-1000 {
  animation-delay: 1s;
}
</style>

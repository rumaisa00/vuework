 <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gradient-to-r from-purple-900 to-pink-900 text-white mt-20">
      <div class="max-w-7xl mx-auto px-4 py-12">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <span class="text-3xl">🐾</span>
              <h4 class="text-xl font-bold">SmartPetShop</h4>
            </div>
            <p class="text-purple-200">Your trusted pet care partner</p>
          </div>
          <div>
            <h5 class="font-bold mb-4">Quick Links</h5>
            <ul class="space-y-2 text-purple-200">
              <li><router-link to="/about" class="hover:text-white transition-colors">About Us</router-link></li>
              <li><router-link to="/products" class="hover:text-white transition-colors">Products</router-link></li>
              <li><router-link to="/contact" class="hover:text-white transition-colors">Contact</router-link></li>
            </ul>
          </div>
          <div>
            <h5 class="font-bold mb-4">Support</h5>
            <ul class="space-y-2 text-purple-200">
              <li><a href="#" class="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Returns</a></li>
            </ul>
          </div>
          <div>
            <h5 class="font-bold mb-4">Newsletter</h5>
            <p class="text-purple-200 mb-4">Get pet care tips & deals</p>
            <div class="flex gap-2">
              <input
                v-model="newsletterEmail"
                type="email"
                placeholder="Your email"
                class="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:border-white"
              />
              <button 
                @click="handleNewsletter"
                class="px-4 py-2 bg-white text-purple-900 rounded-lg font-semibold hover:bg-purple-100 transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>
        <div class="border-t border-purple-800 mt-8 pt-8 text-center text-purple-300">
          <p>© 2025 SmartPetShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();

const menuOpen = ref(false);
const showSearch = ref(false);
const searchQuery = ref('');
const newsletterEmail = ref('');

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const cartCount = computed(() => cartStore.itemCount);
const favoritesCount = ref(0); // Connect to your favorites store

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'products', query: { search: searchQuery.value } });
    showSearch.value = false;
    searchQuery.value = '';
  }
};

const handleUserClick = () => {
  if (authStore.isAuthenticated) {
    router.push('/profile');
  } else {
    router.push('/login');
  }
};

const handleNewsletter = () => {
  // Implement newsletter subscription
  console.log('Newsletter subscription:', newsletterEmail.value);
  newsletterEmail.value = '';
};
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

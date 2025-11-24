<script setup>
import { ref, computed } from 'vue'
import { useProductsStore } from '../stores/productStore.js'
import { useCartStore } from '../stores/cart.js'

const productStore = useProductsStore()
const cartStore = useCartStore()

const search = ref('')
const category = ref('all')

const filterCategory = c => category.value = c

const filteredProducts = computed(() => {
  let list = productStore.allProducts

  if (category.value !== 'all') list = list.filter(p => p.type === category.value)
  if (search.value.trim()) list = list.filter(p => p.name.toLowerCase().includes(search.value.toLowerCase()))
  return list
})

function addToCart(item) {
  cartStore.addToCart(item)
  alert('Added to cart!')
}
</script>

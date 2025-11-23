<template>
  <footer class="bg-gray-900 text-gray-200 py-6 mt-auto">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 px-4">
      <p>&copy; {{ currentYear }} SmartPetShop. Built with Vue 3.</p>
      <div class="flex gap-4 items-center text-sm">
        <a href="https://github.com/yourusername/your-repo" target="_blank" class="hover:text-green-400">GitHub</a>
        <span>•</span>
        <a href="mailto:your.email@example.com" class="hover:text-green-400">Contact</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
const currentYear = computed(() => new Date().getFullYear())
</script>

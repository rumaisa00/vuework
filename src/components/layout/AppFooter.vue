<template>
  <footer class="footer">
    <div class="container">
      <p class="text">&copy; {{ currentYear }} SmartPetShop — All rights reserved.</p>

      <div class="links">
        <a href="https://github.com/yourusername/your-repo" target="_blank">GitHub</a>
        <span class="dot">•</span>
        <a href="mailto:your.email@example.com">Contact</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  padding: 1.5rem 0;
  margin-top: auto;
  width: 100%;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.03);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  justify-content: center;
  align-items: center;
  text-align: center;
}

.text {
  font-size: 0.95rem;
  color: #475569;
}

.links {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  font-size: 0.95rem;
}

.links a {
  color: #059669;
  font-weight: 500;
  transition: 0.2s ease;
}

.links a:hover {
  color: #047857;
}

.dot {
  color: #9ca3af;
}
</style>

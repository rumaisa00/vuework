<template>
  <div id="app" class="flex flex-col min-h-screen bg-gray-50 text-gray-800">
    <!-- Header -->
    <AppHeader />

    <!-- Main content -->
    <main class="flex-1 max-w-7xl mx-auto px-6 py-8 w-full transition-all duration-300">
      <RouterView />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
</script>

<style>
/* Global reset & font */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, sans-serif;
  background-color: #f5f7fa;
  color: #2c3e50;
  line-height: 1.6;
}

/* Smooth transitions for all layout changes */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Main content */
main {
  flex: 1;
  transition: all 0.3s ease-in-out;
}

/* Responsive padding */
@media (max-width: 1024px) {
  main {
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  main {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
}
</style>

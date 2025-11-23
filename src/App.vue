<template>
  <div id="app">
    <Header />
    <main class="container">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/layout/AppHeader.vue'
import Footer from './components/layout/AppFooter.vue'
</script>

<style>
/* small page-level spacing */
.container {
  padding: 1.5rem;
  min-height: calc(100vh - 140px);
  max-width: 1100px;
  margin: 0 auto;
}
</style>
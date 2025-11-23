<template>
  <div id="app" class="app-wrapper">
    <!-- HEADER -->
    <AppHeader />

    <!-- MAIN CONTENT -->
    <main class="main-content">
      <RouterView />
    </main>

    <!-- FOOTER -->
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
</script>

<style>
/* -------------------------
   GLOBAL STYLES
------------------------- */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', 'Poppins', sans-serif;
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
  color: #1e293b;
  line-height: 1.6;
  overflow-x: hidden;
}

/* -------------------------
   WRAPPER
------------------------- */
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* -------------------------
   MAIN CONTENT
------------------------- */
.main-content {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;

  /* glass effect container feel */
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}

@media (max-width: 1024px) {
  .main-content {
    padding: 24px 20px;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 20px 16px;
  }
}

/* Smooth transitions */
main, header, footer {
  transition: all 0.25s ease-in-out;
}
</style>

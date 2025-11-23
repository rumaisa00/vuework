<template>
  <div id="app">
    <!-- The router-view displays the current page -->
    <router-view />
  </div>
</template>

<script setup>
// Nothing extra needed here; router handles navigation
</script>

<style>
/* Global styling for the app */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background: #f7f7f7;
}

#app {
  min-height: 100vh;
}
</style>

<template>
  <div class="signup-page">
    <div class="signup-form">
      <h1>Sign Up</h1>
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="handleSignup">Sign Up</button>
      <p>Already have an account? <router-link to="/">Login</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

const handleSignup = () => {
  if(username.value && password.value){
    alert('Account created! Please login.')
    router.push('/')
  } else {
    alert('Fill in all fields')
  }
}
</script>

<style scoped>
/* Reuse login styling for simplicity */
.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f2f2f2;
}
.signup-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  text-align: center;
}
input {
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  width: 100%;
  padding: 0.8rem;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background: #1976d2;
}
</style>

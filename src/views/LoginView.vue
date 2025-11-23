<template>
  <div class="login-page">
    <div class="login-form">
      <h1>SmartPetShop Login</h1>
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="handleLogin">Login</button>
      <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/userStore'

const router = useRouter()
const store = useUserStore()

const username = ref('')
const password = ref('')

const handleLogin = () => {
  if(username.value && password.value){
    const role = username.value === 'admin' ? 'admin' : 'customer'
    store.login(username.value, role)
    router.push(role === 'admin' ? '/admin' : '/customer')
  } else {
    alert('Enter valid credentials')
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f2f2f2;
}
.login-form {
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
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background: #45a049;
}
</style>

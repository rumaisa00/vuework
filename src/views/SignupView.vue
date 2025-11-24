<template>
  <div class="signup-container">
    <h1>Signup</h1>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" placeholder="Password" type="password" />
    <button @click="signupUser">Signup</button>
    <router-link to="/">Login</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')

function signupUser() {
  if (!username.value || !password.value) {
    alert('Enter username and password')
    return
  }

  const newUser = { id: Date.now(), name: username.value, role: 'customer', orders: [] }
  userStore.addUser(newUser)
  userStore.login(newUser)
  router.push({ name: 'Customer' })
}
</script>

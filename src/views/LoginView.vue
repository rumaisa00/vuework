<template>
  <div class="login-container">
    <h1>Login</h1>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" placeholder="Password" type="password" />
    <button @click="loginUser">Login</button>
    <router-link to="/signup">Signup</router-link>
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

function loginUser() {
  if (!username.value || !password.value) {
    alert('Enter username and password')
    return
  }

  const role = username.value === 'admin' ? 'admin' : 'customer'
  const foundUser = userStore.users.find(u => u.name === username.value)

  const user = foundUser || { id: Date.now(), name: username.value, role, orders: [] }
  if (!foundUser) userStore.addUser(user)

  userStore.login(user)
  router.push({ name: role === 'admin' ? 'Admin' : 'Customer' })
}
</script>

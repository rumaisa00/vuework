<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="title">Login</h1>

      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />

        <button type="submit">Login</button>
      </form>

      <p class="switch-text">
        Don’t have an account?
        <RouterLink to="/signup" class="link">Signup</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')

const login = () => {
  const user = {
    username: username.value,
    role:
      username.value === "admin" ? "admin" :
      username.value === "employee" ? "employee" :
      "customer"
  }

  localStorage.setItem("user", JSON.stringify(user))

  if (user.role === "admin") router.push('/admin')
  else if (user.role === "employee") router.push('/employee')
  else router.push('/customer')
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  padding-top: 6rem;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  text-align: center;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #16a34a;
  margin-bottom: 1.5rem;
  font-family: 'Poppins', sans-serif;
}

input {
  width: 100%;
  padding: 0.9rem;
  margin: 0.6rem 0;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  transition: 0.3s;
  font-size: 1rem;
}

input:focus {
  border-color: #22c55e;
  outline: none;
  background: #ffffff;
}

button {
  width: 100%;
  padding: 0.9rem;
  margin-top: 1rem;
  background: #16a34a;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #22c55e;
}

.switch-text {
  margin-top: 1rem;
  font-size: 0.95rem;
}

.link {
  color: #16a34a;
  font-weight: 600;
}

.link:hover {
  text-decoration: underline;
}
</style>

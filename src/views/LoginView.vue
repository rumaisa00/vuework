<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>SmartPetShop Login</h2>

      <input v-model="username" placeholder="Username" class="input" />
      <input v-model="password" type="password" placeholder="Password" class="input" />

      <button class="btn" @click="performLogin">Login</button>

      <p class="switch">
        Don’t have an account?
        <router-link to="/signup">Signup</router-link>
      </p>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user.js";

const router = useRouter();
const userStore = useUserStore();

const username = ref("");
const password = ref("");
const error = ref("");

const performLogin = () => {
  const success = userStore.login(username.value, password.value);

  if (!success) {
    error.value = "Invalid username or password.";
    return;
  }

  if (userStore.role === "admin") router.push("/admin");
  else router.push("/customer");
};
</script>

<style scoped>
.auth-container {
  display: flex; justify-content: center; align-items: center;
  height: 100vh; background: #f5f5f5;
}
.auth-box {
  background: white; padding: 30px; width: 350px;
  border-radius: 15px; text-align: center; 
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}
.input {
  width: 100%; padding: 12px; margin: 10px 0;
  border-radius: 10px; border: 1px solid #ddd;
}
.btn {
  width: 100%; padding: 12px;
  background: #4e9cff; color: white; 
  border: none; border-radius: 10px;
  cursor: pointer; font-size: 16px;
}
.switch { margin-top: 10px; }
.error { color: red; margin-top: 10px; }
</style>

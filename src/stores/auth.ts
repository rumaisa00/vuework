import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useApiState } from '../composables/useApiState';
import axios from '../api/api';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'employee' | 'customer';
  name: string;
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('token'));
  const { loading, error, start, success, fail } = useApiState();

  // Getters
  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.role === 'admin');
  const isEmployee = computed(() => user.value?.role === 'employee');
  const isCustomer = computed(() => user.value?.role === 'customer');
  
  const canManageInventory = computed(() => isAdmin.value);
  const canManageOrders = computed(() => isAdmin.value || isEmployee.value);
  const canManageCustomers = computed(() => isAdmin.value || isEmployee.value);
  const canManageEmployees = computed(() => isAdmin.value);

  // Actions
  async function login(credentials: { email: string; password: string }) {
    start();
    try {
      const res = await axios.post('/auth/login', credentials);
      user.value = res.data.user;
      token.value = res.data.token;
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      success();
      return res.data;
    } catch (err) {
      fail(err);
      throw err;
    }
  }

  async function register(userData: { 
    username: string; 
    email: string; 
    password: string;
    name: string;
  }) {
    start();
    try {
      const res = await axios.post('/auth/register', {
        ...userData,
        role: 'customer' // Default role for signup
      });
      success();
      return res.data;
    } catch (err) {
      fail(err);
      throw err;
    }
  }

  async function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  async function fetchCurrentUser() {
    if (!token.value) return;
    
    start();
    try {
      const res = await axios.get('/auth/me');
      user.value = res.data;
      success();
    } catch (err) {
      fail(err);
      // If token is invalid, logout
      await logout();
    }
  }

  function initializeAuth() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  }

  return {
    // State
    user,
    token,
    loading,
    error,
    // Getters
    isAuthenticated,
    isAdmin,
    isEmployee,
    isCustomer,
    canManageInventory,
    canManageOrders,
    canManageCustomers,
    canManageEmployees,
    // Actions
    login,
    register,
    logout,
    fetchCurrentUser,
    initializeAuth
  };
});

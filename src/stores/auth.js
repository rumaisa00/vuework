import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

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

  // Getters
  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.role === 'admin');
  const isEmployee = computed(() => user.value?.role === 'employee');
  const isCustomer = computed(() => user.value?.role === 'customer');
  
  const canManageInventory = computed(() => isAdmin.value);
  const canManageOrders = computed(() => isAdmin.value || isEmployee.value);
  const canManageCustomers = computed(() => isAdmin.value || isEmployee.value);

  // Actions
  function initializeAuth() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser);
      } catch (e) {
        console.error('Failed to parse stored user:', e);
      }
    } else {
      // For testing: set default admin user
      user.value = {
        id: 1,
        username: 'admin',
        email: 'admin@petshop.com',
        role: 'admin',
        name: 'Admin User'
      };
      localStorage.setItem('user', JSON.stringify(user.value));
    }
  }

  function setRole(role: 'admin' | 'employee' | 'customer') {
    if (user.value) {
      user.value.role = role;
      localStorage.setItem('user', JSON.stringify(user.value));
    }
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return {
    // State
    user,
    token,
    // Getters
    isAuthenticated,
    isAdmin,
    isEmployee,
    isCustomer,
    canManageInventory,
    canManageOrders,
    canManageCustomers,
    // Actions
    initializeAuth,
    setRole,
    logout
  };
});

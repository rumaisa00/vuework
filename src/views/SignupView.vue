<!-- Register.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      <!-- Logo & Title -->
      <div class="text-center mb-8">
        <div class="text-6xl mb-4">🐾</div>
        <h2 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Create Account
        </h2>
        <p class="text-gray-600">Join SmartPetShop today</p>
      </div>

      <!-- Register Form -->
      <div class="bg-white rounded-3xl shadow-2xl p-8">
        <form @submit.prevent="handleRegister" class="space-y-5">
          <!-- Full Name -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              v-model="formData.name"
              type="text"
              required
              placeholder="John Doe"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-colors"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              v-model="formData.email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-colors"
            />
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              v-model="formData.phone"
              type="tel"
              required
              placeholder="+1 (555) 000-0000"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-colors"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="••••••••"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-colors"
            />
            <p class="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
            <input
              v-model="formData.confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="••••••••"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-colors"
            />
          </div>

          <!-- Show Password -->
          <label class="flex items-center cursor-pointer">
            <input
              v-model="showPassword"
              type="checkbox"
              class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-600"
            />
            <span class="ml-2 text-sm text-gray-600">Show password</span>
          </label>

          <!-- Terms & Conditions -->
          <label class="flex items-start cursor-pointer">
            <input
              v-model="formData.agreeToTerms"
              type="checkbox"
              required
              class="w-4 h-4 mt-1 text-purple-600 border-gray-300 rounded focus:ring-purple-600"
            />
            <span class="ml-2 text-sm text-gray-600">
              I agree to the
              <a href="#" class="text-purple-600 hover:text-purple-700 font-semibold">Terms & Conditions</a>
              and
              <a href="#" class="text-purple-600 hover:text-purple-700 font-semibold">Privacy Policy</a>
            </span>
          </label>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
              <span class="text-sm text-red-700">{{ error }}</span>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <!-- Sign In Link -->
        <p class="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <router-link to="/login" class="font-semibold text-purple-600 hover:text-purple-700">
            Sign in
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const formData = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
});

const showPassword = ref(false);
const loading = ref(false);
const error = ref('');

const handleRegister = async () => {
  // Validate passwords match
  if (formData.value.password !== formData.value.confirmPassword) {
    error.value = 'Passwords do not match';
    return;
  }

  // Validate password length
  if (formData.value.password.length < 8) {
    error.value = 'Password must be at least 8 characters';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    await authStore.register({
      name: formData.value.name,
      email: formData.value.email,
      phone: formData.value.phone,
      password: formData.value.password,
    });

    router.push('/');
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

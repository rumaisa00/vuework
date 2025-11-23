import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(JSON.parse(localStorage.getItem('sp_user') || 'null'))
  const token = ref(localStorage.getItem('sp_token') || null)

  function login(username, password) {
    // fake logic:
    // if username is 'admin' -> admin role; otherwise customer
    if (!username || !password) throw new Error('Invalid credentials')
    const role = username === 'admin' ? 'admin' : 'customer'
    const u = { id: Date.now(), name: username, email: `${username}@example.com`, role }
    user.value = u
    token.value = 'fake-jwt-' + Date.now()
    localStorage.setItem('sp_user', JSON.stringify(u))
    localStorage.setItem('sp_token', token.value)
    return u
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('sp_user')
    localStorage.removeItem('sp_token')
  }

  function signup(name, email, password) {
    // fake sign up - create a customer user
    const u = { id: Date.now(), name, email, role: 'customer' }
    user.value = u
    token.value = 'fake-jwt-' + Date.now()
    localStorage.setItem('sp_user', JSON.stringify(u))
    localStorage.setItem('sp_token', token.value)
    return u
  }

  const isLoggedIn = Boolean(user.value && token.value)

  return { user, token, isLoggedIn, login, logout, signup }
})
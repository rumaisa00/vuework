<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')

function login() {
  if (!username.value || !password.value) {
    alert('Enter username and password')
    return
  }

  // Fake login for demo (replace with real backend logic)
  const role = username.value === 'admin' ? 'admin' : 'customer'
  
  userStore.login({
    id: Date.now(),
    name: username.value,
    role
  })

  // redirect after login
  router.push({ name: role === 'admin' ? 'Admin' : 'Customer' })
}
</script>

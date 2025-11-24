<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')

function signup() {
  if (!username.value || !password.value) {
    alert('Enter username and password')
    return
  }

  // Fake signup (you can add to users array in user store)
  const newUser = {
    id: Date.now(),
    name: username.value,
    role: 'customer'
  }

  userStore.addUser?.(newUser)  // if addUser exists
  userStore.login(newUser)      // log in immediately

  router.push({ name: 'Customer' })
}
</script>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')

const login = () => {
  // Fake login for demo — replace with real DB/API later
  const user = {
    username: username.value,
    role:
      username.value === "admin" ? "admin" :
      username.value === "employee" ? "employee" :
      "customer"
  }

  // Save to localStorage (optional)
  localStorage.setItem("user", JSON.stringify(user))

  // Redirect based on role
  if (user.role === "admin") {
    router.push('/admin')
  } else if (user.role === "employee") {
    router.push('/employee')
  } else {
    router.push('/customer')
  }
}
</script>

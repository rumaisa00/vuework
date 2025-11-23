import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import CustomerView from '../views/CustomerView.vue'
import AdminView from '../views/AdminView.vue'
import CartView from '../views/CartView.vue'
import OrderView from '../views/OrderView.vue'
import BillView from '../views/BillView.vue'
import PetsView from '../views/PetsView.vue'
import FoodView from '../views/FoodView.vue'
import SuppliesView from '../views/SuppliesView.vue'
import { useUserStore } from '../stores/user'

const routes = [
  { path: '/', name: 'Login', component: LoginView },
  { path: '/signup', name: 'Signup', component: SignupView },
  { path: '/customer', name: 'Customer', component: CustomerView, meta: { requiresAuth: true, roles: ['customer','admin'] } },
  { path: '/admin', name: 'Admin', component: AdminView, meta: { requiresAuth: true, roles: ['admin'] } },
  { path: '/cart', name: 'Cart', component: CartView, meta: { requiresAuth: true } },
  { path: '/orders', name: 'Orders', component: OrderView, meta: { requiresAuth: true } },
  { path: '/bill', name: 'Bill', component: BillView, meta: { requiresAuth: true } },
  { path: '/pets', name: 'Pets', component: PetsView },
  { path: '/food', name: 'Food', component: FoodView },
  { path: '/supplies', name: 'Supplies', component: SuppliesView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// simple guard using user store
router.beforeEach((to, from, next) => {
  const store = useUserStore()
  const requires = to.meta?.requiresAuth
  if (!requires) return next()
  if (!store.isLoggedIn) return next({ name: 'Login' })
  const roles = to.meta?.roles
  if (roles && !roles.includes(store.user.role)) return next({ name: store.user.role === 'admin' ? 'Admin' : 'Customer' })
  next()
})

export default router

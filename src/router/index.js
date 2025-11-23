import { createRouter, createWebHistory } from 'vue-router'

// Views
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import CustomerView from '../views/CustomerView.vue'
import AdminView from '../views/AdminView.vue'
import Cart from '../views/Cart.vue'
import Order from '../views/Order.vue'
import Bill from '../views/Bill.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/customer',
    name: 'Customer',
    component: CustomerView
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/orders',
    name: 'Order',
    component: Order
  },
  {
    path: '/bill',
    name: 'Bill',
    component: Bill
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

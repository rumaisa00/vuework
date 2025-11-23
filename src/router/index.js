import { createRouter, createWebHashHistory } from 'vue-router'

// Views
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import EmployeeView from '../views/EmployeeView.vue'
import CustomerView from '../views/CustomerView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import PetsView from '../views/PetsView.vue'
import FoodView from '../views/FoodView.vue'
import SuppliesView from '../views/SuppliesView.vue'
import OrdersView from '../views/OrdersView.vue'
import CartView from '../views/CartView.vue'
import BillView from '../views/BillView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHashHistory(),   // IMPORTANT for GitHub Pages
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/admin', name: 'admin', component: AdminView },
    { path: '/employee', name: 'employee', component: EmployeeView },
    { path: '/customer', name: 'customer', component: CustomerView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/signup', name: 'signup', component: SignupView },
    { path: '/manage-pets', name: 'manage-pets', component: PetsView },
    { path: '/manage-food', name: 'manage-food', component: FoodView },
    { path: '/manage-supplies', name: 'manage-supplies', component: SuppliesView },
    { path: '/orders', name: 'orders', component: OrdersView },
    { path: '/cart', name: 'cart', component: CartView },
    { path: '/bill', name: 'bill', component: BillView },

    // Custom 404
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
  ]
})

// Title updater
router.beforeEach((to, from, next) => {
  document.title = to.meta?.title || 'SmartPetShop'
  next()
})

export default router

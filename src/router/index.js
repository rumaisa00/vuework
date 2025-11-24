import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/Products.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/products/:id',
    name: 'product-detail',
    component: () => import('@/views/ProductDetail.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/views/Checkout.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue'),
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/views/Orders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/orders/:id',
    name: 'order-detail',
    component: () => import('@/views/OrderDetail.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('@/views/Favorites.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/Contact.vue'),
    meta: { requiresAuth: false }
  },
  // Admin Routes
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, roles: ['admin'] },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
      },
      {
        path: 'products',
        name: 'admin-products',
        component: () => import('@/views/admin/Products.vue'),
      },
      {
        path: 'products/create',
        name: 'admin-product-create',
        component: () => import('@/views/admin/ProductForm.vue'),
      },
      {
        path: 'products/:id/edit',
        name: 'admin-product-edit',
        component: () => import('@/views/admin/ProductForm.vue'),
      },
      {
        path: 'orders',
        name: 'admin-orders',
        component: () => import('@/views/admin/Orders.vue'),
      },
      {
        path: 'customers',
        name: 'admin-customers',
        component: () => import('@/views/admin/Customers.vue'),
      },
      {
        path: 'employees',
        name: 'admin-employees',
        component: () => import('@/views/admin/Employees.vue'),
      },
    ]
  },
  // Employee Routes
  {
    path: '/employee',
    component: () => import('@/layouts/EmployeeLayout.vue'),
    meta: { requiresAuth: true, roles: ['employee', 'admin'] },
    children: [
      {
        path: '',
        name: 'employee-dashboard',
        component: () => import('@/views/employee/Dashboard.vue'),
      },
      {
        path: 'customers',
        name: 'employee-customers',
        component: () => import('@/views/employee/Customers.vue'),
      },
      {
        path: 'orders',
        name: 'employee-orders',
        component: () => import('@/views/employee/Orders.vue'),
      },
      {
        path: 'orders/create',
        name: 'employee-order-create',
        component: () => import('@/views/employee/OrderForm.vue'),
      },
    ]
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: () => import('@/views/Unauthorized.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  },
});

// Navigation Guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  // Check authentication status
  if (!authStore.isAuthenticated) {
    await authStore.checkAuth();
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({
      name: 'login',
      query: { redirect: to.fullPath }
    });
  }

  // Prevent authenticated users from accessing guest-only pages
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return next({ name: 'home' });
  }

  // Check role-based access
  if (to.meta.roles) {
    const userRole = authStore.userRole;
    
    if (!to.meta.roles.includes(userRole)) {
      return next({ name: 'unauthorized' });
    }
  }

  next();
});

export default router;

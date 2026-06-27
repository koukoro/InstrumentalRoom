import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import('@/views/CatalogView.vue')
  },
  {
    path: '/catalog/:category',
    name: 'catalog-category',
    component: () => import('@/views/CatalogView.vue')
  },
  {
    path: '/product/:slug',
    name: 'product',
    component: () => import('@/views/ProductView.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/NewsView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/InstrumentalRoom/'),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
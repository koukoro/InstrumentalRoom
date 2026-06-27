<template>
  <header class="header">
    <div class="header__topbar">
      <div class="container header__topbar-inner">

        <RouterLink to="/" class="header__logo">
          <img src="/images/logo.png" alt="Логотип" class="header__logo-img" />
        </RouterLink>

        <div class="header__worktime">
          Время работы:&nbsp; 10:00–20:00
        </div>

        <div class="header__phone">
          <a href="tel:+74951203214" class="header__phone-num">+7 495 120-32-14</a>
          <a href="#" class="header__callback">Заказать звонок</a>
        </div>

        <div class="header__actions">
          <RouterLink to="/favorites" class="header__action">
            <span class="header__action-badge">0</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </RouterLink>

          <RouterLink to="/compare" class="header__action">
            <span class="header__action-badge">0</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
          </RouterLink>

          <RouterLink to="/account" class="header__action">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </RouterLink>

          <RouterLink to="/cart" class="header__action">
            <span class="header__action-badge">0</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </RouterLink>

          <div class="header__cart-info">
            <span class="header__cart-label">Товаров на сумму</span>
            <span class="header__cart-sum">{{ cart.totalAmount.toLocaleString('ru') }} ₽</span>
          </div>
        </div>

      </div>
    </div>

    <nav class="header__nav">
      <div class="container header__nav-inner">

        <button class="header__catalog-btn" @click="toggleMenu">
          <img src="/images/sticks.png" alt="Структура"/>
          Каталог товаров
        </button>

        <ul class="header__nav-links">
          <li><RouterLink to="/about">О компании</RouterLink></li>
          <li><RouterLink to="/sales">Акции</RouterLink></li>
          <li><RouterLink to="/hits">Хиты сезона</RouterLink></li>
          <li><RouterLink to="/news">Новости</RouterLink></li>
        </ul>

        <div class="header__socials">
          <a href="#" class="header__social">
            <img src="/images/instagram.png" alt="Инстаграм" />
          </a>
          <a href="#" class="header__social">
            <img src="/images/vkontakte.png" alt="Вконтакте" />
          </a>
          <a href="#" class="header__social">
            <img src="/images/facebook.png" alt="Фейсбук" />
          </a>
        </div>

        <div class="header__search">
          <svg class="header__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
              type="text"
              placeholder="Поиск по каталогу"
              v-model="searchQuery"
              @input="onSearch"
          />
          <div v-if="searchResults.length > 0 || searchEmpty" class="search-dropdown">
            <div v-if="searchEmpty" class="search-dropdown__empty">Нет результатов</div>
            <ul v-else>
              <li
                  v-for="p in searchResults"
                  :key="p.id"
                  class="search-dropdown__item"
                  @click="goToProduct(p)"
              >
                <div class="search-dropdown__img img-placeholder">
                  <img src="/images/emal.png" alt="Эмаль">
                </div>
                <span class="search-dropdown__name">{{ p.name }}</span>
                <span class="search-dropdown__price">{{ p.price }} ₽</span>
              </li>
            </ul>
            <button class="search-dropdown__all" @click="goToCatalog">Показать все</button>
          </div>
        </div>

      </div>
    </nav>

    <div class="mega-menu" v-if="menuOpen" @mouseleave="closeMenu">
      <div class="container mega-menu__inner">
        <ul class="mega-menu__categories">
          <li
              v-for="cat in data.categories"
              :key="cat.id"
              class="mega-menu__cat"
              :class="{ 'mega-menu__cat--active': activeCategory === cat.slug }"
              @mouseenter="activeCategory = cat.slug"
          >
            <RouterLink :to="`/catalog/${cat.slug}`" @click="closeMenu">
              {{ cat.name }}
              <span class="mega-menu__arrow">›</span>
            </RouterLink>
          </li>
        </ul>
        <div class="mega-menu__subs" v-if="activeSubs.length">
          <ul class="mega-menu__sub-col">
            <li v-for="sub in activeSubs.slice(0, Math.ceil(activeSubs.length / 2))" :key="sub.id">
              <RouterLink to="#" @click="closeMenu">{{ sub.name }}</RouterLink>
            </li>
          </ul>
          <ul class="mega-menu__sub-col">
            <li v-for="sub in activeSubs.slice(Math.ceil(activeSubs.length / 2))" :key="sub.id">
              <RouterLink to="#" @click="closeMenu">{{ sub.name }}</RouterLink>
            </li>
          </ul>
        </div>
        <div class="mega-menu__subs" v-else>
          <p class="mega-menu__no-sub">Выберите категорию</p>
        </div>
      </div>
    </div>

  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart.js'
import data from '@/data/products.json'

const cart = useCartStore()
const router = useRouter()

const menuOpen = ref(false)
const activeCategory = ref('')
const searchQuery = ref('')
const searchResults = ref([])
const searchEmpty = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value && data.categories.length) {
    activeCategory.value = data.categories[0].slug
  }
}
function closeMenu() {
  menuOpen.value = false
}

const activeSubs = computed(() => data.subcategories[activeCategory.value] || [])

function onSearch() {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) { searchResults.value = []; searchEmpty.value = false; return }
  const found = data.products.filter(p => p.name.toLowerCase().includes(q))
  searchResults.value = found.slice(0, 6)
  searchEmpty.value = found.length === 0
}

function goToProduct(p) {
  searchQuery.value = ''
  searchResults.value = []
  searchEmpty.value = false
  router.push(`/product/${p.slug}`)
}
function goToCatalog() {
  searchQuery.value = ''
  searchResults.value = []
  searchEmpty.value = false
  router.push('/catalog')
}
</script>

<style scoped>
.header__topbar {
  background: var(--color-darker);
}
.header__topbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.header__logo-img {
  height: 40px;
  display: block;
}

.header__worktime {
  font-size: var(--fs-mini);
  color: var(--color-white);
  white-space: nowrap;
}

.header__phone {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.header__phone-num {
  font-weight: 500;
  font-size: var(--fs-text);
  color: var(--color-white);
}
.header__callback {
  font-size: var(--fs-shape);
  color: var(--color-primary);
  text-decoration: underline;
}

/* Иконки */
.header__actions {
  display: flex;
  align-items: center;
  gap: 1px;
}

.header__action {
  position: relative;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  transition: color 0.2s;
  background-color: #3B3B3B;
}
.header__action:hover {
  background-color: var(--color-primary);
}

.header__action-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-primary);
  color: var(--color-white);
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.header__cart-info {
  display: flex;
  flex-direction: column;
  padding-left: 8px;
}
.header__cart-label {
  font-size: var(--fs-shape);
  color: var(--color-light);
}
.header__cart-sum {
  font-size: var(--fs-mini);
  font-weight: 500;
  color: var(--color-white);
  white-space: nowrap;
}

.header__nav {
  background-color: black;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.header__nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding-top: 12px;
  padding-bottom: 12px;
}

.header__catalog-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: transparent;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  color: var(--color-white);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: var(--fs-mini);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
}
.header__catalog-btn:hover {
  background: var(--color-primary);
}

.header__nav-links {
  display: flex;
  gap: 60px;
}
.header__nav-links a {
  font-size: var(--fs-mini);
  font-weight: 500;
  color: var(--color-white);
  opacity: 0.85;
  transition: opacity 0.2s, color 0.2s;
}
.header__nav-links a:hover {
  opacity: 1;
  color: var(--color-primary);
}

/* Соцсети */
.header__socials {
  display: flex;
  gap: 8px;
}
.header__social {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: border-color 0.2s;
}
.header__social img {
  object-fit: contain;
}

/* Поиск */
.header__search {
  position: relative;
  min-width: 220px;
}
.header__search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-gray);
  pointer-events: none;
}
.header__search input {
  width: 100%;
  padding: 9px 14px 9px 38px;
  background: var(--color-white);
  border: none;
  border-radius: 2px;
  font-family: var(--font-body);
  font-size: var(--fs-mini);
  color: var(--color-dark);
  outline: none;
}
.header__search input::placeholder {
  color: var(--color-gray);
}

.search-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--color-white);
  border: 1px solid var(--color-light);
  border-radius: 2px;
  z-index: 200;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}
.search-dropdown__empty {
  padding: 16px;
  text-align: center;
  font-size: var(--fs-mini);
  color: var(--color-gray);
}
.search-dropdown__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.15s;
}
.search-dropdown__item:hover {
  background: var(--color-bg);
}
.search-dropdown__img {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 2px;
}
.search-dropdown__name {
  flex: 1;
  font-size: var(--fs-mini);
  color: var(--color-dark);
}
.search-dropdown__price {
  font-weight: 500;
  font-size: var(--fs-mini);
  white-space: nowrap;
}
.search-dropdown__all {
  display: block;
  width: 100%;
  padding: 12px;
  text-align: center;
  font-size: var(--fs-mini);
  color: var(--color-primary);
  background: var(--color-bg);
  border-top: 1px solid var(--color-light);
  cursor: pointer;
  font-family: var(--font-body);
  transition: background 0.15s;
}
.search-dropdown__all:hover {
  background: var(--color-light);
}

.header {
  position: relative;
}
.mega-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-white);
  z-index: 100;
  border-top: 2px solid var(--color-primary);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.mega-menu__inner {
  display: flex;
  min-height: 360px;
}
.mega-menu__categories {
  width: 240px;
  flex-shrink: 0;
  background: var(--color-darker);
  padding: 16px 0;
}
.mega-menu__cat a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  font-size: var(--fs-mini);
  color: var(--color-white);
  transition: background 0.15s;
}
.mega-menu__cat--active a,
.mega-menu__cat a:hover {
  background: var(--color-primary);
}
.mega-menu__arrow { font-size: 18px; }
.mega-menu__subs {
  flex: 1;
  display: flex;
  padding: 20px 0;
}
.mega-menu__sub-col {
  flex: 1;
  padding: 0 24px;
}
.mega-menu__sub-col li + li {
  margin-top: 10px;
}
.mega-menu__sub-col a {
  font-size: var(--fs-mini);
  color: var(--color-dark);
  transition: color 0.15s;
}
.mega-menu__sub-col a:hover {
  color: var(--color-primary);
}
.mega-menu__no-sub {
  padding: 24px;
  color: var(--color-gray);
  font-size: var(--fs-mini);
}
@media (max-width: 1024px) {
  .header__topbar-inner {
    flex-wrap: wrap;
    gap: 16px;
    padding: 12px 0;
  }
  .header__worktime {
    display: none; /* Скрываем время работы на планшетах */
  }
  .header__actions {
    gap: 4px;
  }
  .header__action {
    width: 50px;
    height: 50px;
  }
  .header__cart-info {
    display: none; /* Скрываем сумму, оставляем иконку */
  }
  .header__nav-inner {
    flex-wrap: wrap;
    gap: 12px;
  }
  .header__nav-links {
    gap: 20px;
    order: 2;
  }
  .header__socials {
    display: none;
  }
  .header__search {
    order: 3;
    width: 100%;
    min-width: 100%;
  }
  .mega-menu__inner {
    min-height: auto;
    flex-direction: column;
  }
  .mega-menu__categories {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .header__phone {
    display: none; /* На мобилках скрываем телефон, оставляем иконки */
  }
  .header__logo-img {
    height: 32px;
  }
  .header__catalog-btn span {
    display: none;
  }
  .header__nav-links {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
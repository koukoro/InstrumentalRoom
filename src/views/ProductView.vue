<template>
  <div class="product-page" v-if="product">
    <div class="container">
      <nav class="breadcrumb">
        <RouterLink to="/">Главная</RouterLink>
        <span class="breadcrumb__sep">/</span>
        <RouterLink to="/catalog">Каталог</RouterLink>
        <span class="breadcrumb__sep">/</span>
        <span>{{ product.name }}</span>
      </nav>

      <div class="product-page__layout">
        <div class="product-page__gallery">
          <div class="product-page__img-main">
            <div class="product-page__badges">
              <span v-if="product.isNew" class="badge badge--new">Новинка</span>
              <span v-if="product.isSale" class="badge badge--sale">Акция</span>
            </div>
            <img
                v-if="product.image && !imgError"
                :src="product.image"
                :alt="product.name"
                class="product-page__img"
                @error="imgError = true"
            />
            <div v-else class="product-page__img product-page__img--placeholder img-placeholder">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
          </div>
        </div>

        <div class="product-page__info">
          <h1 class="product-page__name">{{ product.name }}</h1>

          <div class="product-page__meta">
            <span class="product-page__meta-item">
              <span class="product-page__meta-label">Артикул:</span> {{ product.article }}
            </span>
            <span class="product-page__meta-item">
              <span class="product-page__meta-label">Бренд:</span> {{ product.brand }}
            </span>
            <span class="product-page__meta-item">
              <span class="product-page__meta-label">Вес:</span> {{ product.weight }}
            </span>
          </div>

          <div class="product-page__price-row">
            <span class="product-page__price">{{ product.price }} ₽</span>
            <span v-if="product.oldPrice" class="product-page__old-price">{{ product.oldPrice }} ₽</span>
          </div>

          <div class="product-page__stock" :class="{ 'product-page__stock--out': !product.inStock }">
            <svg v-if="product.inStock" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            {{ product.inStock ? 'В наличии' : 'Под заказ' }}
          </div>

          <div class="product-page__actions">
            <button
                class="product-page__cart-btn btn btn--primary"
                :class="{ 'product-page__cart-btn--added': addedToCart }"
                @click="handleAddToCart"
            >
              <svg v-if="!addedToCart" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px;">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right:8px;"><polyline points="20 6 9 17 4 12"/></svg>
              {{ addedToCart ? 'Добавлено!' : 'В корзину' }}
            </button>

            <button class="product-page__fav-btn" :class="{ 'product-page__fav-btn--active': liked }" @click="liked = !liked">
              <svg width="22" height="22" viewBox="0 0 24 24" :fill="liked ? 'var(--color-primary)' : 'none'" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>

            <button class="product-page__compare-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </button>
          </div>

          <div class="product-page__description">
            <h3 class="product-page__desc-title">Описание</h3>
            <p class="product-page__desc-text">{{ product.description }}</p>
          </div>
        </div>
      </div>

      <div class="product-page__related">
        <h2 class="section-title">Похожие товары</h2>
        <div class="product-page__related-grid">
          <ProductCard
              v-for="p in relatedProducts"
              :key="p.id"
              :product="p"
          />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container" style="padding: 80px 0; text-align: center; color: var(--color-gray);">
    Товар не найден
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart.js'
import data from '@/data/products.json'
import ProductCard from '@/components/ui/ProductCard.vue'

const route = useRoute()
const cart = useCartStore()

const imgError = ref(false)
const liked = ref(false)
const addedToCart = ref(false)

const product = computed(() => data.products.find(p => p.slug === route.params.slug))

const relatedProducts = computed(() => {
  if (!product.value) return []
  return data.products.filter(p => p.categoryId === product.value.categoryId && p.id !== product.value.id).slice(0, 4)
})

function handleAddToCart() {
  if (!product.value) return
  cart.addToCart(product.value)
  addedToCart.value = true
  setTimeout(() => { addedToCart.value = false }, 2000)
}
</script>

<style scoped>
.product-page {
  padding: 24px 0 64px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: var(--fs-mini);
  color: var(--color-gray);
}
.breadcrumb a {
  color: var(--color-gray);
}
.breadcrumb a:hover {
  color: var(--color-primary);
}
.breadcrumb__sep {
  color: var(--color-light);
}

.product-page__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 64px;
}

.product-page__img-main {
  position: relative;
  background: var(--color-bg);
  border-radius: 4px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}
.product-page__badges {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.product-page__img {
  max-height: 320px;
  object-fit: contain;
  width: 100%;
}
.product-page__img--placeholder {
  width: 100%;
  height: 320px;
  border-radius: 2px;
}

/* Info */
.product-page__info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.product-page__name {
  font-family: var(--font-heading);
  font-size: var(--fs-h2);
  line-height: var(--lh-h2);
  color: var(--color-black);
}
.product-page__meta {
  display: flex;
  flex-direction: column;
  gap: 6px; }
.product-page__meta-item {
  font-size: var(--fs-mini);
  color: var(--color-dark);
}
.product-page__meta-label {
  color: var(--color-gray);
}

.product-page__price-row { display: flex;
  align-items: baseline;
  gap: 12px;
}
.product-page__price {
  font-family: var(--font-heading);
  font-size: var(--fs-h1);
  line-height: 1;
  color: var(--color-black);
}
.product-page__old-price {
  font-size: var(--fs-sub);
  color: var(--color-gray);
  text-decoration: line-through;
}

.product-page__stock {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--fs-text);
  font-weight: 500;
  color: var(--color-primary);
}
.product-page__stock--out {
  color: var(--color-gray);
}

.product-page__actions {
  display: flex;
  align-items: center;
  gap: 12px; }
.product-page__cart-btn {
  flex: 1;
  gap: 4px;
  padding: 14px 24px;
  font-size: var(--fs-text);
}
.product-page__fav-btn,
.product-page__compare-btn {
  width: 48px;
  height: 48px;
  border: 2px solid var(--color-light);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.product-page__fav-btn:hover,
.product-page__compare-btn:hover,
.product-page__fav-btn--active {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.product-page__description {
  padding-top: 20px;
  border-top: 1px solid var(--color-light);
}
.product-page__desc-title {
  font-family: var(--font-heading);
  font-size: var(--fs-sub-m);
  margin-bottom: 12px;
}
.product-page__desc-text {
  font-size: var(--fs-para);
  line-height: var(--lh-para);
  color: var(--color-dark);
}

.product-page__related-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 24px;
}
@media (max-width: 1024px) {
  .product-page__layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .product-page__related-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 товара в ряд в похожих */
  }
  .product-page__img-main {
    min-height: 300px;
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .product-page__actions {
    flex-wrap: wrap;
  }
  .product-page__cart-btn {
    flex: 1 1 100%; /* Кнопка на всю ширину */
    order: -1;
    margin-bottom: 12px;
  }
  .product-page__related-grid {
    grid-template-columns: 1fr;
  }
  .product-page__name {
    font-size: 24px;
  }
}
</style>
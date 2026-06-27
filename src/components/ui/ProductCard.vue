<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart.js'

const props = defineProps({
  product: { type: Object, required: true }
})

const cart = useCartStore()
const liked = ref(false)
const addedToCart = ref(false)
const imgError = ref(false)

function handleAddToCart() {
  cart.addToCart(props.product)
  addedToCart.value = true
  setTimeout(() => { addedToCart.value = false }, 2000)
}
</script>

<template>
  <div class="product-card">
    <RouterLink :to="`/product/${product.slug}`" class="product-card__img-link">
      <div class="product-card__img-wrap">

        <div class="product-card__badges">
          <span v-if="product.isNew" class="badge badge--new">Новинка</span>
          <span v-if="product.isSale" class="badge badge--sale">Акция</span>
        </div>

        <div class="product-card__actions">
          <button class="product-card__action-btn" @click.prevent title="Сравнить">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
          </button>
          <button
              class="product-card__action-btn"
              :class="{ 'product-card__action-btn--active': liked }"
              @click.prevent="liked = !liked"
              title="В избранное"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" :fill="liked ? 'var(--color-primary)' : 'none'" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        <img
            v-if="product.image && !imgError"
            :src="product.image"
            :alt="product.name"
            class="product-card__img"
            @error="imgError = true"
        />
        <div v-else class="product-card__img--placeholder img-placeholder">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>

      </div>
    </RouterLink>

    <div class="product-card__sep"></div>

    <div class="product-card__body">
      <RouterLink :to="`/product/${product.slug}`" class="product-card__name">
        {{ product.name }}
      </RouterLink>

      <div class="product-card__footer">
        <div class="product-card__price-block">
          <div class="product-card__price-row">
            <span class="product-card__price">{{ product.price }} ₽</span>
            <span v-if="product.oldPrice" class="product-card__old-price">{{ product.oldPrice }} ₽</span>
          </div>
          <div v-if="product.inStock" class="product-card__stock">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            в наличии
          </div>
          <div v-else class="product-card__stock product-card__stock--out">под заказ</div>
        </div>

        <button
            class="product-card__cart-btn"
            :class="{ 'product-card__cart-btn--added': addedToCart }"
            @click="handleAddToCart"
            title="В корзину"
        >
          <svg v-if="!addedToCart" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: var(--color-white);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s;
}
.product-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.product-card__img-link {
  display: block;
}

.product-card__img-wrap {
  position: relative;
  padding: 16px;
  min-height: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-white);
}

.product-card__badges {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 1;
}

.product-card__actions {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  flex-direction: row;
  gap: 6px;
  z-index: 1;
}

.product-card__action-btn {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-light);
  transition: color 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.product-card__action-btn:hover,
.product-card__action-btn--active {
  color: var(--color-primary);
}

.product-card__img {
  width: 100%;
  max-height: 170px;
  object-fit: contain;
}

.product-card__img--placeholder {
  width: 100%;
  height: 170px;
  border-radius: 2px;
}

.product-card__sep {
  height: 1px;
  background: var(--color-light);
}

.product-card__body {
  padding: 12px 14px 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-card__name {
  font-family: var(--font-body);
  font-size: var(--fs-mini);
  font-weight: 400;
  line-height: 1.45;
  color: var(--color-dark);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.product-card__name:hover { color: var(--color-primary); }

.product-card__footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
}

.product-card__price-block {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.product-card__price-row {
  display: flex;
  gap: 8px;
}

.product-card__price {
  font-family: var(--font-heading);
  font-size: 15px;   /* 20px */
  line-height: 2;
  color: var(--color-black);
}

.product-card__old-price {
  font-size: 11px;  /* 12px */
  color: var(--color-gray);
  text-decoration: line-through;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-card__stock {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--fs-shape);
  color: green;
}
.product-card__stock--out {
  color: var(--color-gray);
}

.product-card__cart-btn {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border: 2px solid var(--color-primary);
  border-radius: 2px;
  color: var(--color-primary);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.product-card__cart-btn:hover,
.product-card__cart-btn--added {
  background: var(--color-primary);
  color: var(--color-white);
}
</style>

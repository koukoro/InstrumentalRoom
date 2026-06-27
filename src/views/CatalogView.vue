<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import data from '@/data/products.json'
import CategoryCard from '@/components/ui/CategoryCard.vue'

const route = useRoute()
const currentPage = ref(3)
const pageSize = ref(9)

const activeCategory = ref(route.params.category || data.categories[0].slug)

watch(() => route.params.category, (val) => {
  if (val) activeCategory.value = val
})

const activeSubs = computed(() => data.subcategories[activeCategory.value] || [])
const visibleSubs = computed(() => activeSubs.value.slice(0, pageSize.value))
const hasMore = computed(() => activeSubs.value.length > pageSize.value)

function showMore() {
  pageSize.value += 9
}
</script>

<template>
  <div class="catalog-page">
    <div class="container">

      <nav class="breadcrumb">
        <RouterLink to="/">Главная</RouterLink>
        <span class="breadcrumb__sep">/</span>
        <span>Каталог</span>
      </nav>

      <h1 class="catalog-page__title">Каталог</h1>

      <div class="catalog-page__tabs-wrap">
        <button
            v-for="cat in data.categories"
            :key="cat.id"
            class="catalog-page__tab"
            :class="{ 'catalog-page__tab--active': activeCategory === cat.slug }"
            @click="activeCategory = cat.slug"
        >{{ cat.name }}</button>
      </div>

      <div class="catalog-page__grid" v-if="activeSubs.length > 0">
        <CategoryCard
            v-for="sub in visibleSubs"
            :key="sub.id"
            :name="sub.name"
            :image="sub.image"
            :to="`/catalog/${activeCategory}/${sub.id}`"
        />
      </div>

      <div class="catalog-page__grid" v-else>
        <CategoryCard
            v-for="cat in data.categories"
            :key="cat.id"
            :name="cat.name"
            :image="cat.image"
            :to="`/catalog/${cat.slug}`"
        />
      </div>

      <div class="catalog-page__more" v-if="hasMore">
        <button class="catalog-page__more-btn" @click="showMore">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" style="animation: spin 1s linear infinite">
            <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.37"/>
          </svg>
          Показать ещё
        </button>
      </div>

      <div class="catalog-page__pagination">
        <button class="pagination__btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button
            v-for="n in 4"
            :key="n"
            class="pagination__num"
            :class="{ 'pagination__num--active': n === currentPage }"
            @click="currentPage = n"
        >{{ n }}</button>
        <button class="pagination__btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.catalog-page {
  padding: 24px 0 64px;
  background: var(--color-bg);
  min-height: 100vh;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
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
  color: var(--color-gray);
}

.catalog-page__title {
  font-family: var(--font-heading);
  font-size: var(--fs-h1);
  line-height: var(--lh-h1);
  color: var(--color-black);
  margin-bottom: 24px;
}

.catalog-page__tabs-wrap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: var(--color-white);
  border: 1px solid var(--color-light);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 24px;
}

.catalog-page__tab {
  padding: 16px 20px;
  font-family: var(--font-body);
  font-size: var(--fs-mini);
  font-weight: 500;
  color: var(--color-dark);
  cursor: pointer;
  text-align: center;
  border-right: 1px solid var(--color-light);
  border-bottom: 1px solid var(--color-light);
  background: var(--color-white);
  transition: color 0.2s, background 0.2s;
}
.catalog-page__tab:nth-child(3n) {
  border-right: none;
}
.catalog-page__tab:nth-last-child(-n+3) {
  border-bottom: none;
}

.catalog-page__tab:hover {
  color: var(--color-primary);
}
.catalog-page__tab--active {
  background: var(--color-primary);
  color: var(--color-white);
  border-color: var(--color-primary);
}

.catalog-page__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.catalog-page__more {
  margin-bottom: 24px;
}
.catalog-page__more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px;
  background: var(--color-white);
  border: 1px solid var(--color-light);
  border-radius: 4px;
  font-family: var(--font-body);
  font-size: var(--fs-mini);
  font-weight: 500;
  color: var(--color-primary);
  cursor: pointer;
  transition: background 0.2s;
}
.catalog-page__more-btn:hover {
  background: var(--color-bg);
}

@keyframes spin { from {
  transform: rotate(0deg);
} to {transform: rotate(360deg); }
}

.catalog-page__pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 8px;
}
.pagination__btn {
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-light);
  border-radius: 2px;
  background: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-dark);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.pagination__btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
.pagination__num {
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-light);
  border-radius: 2px;
  background: var(--color-white);
  font-family: var(--font-body);
  font-size: var(--fs-mini);
  color: var(--color-dark);
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.pagination__num:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
.pagination__num--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}
@media (max-width: 1024px) {
  .catalog-page__grid {
    grid-template-columns: repeat(2, 1fr); /* 2 колонки */
  }
  .catalog-page__tabs-wrap {
    grid-template-columns: repeat(2, 1fr); /* 2 таба в ряд */
  }
  .catalog-page__tab:nth-child(3n) {
    border-right: 1px solid var(--color-light);
  }
  .catalog-page__tab:nth-child(2n) {
    border-right: none;
  }
}

@media (max-width: 768px) {
  .catalog-page__grid {
    grid-template-columns: 1fr; /* 1 колонка */
  }
  .catalog-page__tabs-wrap {
    grid-template-columns: 1fr; /* Табы друг под другом */
  }
  .catalog-page__tab {
    border-right: none !important;
  }
  .catalog-page__tab:nth-last-child(-n+3) {
    border-bottom: 1px solid var(--color-light);
  }
}
</style>
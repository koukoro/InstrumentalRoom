<template>
  <div class="news-page">
    <div class="container">
      <nav class="breadcrumb">
        <RouterLink to="/">Главная</RouterLink>
        <span class="breadcrumb__sep">/</span>
        <span>Новости</span>
      </nav>
      <h1 class="news-page__title">Новости</h1>
      <div class="news-page__grid">
        <RouterLink
            v-for="article in data.news"
            :key="article.id"
            to="#"
            class="news-card"
        >
          <div class="news-card__img img-placeholder">
            <img src="/images/garden.png" alt="Инстаграм" />
          </div>
          <div class="news-card__body">
            <h3 class="news-card__title">{{ article.title }}</h3>
            <span class="news-card__date">{{ article.date }}</span>
            <p class="news-card__text">{{ article.text }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import data from '@/data/products.json'
</script>

<style scoped>
.news-page {
  padding: 24px 0 64px;
}
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
  color: var(--color-light);
}
.news-page__title {
  font-family: var(--font-heading);
  font-size: var(--fs-h1);
  line-height: var(--lh-h1);
  margin-bottom: 32px;
}
.news-page__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}
.news-card {
  display: block;
  background: var(--color-white);
  border-radius: 4px;
  overflow: hidden;
  transition: box-shadow 0.2s;
}
.news-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}
.news-card__img {
  height: 220px;
}
.news-card__body {
  padding: 20px;
}
.news-card__title {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: var(--fs-text);
  margin-bottom: 6px;
  color: var(--color-dark);
}
.news-card__date {
  font-size: var(--fs-shape);
  color: var(--color-gray);
  display: block;
  margin-bottom: 10px;
}
.news-card__text {
  font-size: var(--fs-mini);
  line-height: var(--lh-para);
  color: var(--color-gray);
}
@media (max-width: 768px) {
  .news-page__grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .news-card__img {
    height: 180px;
  }
}
</style>
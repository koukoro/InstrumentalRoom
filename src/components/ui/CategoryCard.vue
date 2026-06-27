<script setup>
import { ref } from 'vue'

defineProps({
  name: { type: String, required: true },
  image: { type: String, default: '' },
  to: { type: String, required: true }
})

const imgError = ref(false)
</script>

<template>
  <RouterLink :to="to" class="category-card">
    <div class="category-card__img-wrap">
      <img
          v-if="image && !imgError"
          :src="image"
          :alt="name"
          class="category-card__img"
          @error="imgError = true"
      />
      <div v-else class="category-card__img category-card__img--placeholder img-placeholder">
        <img src="/images/emal.png" alt="DeWALT" class="hero__bg-img" />      </div>
    </div>
    <div class="category-card__label">
      <span>{{ name }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.category-card {
  display: block;
  border-radius: 4px;
  overflow: hidden;
  background: var(--color-white);
  transition: box-shadow 0.2s;
  cursor: pointer;
}
.category-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}
.category-card__img-wrap {
  overflow: hidden;
}
.category-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.category-card:hover .category-card__img {
  transform: scale(1.04);
}
.category-card__img--placeholder {
  width: 100%;
  height: 100%;
}
.category-card__label {
  background: var(--color-darker);
  color: var(--color-white);
  padding: 10px 16px;
  font-family: var(--font-body);
  font-size: var(--fs-mini);
  font-weight: 500;
  text-align: center;
  transition: background 0.2s;
}
.category-card:hover .category-card__label {
  background: var(--color-primary);
}
</style>
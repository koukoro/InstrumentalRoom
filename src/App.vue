<template>
  <AppHeader />
  <main class="main-content">
    <RouterView />
  </main>
  <AppFooter />
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<style>
.main-content {
  min-height: calc(100vh - 120px);
}
</style>
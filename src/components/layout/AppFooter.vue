<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__col">
        <ul class="footer__links">
          <li v-for="cat in data.categories" :key="cat.id">
            <RouterLink :to="`/catalog/${cat.slug}`">{{ cat.name }}</RouterLink>
          </li>
        </ul>
      </div>
      <div class="footer__col">
        <ul class="footer__links">
          <li><RouterLink to="/about">О компании</RouterLink></li>
          <li><RouterLink to="/contacts">Контакты</RouterLink></li>
          <li><RouterLink to="/news">Новинки</RouterLink></li>
          <li><RouterLink to="/hits">Хиты сезона</RouterLink></li>
          <li><RouterLink to="/sales">Распродажи</RouterLink></li>
        </ul>
      </div>
      <div class="footer__brand">
        <RouterLink to="/" class="footer__logo">
          <span class="logo-inst">Inst</span><br/>
          <span class="logo-room">&#9632;room</span>
        </RouterLink>
        <div class="footer__phones">
          <a href="tel:+74951203214">+7 495 120-32-14</a>
          <a href="tel:+74951203215">+7 495 120-32-15</a>
        </div>
        <div class="footer__socials">
          <img src="/images/instagram.png" alt="Инстаграм" />
          <img src="/images/vkontakte.png" alt="Вконтакте" />
          <img src="/images/facebook.png" alt="Фейсбук" />
        </div>
        <p class="footer__copy">Соглашение пользователя<br>«Copyright © Название 2023»</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import data from '@/data/products.json'
</script>

<style scoped>
.footer {
  background: var(--color-darker);
  color: var(--color-white);
  padding: 48px 0 32px;
  margin-top: 64px;
}
.footer__inner {
  display: grid;
  grid-template-columns: 1fr 1fr 280px;
  gap: 40px;
}
.footer__links li + li {
  margin-top: 10px;
}
.footer__links a {
  font-size: var(--fs-mini);
  color: var(--color-light);
  transition: color 0.2s;
}
.footer__links a:hover {
  color: var(--color-primary);
}
.footer__brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.footer__logo {
  font-family: var(--font-heading);
  font-size: 22px;
  line-height: 1.1;
  color: var(--color-white);
}
.logo-inst {
  color: var(--color-white);
}
.logo-room {
  color: var(--color-primary);
}
.footer__phones {
  display: flex; flex-direction: column; gap: 4px;
}
.footer__phones a {
  font-size: var(--fs-mini);
  color: var(--color-light);
}
.footer__socials { display: flex;
  gap: 8px;
}
.footer__social {
  color: var(--color-light);
  transition: color 0.2s;
}
.footer__social:hover {
  color: var(--color-primary);
}
.footer__copy {
  font-size: var(--fs-shape);
  color: var(--color-gray);
  line-height: 1.6;
}
@media (max-width: 1024px) {
  .footer__inner {
    grid-template-columns: 1fr 1fr; /* 2 колонки на планшете */
    gap: 32px;
  }
  .footer__brand {
    grid-column: 1 / -1; /* Бренд на всю ширину внизу */
    text-align: center;
    align-items: center;
  }
  .footer__phones { align-items: center; }
  .footer__socials { justify-content: center; }
}

@media (max-width: 768px) {
  .footer__inner {
    grid-template-columns: 1fr; /* 1 колонка на мобилке */
    text-align: center;
  }
  .footer__links {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  .footer {
    padding: 32px 0 16px;
    margin-top: 32px;
  }
}
</style>
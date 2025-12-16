<template>
  <header>
    <div class="header-container">
      <div class="logo">
        <img src="/logo.svg" alt="FoodExpress" class="logo-img" />
        Доставка экспресс
      </div>
      <div class="address">Ул. Доставки, 34</div>
      <div class="search-bar">
        <input type="text" placeholder="Поиск блюд" />
        <i class="fas fa-search"></i>
      </div>
      <div class="header-icons">
        <router-link to="/cart"><i class="fas fa-shopping-cart"></i></router-link>
        <a href="#" @click.prevent="handleAuthClick">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const handleAuthClick = () => {
  if (auth.isAuthenticated) {
    auth.logout();
    router.push("/");
  } else {
    router.push("/login");
  }
};
</script>

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
        <router-link v-if="currentRoute !== '/cart'" to="/cart" class="cart-icon">
          <i class="fas fa-shopping-cart"></i>
          <span v-if="cart.totalItems > 0" class="cart-badge">{{ cart.totalItems }}</span>
        </router-link>
        <router-link v-else to="/" class="cart-icon">
          <i class="fas fa-home"></i>
        </router-link>

        <a href="#" @click.prevent="handleAuthClick">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { computed } from "vue";

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();
const cart = useCartStore();

const currentRoute = computed(() => route.path);

const handleAuthClick = () => {
  if (auth.isAuthenticated) {
    auth.logout();
    router.push("/");
  } else {
    router.push("/login");
  }
};
</script>

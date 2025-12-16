<template>
  <Header />
  <main>
    <!-- Категории можно захардкодить или загрузить отдельно -->
    <section>
      <h2>Категории</h2>
      <div class="categories">
        <div class="category-card"><img src="/image/pizza.png" alt="Пицца" />Пицца</div>
        <div class="category-card"><img src="/image/burger.png" alt="Бургеры" />Бургеры</div>
        <div class="category-card"><img src="/image/sup.png" alt="Супы" />Супы</div>
        <div class="category-card"><img src="/image/salat.png" alt="Салаты" />Салаты</div>
        <div class="category-card"><img src="/image/desert.png" alt="Десерты" />Десерты</div>
        <div class="category-card"><img src="/image/drink.png" alt="Напитки" />Напитки</div>
      </div>
    </section>

    <section>
      <h2>Популярные блюда</h2>
      <div class="popular" v-if="dishStore.loading">Загрузка...</div>
      <div class="popular" v-else>
        <DishCard
          v-for="dish in dishStore.popularDishes"
          :key="dish._id"
          :title="dish.name"
          :description="dish.compound"
          :price="dish.price"
          :rating="dish.rating"
          image="/image/pizza-card.jpg"
          @add-to-cart="addToCart(dish)"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import Header from "@/components/Header.vue";
import CategoryCard from "@/components/CategoryCard.vue";
import DishCard from "@/components/DishCard.vue";
import { useDishStore } from "@/stores/dish";
import { useCartStore } from "@/stores/cart";

const dishStore = useDishStore();
const cart = useCartStore();

onMounted(() => {
  dishStore.fetchPopular();
});

const addToCart = (dish) => {
  cart.addItem({
    id: dish._id,
    title: dish.name,
    description: dish.compound,
    price: dish.price,
    image: "/image/pizza-card.jpg", // потом можно добавить поле img в модель
    rating: dish.rating,
  });
};
</script>

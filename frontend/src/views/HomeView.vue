<template>
  <Header />
  <main>
    <section>
      <h2>Категории</h2>
      <div class="categories">
        <!-- Карточка "Все" -->
        <div
          class="category-card"
          :class="{ active: selectedCategory === null }"
          @click="selectedCategory = null"
        >
          <i class="fas fa-th-large category-img" style="font-size: 40px"></i>
          Все
        </div>

        <!-- Остальные категории -->
        <div
          v-for="cat in categories"
          :key="cat"
          class="category-card"
          :class="{ active: selectedCategory === cat }"
          @click="toggleCategory(cat)"
        >
          <img :src="`/image/${cat}.png`" :alt="catNames[cat]" class="category-img" />
          {{ catNames[cat] }}
        </div>
      </div>
    </section>

    <section>
      <h2>Популярные блюда</h2>
      <div class="search-bar" style="margin-bottom: 20px; max-width: 500px">
        <input v-model="searchQuery" type="text" placeholder="Поиск блюд..." />
        <i class="fas fa-search"></i>
      </div>

      <div class="popular" v-if="dishStore.loading">Загрузка...</div>
      <div class="popular" v-else-if="filteredDishes.length === 0">Ничего не найдено</div>
      <div class="popular" v-else>
        <DishCard
          v-for="dish in filteredDishes"
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
import { onMounted, ref, computed } from "vue";
import Header from "@/components/Header.vue";
import DishCard from "@/components/DishCard.vue";
import { useDishStore } from "@/stores/dish";
import { useCartStore } from "@/stores/cart";

const dishStore = useDishStore();
const cart = useCartStore();

const searchQuery = ref("");
const selectedCategory = ref(null); // null = все блюда

const categories = ["pizza", "burger", "soup", "salad", "dessert", "drink"];
const catNames = {
  pizza: "Пицца",
  burger: "Бургеры",
  soup: "Супы",
  salad: "Салаты",
  dessert: "Десерты",
  drink: "Напитки",
};

// Новая функция: toggle — если уже выбрана, сбрасываем
const toggleCategory = (cat) => {
  selectedCategory.value = selectedCategory.value === cat ? null : cat;
};

const filteredDishes = computed(() => {
  let dishes = dishStore.popularDishes;

  // Фильтр по категории
  if (selectedCategory.value) {
    dishes = dishes.filter((d) => d.category === selectedCategory.value);
  }

  // Поиск
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    dishes = dishes.filter(
      (d) => d.name.toLowerCase().includes(query) || d.compound.toLowerCase().includes(query),
    );
  }

  return dishes;
});

onMounted(() => {
  dishStore.fetchPopular();
});

const addToCart = (dish) => {
  cart.addItem({
    id: dish._id,
    title: dish.name,
    description: dish.compound,
    price: dish.price,
    image: "/image/pizza-card.jpg",
  });
};
</script>

<style scoped>
.category-card {
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}
.category-card:hover {
  background: #fff4f0;
  transform: translateY(-4px);
}
.category-card.active {
  background: #ff6b35;
  color: white;
}
.category-card.active:hover {
  background: #e55a2b;
}
</style>

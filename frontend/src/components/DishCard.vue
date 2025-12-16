<template>
  <div class="dish-card">
    <img :src="image" :alt="title" class="dish-img" />
    <div class="rating-badge"><i class="fas fa-star"></i> {{ rating }}</div>
    <div class="dish-info">
      <div class="dish-title">{{ title }}</div>
      <div class="dish-desc">{{ description }}</div>
      <div class="dish-bottom">
        <div class="price">{{ price }} ₽</div>
        <button class="add-btn" @click="$emit('add-to-cart')">+</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  price: Number,
  rating: { type: [String, Number], default: "4.9" },
  image: String,
});
</script>

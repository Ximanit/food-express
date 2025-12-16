<template>
  <div class="cart-item">
    <img src="/image/pizza-card.jpg" :alt="title" class="item-img" />
    <div class="item-info">
      <div class="item-title">{{ title }}</div>
      <div class="item-desc">{{ description }}</div>
      <div class="quantity">
        <button @click="$emit('decrement')">-</button>
        <span>{{ quantity }}</span>
        <button @click="$emit('increment')">+</button>
      </div>
    </div>
    <div class="price-delete">
      <div class="item-price">{{ totalPrice }} ₽</div>
      <i class="fas fa-trash-alt delete-btn" @click="$emit('remove')"></i>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: String,
  description: String,
  price: Number,
  quantity: Number,
  image: String,
});

const emit = defineEmits(["increment", "decrement", "remove"]);

const totalPrice = computed(() => props.price * props.quantity);
</script>

<template>
  <div class="order-details">
    <h2>Детали заказа</h2>
    <div class="details-group">
      <div class="details-title">Адрес доставки</div>
      <div class="details-text">{{ address }}</div>
      <a href="#" class="change-link">Изменить</a>
    </div>
    <div class="details-group">
      <div class="details-title">Время доставки</div>
      <div class="details-text">30 - 40 минут</div>
    </div>
    <div class="separator"></div>
    <div class="summary-item">
      <span>Сумма</span><span>{{ total }} ₽</span>
    </div>
    <div class="summary-item"><span>Доставка</span><span class="free">Бесплатно</span></div>
    <div class="separator"></div>
    <div class="summary-item total">
      <span>Итого</span><span>{{ total }} ₽</span>
    </div>
    <button class="btn" @click="$emit('checkout')">Сделать заказ</button>
  </div>
</template>

<script setup>
defineProps({
  total: Number,
  address: { type: String, default: "Ул. Доставки, 3, кв 14" },
});

defineEmits(["checkout"]);
</script>

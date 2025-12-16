<template>
  <Header />
  <div class="cart-main">
    <div class="cart-section">
      <h2>Корзина</h2>
      <CartItem
        v-for="item in cart.items"
        :key="item.id"
        v-bind="item"
        @increment="cart.increment(item.id)"
        @decrement="cart.decrement(item.id)"
        @remove="cart.removeItem(item.id)"
      />
      <div v-if="cart.items.length === 0" class="empty-cart">Корзина пуста</div>
    </div>

    <OrderSummary :total="cart.totalPrice" @checkout="handleCheckout" />
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import CartItem from "@/components/CartItem.vue";
import OrderSummary from "@/components/OrderSummary.vue";
import { useCartStore } from "@/stores/cart";

const cart = useCartStore();

const handleCheckout = () => {
  console.log("Оформление заказа на сумму:", cart.totalPrice);
  // Здесь будет переход к оплате или вызов API
};
</script>

<style scoped>
.empty-cart {
  text-align: center;
  padding: 40px;
  color: #888;
}
</style>

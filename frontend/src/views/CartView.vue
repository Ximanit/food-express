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
import { useAuthStore } from "@/stores/auth"; // ← добавь импорт
import api from "@/api/api";

const cart = useCartStore();
const auth = useAuthStore(); // ← получаем store

const handleCheckout = async () => {
  if (cart.items.length === 0) {
    alert("Корзина пуста!");
    return;
  }

  try {
    const payload = {
      items: cart.items.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      total: cart.totalPrice,
      address: "Ул. Доставки, 34", // потом можно сделать форму
    };

    // Если пользователь авторизован — добавляем его ID
    if (auth.isAuthenticated && auth.user?.id) {
      payload.userId = auth.user.id;
    }

    await api.post("/order", payload);

    alert("Заказ успешно оформлен!");
    cart.items = []; // очищаем корзину
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Ошибка при оформлении заказа");
  }
};
</script>

<style scoped>
.empty-cart {
  text-align: center;
  padding: 40px;
  color: #888;
}
</style>

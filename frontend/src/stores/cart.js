import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  getters: {
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
  },
  actions: {
    addItem(item) {
      const existing = this.items.find((i) => i.id === item.id);
      if (existing) existing.quantity++;
      else this.items.push({ ...item, quantity: 1 });
    },
    removeItem(id) {
      this.items = this.items.filter((i) => i.id !== id);
    },
    increment(id) {
      const item = this.items.find((i) => i.id === id);
      if (item) item.quantity++;
    },
    decrement(id) {
      const item = this.items.find((i) => i.id === id);
      if (item && item.quantity > 1) item.quantity--;
      else this.removeItem(id);
    },
  },
});

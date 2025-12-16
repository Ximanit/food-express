import { defineStore } from "pinia";
import api from "@/api/api";

export const useDishStore = defineStore("dish", {
  state: () => ({
    popularDishes: [],
    categories: [], // если будет отдельный эндпоинт
    loading: false,
  }),
  actions: {
    async fetchPopular() {
      this.loading = true;
      try {
        const response = await api.get("/dish"); // предположительно GET /api/dish возвращает все блюда
        this.popularDishes = response.data;
      } catch (error) {
        console.error("Ошибка загрузки блюд:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});

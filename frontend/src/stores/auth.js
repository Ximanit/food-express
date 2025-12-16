import { defineStore } from "pinia";
import api from "@/api/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    async register(userData) {
      const response = await api.post("/auth/register", userData);
      this.user = response.data.user;
      this.isAuthenticated = true;
      return response.data;
    },
    async login(credentials) {
      const response = await api.post("/auth/login", credentials);
      this.user = response.data.user;
      this.isAuthenticated = true;
      return response.data;
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
  persist: true, // опционально: npm install pinia-plugin-persistedstate
});

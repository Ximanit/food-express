<template>
  <div class="auth-wrapper">
    <div class="auth-container">
      <AuthLeft />
      <div class="auth-right">
        <h2>Вход в аккаунт</h2>
        <p>Введите свои данные для входа</p>
        <form class="auth-form" @submit.prevent="submitLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              placeholder="test.test@test.com"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <input v-model="form.password" type="password" id="password" required />
          </div>
          <div class="links">
            <div class="checkbox-group">
              <input type="checkbox" id="remember" v-model="form.remember" checked />
              <label for="remember">Запомнить меня</label>
            </div>
            <a href="#" class="forgot-link">Забыли пароль?</a>
          </div>
          <button type="submit" class="btn">Войти</button>
        </form>
        <div class="auth-link">
          Нет Аккаунта? <router-link to="/register">Зарегистрироваться</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import AuthLeft from "@/components/AuthLeft.vue";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

const form = reactive({
  email: "",
  password: "",
  remember: true,
});

const submitLogin = async () => {
  try {
    await auth.login({
      email: form.email,
      password: form.password,
    });
    alert("Вход успешен!");
    router.push("/");
  } catch (error) {
    alert(error.response?.data?.message || "Ошибка входа");
  }
};
</script>

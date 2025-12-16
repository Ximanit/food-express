<template>
  <div class="auth-wrapper">
    <div class="auth-container">
      <AuthLeft />
      <div class="auth-right">
        <h2>Создать аккаунт</h2>
        <p>Заполните форму для регистрации</p>
        <form class="auth-form" @submit.prevent="submitRegister">
          <div class="form-group">
            <label for="username">Имя</label>
            <input
              v-model="form.username"
              type="text"
              id="username"
              placeholder="Иванов Иван"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              placeholder="test@test.com"
              required
            />
          </div>
          <div class="form-group">
            <label for="phone">Телефон</label>
            <input
              v-model="form.phone"
              type="tel"
              id="phone"
              placeholder="+7 (999) 123-45-67"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <input v-model="form.password" type="password" id="password" required />
          </div>
          <div class="form-group">
            <label for="confirm">Подтвердите пароль</label>
            <input v-model="form.confirm" type="password" id="confirm" required />
          </div>
          <div class="checkbox-group">
            <input type="checkbox" id="terms" v-model="form.terms" checked required />
            <label for="terms">
              Я согласен с <a href="#">условиями использования</a> и
              <a href="#">политикой конфиденциальности</a>
            </label>
          </div>
          <button type="submit" class="btn">Создать аккаунт</button>
        </form>
        <div class="auth-link">Есть аккаунт? <router-link to="/login">Войти</router-link></div>
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
  username: "",
  email: "",
  phone: "",
  password: "",
  confirm: "",
  terms: true,
});

const submitRegister = async () => {
  if (form.password !== form.confirm) {
    alert("Пароли не совпадают");
    return;
  }
  if (form.password.length < 6) {
    alert("Пароль должен быть не менее 6 символов");
    return;
  }

  try {
    await auth.register({
      username: form.username,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });
    alert("Регистрация успешна!");
    router.push("/");
  } catch (error) {
    alert(error.response?.data?.message || "Ошибка регистрации");
  }
};
</script>

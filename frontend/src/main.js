import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "../styles.css"; // ваш существующий styles.css
import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");

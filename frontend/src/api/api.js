import axios from "axios";

const api = axios.create({
  baseURL: "https://food-express-nsof.onrender.com/api", // или ваш продакшн URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

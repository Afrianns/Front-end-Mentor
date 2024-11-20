import { createApp } from "vue";
import router from "./router/route.ts";
import "./style.css";
import App from "./App.vue";

createApp(App).use(router).mount("#app");

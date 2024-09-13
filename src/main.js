import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import globalComponent from "@/components/index";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(router).mount("#app");
app.use(globalComponent);
app.use(pinia);

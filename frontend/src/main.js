import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import router from "./router";
import "./assets/style/main.css"
import vuestic from "./plugins/vuestic";
import "vuestic-ui/styles/essential.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuestic);

app.mount("#app");
import { createApp } from "vue";
import App from "./App.js";
import router from "./router";
import store from "./store";
import 'ant-design-vue/dist/antd.less';
import '@/assets/css/index.less'
import './styles/global.less';
createApp(App).use(store).use(router).mount("#app");

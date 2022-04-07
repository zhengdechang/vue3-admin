import { createStore } from "vuex";
import setting from './modules/setting';
import menu from './modules/menu';
import user from './modules/user';




export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    setting,
    menu,
    user
  }
});

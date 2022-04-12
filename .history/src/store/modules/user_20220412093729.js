// import { logout, login, getUseInfo, LoginInfoType } from '@/apis/user';
import { login, } from '@/apis/user';
import Final from '@/config/keys';
// import router from '@/router';
// import { transformRoutes, resetRoutes } from '@/utils/biz';



const initInfo = {
  username: '',
  avatar: ''
};

const state = {
  info: initInfo,
  token: localStorage.getItem(Final.TOKEN) || ''
};

const mutations = {
  setToken(state, payload) {
    state.token = payload.token;
  },
  reset(state) {
    state.token = '';
    state.info = initInfo;
    localStorage.removeItem(Final.TOKEN);
  },
  setUserInfo(state, payload) {
    state.info = payload.info;
  }
};

const actions = {
  login(store, payload) {
    return login(payload)
      .then(({ data }) => {
        store.commit('setToken', data);
        return data.token;
      })
      .then((token) => {
        payload.remembered && localStorage.setItem(Final.TOKEN, token);
      })
      .then(async () => {
        await store.dispatch('getLoginUser');
      })
      .then(() => {
        const from = router.currentRoute.value.query.from;
        router.push(from || '/');
      });
  },
  // logout(store) {
  //   return logout()
  //     .then(() => {
  //       store.commit('reset');
  //     })
  //     .then(() => {
  //       store.commit('menu/resetMenu', { newRoutes: [] }, { root: true });
  //       // 重置路由
  //       resetRoutes([]);
  //     })
  //     .then(() => {
  //       // 返回登录界面
  //       router.push(
  //         `/login?from=${encodeURIComponent(router.currentRoute.value.fullPath)}`
  //       );
  //     });
  // },
  // async getLoginUser(store) {
  //   const { data } = await getUseInfo();

  //   store.commit('setUserInfo', data);
  //   // 将后端菜单列表转换为vue-router列表
  //   const newRoutes = transformRoutes(data.menus);

  //   store.commit('menu/resetMenu', { newRoutes }, { root: true });
  //   store.commit('setting/setCacheList', { routes: newRoutes }, { root: true });

  //   // 重置路由
  //   resetRoutes(newRoutes);

  //   return data;
  // }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

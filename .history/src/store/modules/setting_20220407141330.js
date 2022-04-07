import setting from '@/config/setting';
import Final from '@/config/keys';
// import darkVars from '@/config/dark.json';
// import lightVars from '@/config/light.json';



// const lessHandler = (themeName) => {
//   switch (themeName) {
//     case 'dark': {
//       window.less.modifyVars(darkVars);
//       break;
//     }
//     case 'light': {
//       window.less.modifyVars(lightVars);
//       break;
//     }
//     case 'mix': {
//       window.less.modifyVars(lightVars);
//     }
//   }
// };

// const cacheTheme = localStorage.getItem(Final.THEME);

const state = {
  aside: 'open',
  selectedKeys: ['/'],
  openKeys: setting.openKeys,
  breadcrumbs: [],
  theme:
    (cacheTheme === 'dark' && 'dark') ||
    (cacheTheme === 'light' && 'light') ||
    (cacheTheme === 'mix' && 'mix') ||
    'dark',
  cacheList: []
};

// lessHandler(state.theme);

// 获取路由列表中需要缓存的组件名称
const getCacheComponentName = (routes) => {
  const list = new Set();

  const innerLoop = (routesRow) => {
    routesRow.forEach((route) => {
      if (route.meta && route.meta.keepAlive && route.meta.cname) {
        list.add(route.meta.cname);
      }

      // 判断是否存在子组件
      if (route.children && route.children.length > 0) {
        innerLoop(route.children);
      }
    });
  };

  innerLoop(routes);
  return Array.from(list);
};

const mutations = {
  asideState(state, payload) {
    state.aside = payload.aside;
  },
  routeChanged(
    state,
    payload
  ) {
    // ['index','data']
    const levels = payload.path.match(/[^/]+/g) || [];

    // 删除最后一个Item，展开其他的所有父级菜单
    levels.pop();

    const openKeysTemp = setting.openKeys;

    // 解决一级路由不能正确展开菜单
    if (levels.length === 0) {
      levels.push('');
    }
    levels.reduce((prev, curr) => {
      openKeysTemp.push(prev + '/' + curr);
      return prev + '/' + curr;
    }, '');

    state.selectedKeys = [payload.path];
    state.openKeys = openKeysTemp;
    state.breadcrumbs = payload.breadcrumbs;
  },
  // 切换主题
  // themeChanged(state, payload) {
  //   state.theme = payload.theme;
  //   localStorage.setItem(Final.THEME, payload.theme);
  //   lessHandler(payload.theme);
  // },
  // 生成新的缓存名单
  setCacheList(state, payload) {
    state.cacheList = [...state.cacheList, ...getCacheComponentName(payload.routes)];
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

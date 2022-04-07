import {routes} from '@/router/config';



const transformMenu = (routes)=> {
  const menuList = [];

  const innerLoop = (_routes, parent)=> {
    _routes.forEach((item) => {
      // 设置了menu为true才显示
      if (item.menu) {
        const menu = {
          title: item.meta?.title || '',
          path: `${parent.path.replace(/\/$/, '')}/${item.path.replace(/^\//, '')}`,
          iconName: item.meta?.iconName,
          iconHref: item.meta?.iconHref,
          children: [],
          outLink: item.outLink
        };

        if (item.children && item.children.length > 0) {
          innerLoop(item.children, menu);
        }

        parent.children.push(menu);
      }
    });
  };

  innerLoop(routes, { children: menuList, path: '', title: '' });

  return menuList;
};

const state = {
  menuList: []
};
const mutations = {
  resetMenu(
    state,
    payload
  ) {
    state.menuList = transformMenu(routes?.concat(payload.newRoutes));
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

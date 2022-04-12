import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./config";
import NProgress from 'nprogress';
import { getToken } from '@/utils/biz';



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach(async (to, _, next) => {
  NProgress.start();

  const token = getToken();

  // 返回之前页面如有额外query参数可自行携带
  // 例如：
  // const { query } = to;
  // delete query.from;
  // next(`/?${Object.entries(query).join('&').replace(/,/g, '=')}`);

  if (token) {
    // 检测是否有用户信息
    // if (!store.state.user.info?.username) {
    //   // 获取用户信息
    //   await store.dispatch('user/getLoginUser');
    // }

    // 有token时，前往登录页
    if (/^\/login.*/.test(to.path)) {
      if (to.query.from) {
        // 存在登录跳转回页面
        next(to.query.from);
      } else {
        next('/');
      }
    } else {
      store.commit('setting/routeChanged', {
        path: to.path,
        breadcrumbs: to.matched
          .filter((item) => item.meta?.title)
          .map((item) => item.meta?.title)
      });

      document.title = `${to.meta?.title || ''} - 管理系统`;
      next();
    }
  } else {
    // 没有token

    // 判断是否是登录页，防止死循环
    if (/^\/login.*/.test(to.path)) {
      next();
    } else if (/^\/404/.test(to.path)) {
      const from = to.query.from;
      next(from ? `/login?from=${from}` : `/login`);
    } else {
      next(`/login?from=${to.path}`);
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});




export default router;

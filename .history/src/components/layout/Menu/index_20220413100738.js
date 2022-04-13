import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { Menu } from 'ant-design-vue';
import { RouterLink } from 'vue-router';
import { routes } from "@/router/config";
// import * as Icon from '@ant-design/icons-vue';

const menuItemRender = (menu) => {
  return <Menu.Item key={menu.path}>
    <RouterLink to={menu.path}>
      {menu.meta?.title}
    </RouterLink>
  </Menu.Item>
};

const menuChildRender = (menuList) => {
  return menuList?.map((menu) => {
    console.log(menu.children.length, menu.children, menu)
    return (
      <>
        {menu.children?.length > 0 ? (
          <Menu.SubMenu
            key={menu.path}
            title={menu.title}
          >
            {menu.children.map((menuChild) => (
              <>
                {menuChild.children.length === 0 ? (
                  menuItemRender(menuChild)
                ) : (
                  <Menu.SubMenu
                    key={menuChild.path}
                    icon={menu.meta.icon && <menu.meta.icon />}
                    title={menuChild.title}
                  >
                    {menuChildRender(menuChild.children)}
                  </Menu.SubMenu>
                )}
              </>
            ))}
          </Menu.SubMenu>
        ) : (
          menuItemRender(menu?.children?.[0] || menu)
        )}
      </>
    );
  });
};

export default defineComponent({
  // 组件需要申明props，setup方法中才能正确接收到props
  setup() {
    const store = useStore();
    const aside = computed(() => store.state.setting.aside === 'close');

    return () => (
      <Menu
        mode="inline"
        inlineCollapsed={aside.value}
        // class="skin-dark"
        theme={store.state.setting.theme === 'light' ? 'light' : 'dark'}
        selectedKeys={store.state.setting.selectedKeys}
        openKeys={store.state.setting.openKeys}
      // background-color="#1d1e23"
      // text-color="#eee"
      // collapse-transition={false}
      >
        {menuChildRender(routes[0]?.children)}
      </Menu>
    );
  }
});

import { defineComponent, computed, h } from 'vue';
import { useStore } from 'vuex';
import { Menu } from 'ant-design-vue';
import { RouterLink } from 'vue-router';
import { routes } from "@/router/config";
import * as Icon from '@ant-design/icons-vue';

const menuItemRender = (menu) => {
  return <Menu.Item key={menu.path}>
    <RouterLink to={menu.path}>
      {menu.icon && h(Icon[menu.icon])}
      <span>{menu.title}</span>
    </RouterLink>
  </Menu.Item>
};

const menuChildRender = (menuList) => {
  return menuList.map((menu) => {
    return (
      <>
        {menu.children.length > 1 ? (
          <Menu.SubMenu
            key={menu.path}
            title={
              <>
                {menu.icon && h(Icon[menu.icon])}
                <span>{menu.title}</span>
              </>
            }
          >
            {menu.children.map((menuChild) => (
              <>
                {menuChild.children.length === 0 ? (
                  menuItemRender(menuChild)
                ) : (
                  <Menu.SubMenu
                    key={menuChild.path}
                    title={
                      <>
                        {menuChild.icon && h(Icon[menuChild.icon])}
                        <span>{menuChild.title}</span>
                      </>
                    }
                  >
                    {menuChildRender(menuChild.children)}
                  </Menu.SubMenu>
                )}
              </>
            ))}
          </Menu.SubMenu>
        ) : (
          menuItemRender(menu.children[0] || menu)
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
        {menuChildRender(route)}
      </Menu>
    );
  }
});

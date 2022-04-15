import { defineComponent, reactive, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';
import screenfull from 'screenfull';
import { DEMO_USER_HEAD } from '@/config/urls';
import router from '@/router';
import {
  Breadcrumb,
  message,
  Avatar,
  Dropdown,
  Menu,
  // notification
} from 'ant-design-vue';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  SettingOutlined,
  PoweroffOutlined,
  UserOutlined
} from '@ant-design/icons-vue';

import './index.less';

// import MyIcon from '@/components/IconFont';


// 同时设置props的vue属性和ts类型，setup会报错
// interface NavBarPropsType {
//   setSettingVisible: (val: boolean) => void;
// }

export default defineComponent({
  props: {
    setSettingVisible: {

    }
  },
  setup(props) {
    const store = useStore();

    const configData = reactive({
      // 全屏状态
      isFullscreen: false,
      // 通知内容显示
      bellContent: false,
    });
    const userInfo = reactive({
      username: '',
      avatar: ''
    });


    const getUserInfo = () => {
      userInfo = store.state.user.info
    }

    onMounted(() => {
      getUserInfo()
    })

    const adjustMenu = () => {
      store.commit('setting/asideState', {
        aside: store.state.setting.aside === 'open' ? 'close' : 'open'
      });
    };



    // 调整主题
    // const adjustTheme = ({ key }) => {
    //   store.commit('setting/themeChanged', {
    //     theme: key
    //   });
    // };

    const fullScreen = () => {
      if (screenfull.isEnabled) {
        if (screenfull.isFullscreen) {
          screenfull.exit();
        } else screenfull.request();
      } else {
        message.error('浏览器不支持全屏');
      }
    };

    // 退出登录
    const logout = () => {
      // store.dispatch('user/logout').catch((error) => {
      //   notification.error({
      //     message: '操作失败！',
      //     description: error?.msg || '未知的异常！'
      //   });
      // });
      localStorage.removeItem('TOKEN')
      router.push('/login');
      console.log(configData, store.state.user.info, '1')
    };

    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        configData.isFullscreen = !configData.isFullscreen;
      });
    }



    return () => (
      <div class="layout-bar">
        <ul class="layout-bar-left">
          <li onClick={adjustMenu} class="cper">
            {store.state.setting.aside === 'open' ? (
              <MenuFoldOutlined />
            ) : (
              <MenuUnfoldOutlined />
            )}
          </li>
          <li class="breadcrumb-help">
            <Breadcrumb separator="/">
              {store.state.setting.breadcrumbs.map((breadcrumb, index) => (
                <Breadcrumb.Item key={breadcrumb + index}>{breadcrumb}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </li>
        </ul>
        <ul class="layout-bar-right">
          {/* <Dropdown
            trigger={['click']}
            overlay={
              <Menu onClick={adjustTheme}>
                <Menu.Item key="mix">
                  <MyIcon type="icon-ditu_diqiu" />
                  黑白主题
                </Menu.Item>
                <Menu.Item key="light">
                  <MyIcon type="icon-taiyang" />
                  白色主题
                </Menu.Item>
                <Menu.Item key="dark">
                  <MyIcon type="icon-yueliang" />
                  暗黑主题
                </Menu.Item>
              </Menu>
            }
          >
            <li>
              <SkinOutlined />
            </li>
          </Dropdown> */}

          <li onClick={fullScreen}>
            {configData.isFullscreen ? (
              <FullscreenOutlined />
            ) : (
              <FullscreenExitOutlined />
            )}
          </li>
          <li
            onClick={() => {
              props.setSettingVisible(true);
            }}
          >
            <SettingOutlined />
          </li>
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu>
                <Menu.Item>
                  <RouterLink to="/user" class="layout-bar-link">
                    <UserOutlined /> 个人中心
                  </RouterLink>
                </Menu.Item>
                <Menu.Item>
                  <RouterLink to="/user/setting" class="layout-bar-link">
                    <SettingOutlined /> 个人设置
                  </RouterLink>
                </Menu.Item>
                <Menu.Item onClick={logout}>
                  <PoweroffOutlined />
                  退出登录
                </Menu.Item>
              </Menu>
            }
          // v-slots={{
          //   overlay:
          // }}
          >
            <li>
              <Avatar size="small" src={DEMO_USER_HEAD} />
              111
            </li>
          </Dropdown>
        </ul>
      </div>
    );
  }
});

import { computed, defineComponent, KeepAlive } from 'vue';
import { RouterView } from 'vue-router';
import { useStore } from 'vuex';
import './index.less';

import LogoImg from '@/assets/logo.png';
import './index.less';
// import { key } from '@/store';
// import Setting from './Setting';
// import RouteBar from './RouteBar';
// import Menu from './Menu';
// import NavBar from './NavBar';

const Home = defineComponent({
    setup() {
        const store = useStore();

        console.log(store, 'store')

        // 侧边栏展开状态
        const asideOpen = computed(() => {
            return store.state.setting.aside === 'open';
        });

        // 侧边栏样式
        const layoutAsideClass = computed(() => {
            return store.state.setting.aside === 'open'
                ? 'layout-aside'
                : 'layout-aside layout-aside-close';
        });

        // const data = reactive({
        //     settingVisible: false
        // });
        return () => (
            <section class="wrapper">
                <div class={layoutAsideClass.value}>
                    <header class="logo">
                        <img src={LogoImg} />
                        {asideOpen.value && <span>Vue3管理系统</span>}
                    </header>
                    <div class="menu-container">
                        {/* <Menu /> */}
                    </div>
                    {asideOpen.value && (
                        <footer class="copyright">
                            <span>@2022 @author long</span>
                        </footer>
                    )}
                </div>
                <div class="layout">
                    <header class="layout-header">
                        {/* <NavBar
                            setSettingVisible={(val) => {
                                data.settingVisible = val;
                            }}
                        /> */}
                    </header>
                    {/* <RouteBar /> */}
                    <main class="layout-main">
                        <RouterView>
                            {({ Component }) => {
                                return (
                                    <KeepAlive include={store.state.setting.cacheList}>
                                        <Component />
                                    </KeepAlive>
                                );
                            }}
                        </RouterView>
                    </main>
                </div>
                <div class="drawer">
                    {/* <Setting
                        visible={data.settingVisible}
                        setVisible={() => {
                            data.settingVisible = false;
                        }}
                    /> */}
                </div>
            </section>
        );
    }
});

export default Home;

import { defineComponent } from 'vue';

const Layout = defineComponent({
    setup() {
        return () => (
            <router-view></router-view>
        );
    }
});

export default Layout;

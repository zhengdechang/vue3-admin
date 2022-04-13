import { defineComponent } from 'vue';

import './index.less';

const Layout = defineComponent({
    setup() {
        return () => (
            <router-view></router-view>
        );
    }
});

export default Layout;

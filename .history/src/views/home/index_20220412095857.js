import { defineComponent } from 'vue';

import './index.less';

const Layout = defineComponent({
    setup() {
        return () => (
            <div class="home">
                123
                <router-view></router-view>
            </div>
        );
    }
});

export default Layout;

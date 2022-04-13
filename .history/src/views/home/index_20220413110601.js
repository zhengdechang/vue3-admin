import { defineComponent } from 'vue';

import './index.less';

const Layout = defineComponent({
    setup() {
        return () => (
            <div class="home">
                <router-view></router-view>
            </div>
        );
    }
});

export default Layout;

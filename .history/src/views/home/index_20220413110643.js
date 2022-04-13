import { defineComponent } from 'vue';

import './index.less';

const Home = defineComponent({
    setup() {
        return () => (
            <div class="home">
                <router-view></router-view>
            </div>
        );
    }
});

export default Home;

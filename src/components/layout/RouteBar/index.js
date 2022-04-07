import { Tag } from 'ant-design-vue';
import { defineComponent } from 'vue';

import './index.less';

export default defineComponent({
  setup() {
    return () => (
      <div class="route-bar">
        <Tag>首页</Tag>
        <Tag color="blue">文章详情</Tag>
      </div>
    );
  }
});

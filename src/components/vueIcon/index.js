import { createVNode } from 'vue'
import * as $Icon from '@ant-design/icons-vue'

export const VueIcon = (props) => {
    const { icon } = props;
    var antIcon = $Icon;
    return createVNode(antIcon[icon]);
};
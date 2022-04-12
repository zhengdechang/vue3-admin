import { reactive, defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import './index.less';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { Input, Checkbox, Button, Popconfirm, message, Spin } from 'ant-design-vue';
import { onBeforeRouteLeave } from 'vue-router';

const Login = defineComponent({
    setup() {
        return () => (
            <div class="login" id="login">
                <Spin spinning={data.spinning}>
                    <div class="login-container">
                        <div class="login-form">
                            <h1 class="form-title">Vue3-admin</h1>
                            <p class="text-help">这里不知道写点什么，多几个文字比较好看吧</p>
                            <div class="form-item">
                                <Input
                                    size="large"
                                    type="text"
                                    value={data.info.username}
                                    onChange={(e) => {
                                        data.info.username = e.target.value;
                                    }}
                                    placeholder="username: 1"
                                    prefix={<UserOutlined />}
                                ></Input>
                            </div>
                            <div class="form-item">
                                <Input
                                    size="large"
                                    type="password"
                                    value={data.info.password}
                                    onChange={(e) => {
                                        data.info.password = e.target.value;
                                    }}
                                    show-password
                                    placeholder="password: 1"
                                    prefix={<LockOutlined />}
                                ></Input>
                            </div>
                            <div class="form-item" style="margin-bottom: 14px">
                                <Checkbox
                                    checked={data.remembered}
                                    onChange={(e) => {
                                        data.remembered = e.target.checked;
                                    }}
                                >
                                    记住我
                                </Checkbox>
                                <Popconfirm
                                    title="这个我也不知道咋办！"
                                    okText="好的"
                                    cancelText="被迫好的"
                                >
                                    <span class="forget-p-help cper">忘记密码？</span>
                                </Popconfirm>
                            </div>
                            <div class="form-item">
                                <Button type="primary" onClick={login} style="width: 100%" size="large">
                                    登录
                                </Button>
                            </div>
                            <div class="form-item">
                                <div class="oauth-title">其他方式登录：</div>
                                <ul class="oauth">
                                    <li class="cper">
                                        <span class="iconfont icon-qq login-icon"></span>
                                    </li>
                                    <li class="cper">
                                        <span class="iconfont icon-icon-test login-icon"></span>
                                    </li>
                                    <li class="cper">
                                        <span class="iconfont icon-icon-test1 login-icon"></span>
                                    </li>
                                    <li class="cper">
                                        <span class="iconfont icon-icon-test2 login-icon"></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="login-welcome">
                            <p>树叶的一生</p>
                            <p>只是为了归根吗</p>
                        </div>
                    </div>
                </Spin>
            </div>
        );
    }
});

export default Login;

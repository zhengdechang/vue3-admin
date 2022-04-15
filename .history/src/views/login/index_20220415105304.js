import { reactive, defineComponent, onMounted } from 'vue';
// import { useStore } from 'vuex';
import './index.less';
import Final from '@/config/keys';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { Input, Checkbox, Button, message, Spin } from 'ant-design-vue';
import { onBeforeRouteLeave } from 'vue-router';
import router from '@/router';
import { useStore } from 'vuex';


const Login = defineComponent({
    name: 'LongLogin',
    setup() {
        const data = reactive({
            info: {
                username: 'admin',
                password: 'admin'
            },
            remembered: true,
            // 请求中状态
            spinning: false
        });

        const store = useStore();

        const login = () => {
            if (data.info.username !== '' && data.info.password !== '') {
                data.spinning = true;
                store.commit('user/setUserInfo', data);
                data.remembered && localStorage.setItem(Final.TOKEN, "token");
                const from = router.currentRoute.value.query.from;
                router.push(from || '/');
            } else {
                message.error('登录信息不能为空！');
            }
        };

        const keyUpHandler = (e) => {
            if (e.keyCode == 13) {
                login();
            }
        };
        const forgetPaw = () => {
            message.warning('暂时无此功能')
        }

        onMounted(() => {
            document.addEventListener('keyup', keyUpHandler);
        });

        onBeforeRouteLeave((_to, _from, next) => {
            // 清除按键监控
            document.removeEventListener('keyup', keyUpHandler);
            next();
        });
        return () => (
            <div class="login" id="login">
                <Spin spinning={data.spinning}>
                    <div class="login-container">
                        <div class="login-form">
                            <h1 class="form-title">Vue3-管理系统</h1>
                            <p class="text-help">登录Vue3-管理系统</p>
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
                                <span
                                    class="forget-p-help cper"
                                    onClick={forgetPaw}
                                >
                                    忘记密码？
                                </span>
                            </div>
                            <div class="form-item">
                                <Button type="primary" onClick={login} style="width: 100%" size="large">
                                    登录
                                </Button>
                            </div>
                        </div>
                        <div class="login-welcome">
                            <p>鹿踏雾而来</p>
                            <p>鲸随浪而涌</p>
                        </div>
                    </div>
                </Spin>
            </div>
        );
    }
});

export default Login;

const getCom = (path, base) => {
    if (base) {
        return () => import(`@/${base}/${path}`)
    }
    return () => import(`@/views/${path}`)
}

// 主路由
export const routes = [
    {
        path: "/", name: "Home", component: getCom('layout', 'components'),
        redirect: '/home',
        children: [
            {
                path: "config",
                name: "config",
                meta: { title: '配置', icon: 'CodeOutlined' }, component: getCom('home'),
                children: [
                    {
                        path: "home",
                        name: "home",
                        meta: { title: '1', icon: 'CodeOutlined' }, component: getCom('home'),
                    },
                    {
                        path: "System",
                        name: "System",
                        meta: { title: '系统', icon: 'SlidersFilled' }, component: getCom('system'),
                    },
                ]
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        meta: { title: '登录' },
        component: getCom('login')
    },
];

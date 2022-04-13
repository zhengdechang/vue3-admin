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
                path: "home",
                name: "Home",
                meta: { title: '配置', icon: 'CodeOutlined' }, component: getCom('home'),
                children: [
                    {
                        path: "ho1me",
                        name: "1",
                        meta: { title: '1', icon: 'CodeOutlined' }, component: getCom('home'),
                    },
                    {
                        path: "1",
                        name: "System",
                        meta: { title: '系统', icon: 'SlidersFilled' }, component: getCom('system'),
                    },
                ]
            },
            {
                path: "system",
                name: "System",
                meta: { title: '系统', icon: 'SlidersFilled' }, component: getCom('system'),
                children: []
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

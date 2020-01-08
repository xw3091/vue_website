import Layout from '@/layout'

const constantRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                meta: { title: '首页' },
                component: () => import('@/views/home')
            },
            {
                path: 'shop',
                name: 'shop',
                meta: { title: '商城' },
                component: () => import('@/views/shop')
            }, {
                path: 'activ',
                name: 'activ',
                meta: { title: '活动' },
                component: () => import('@/views/activ')
            }, {
                path: 'coope',
                name: 'coope',
                meta: { title: '合作' },
                component: () => import('@/views/coope')
            }, {
                path: 'more',
                name: 'more',
                meta: { title: '更多' },
                component: () => import('@/views/more')
            }
        ]
    }
]

export default constantRoutes

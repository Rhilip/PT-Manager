import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import bridge from "@/index/plugins/bridge";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    // 用户引导页
    {
        path: '/install',
        name: 'install',
        component: () => import('../views/Install.vue')
    },

    {
        path: '/',
        component: () => import('../views/Layer.vue'),
        meta: {
            requireInstall: true
        },
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('../views/Home.vue'),
                meta: {content: '概览'}
            },

            {
                path: 'search',
                name: 'Search',
                component: () => import('../views/Search.vue'),
                meta: {content: '种子搜索'}
            },

            {
                path: 'setting/sites',
                name: 'Setting/Sites',
                component: () => import('../views/Setting/Sites.vue'),
                meta: {content: '站点设置'}
            },
            {
                path: 'setting/clients',
                name: 'Setting/Clients',
                component: () => import('../views/Setting/Clients.vue'),
                meta: {content: '下载服务器设置'}
            },
        ]
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireInstall) && bridge() === undefined) {
        next('/install')
    } else {
        next()
    }
})

export default router

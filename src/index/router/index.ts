import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

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
        component: () => import('../views/Index.vue'),
        meta: {
            requireInstall: true
        },
        children: []
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireInstall) && (window as any)['__PT_MANAGER__'] === undefined) {
        next('/install')
    } else {
        next()
    }
})

export default router

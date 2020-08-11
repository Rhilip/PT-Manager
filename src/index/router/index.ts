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
    if (to.matched.some(record => record.meta.requireInstall) && bridge() === undefined) {
        next('/install')
    } else {
        next()
    }
})

export default router

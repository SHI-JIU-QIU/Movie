import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [

    {
        path: "/",
        redirect: "/home",
        children: [
            {
                path: '/home',
                name: "Home",
                component: () => import('../views/Home/index.vue'),
                redirect: '/home/page',
                children: [
                    {
                        path: '/home/page',
                        name: 'Page',
                        component: () => import('../views/Home/Page.vue')
                    },
                    {
                        path: '/movie',
                        name: "Movie",
                        component: () => import('../views/Movie/index.vue'),
                        redirect: '/movie/hotplaylist',
                        children: [
                            {
                                path: '/movie/hotplaylist',
                                name: "HotPlayList",
                                component: () => import('../views/Movie/HotPlayList/index.vue'),
                            },
                            {
                                path: '/movie/tobeplaylist',
                                name: "ToBePlayList",
                                component: () => import('../views/Movie/ToBePlayList/index.vue'),
                            }
                        ]
                    },
                    {
                        path: '/searchpage',
                        name: "SearchPage",
                        component: () => import('../views/SearchPage/index.vue'),
                    },
                    {
                        path: '/news',
                        name: "News",
                        component: () => import('../views/News/index.vue'),
                        redirect: '/news/page',
                        children: [
                            {
                                path: '/news/page',
                                name: "page",
                                component: () => import('../views/News/Page.vue')
                            },
                            {
                                path: '/news/newsDetail',
                                name: "NewsDetail",
                                component: () => import('../views/News/NewsDetail/index.vue')
                            }
                        ]
                    },
                    {
                        path: '/cinema',
                        name: "Cinema",
                        component: () => import('../views/Cinema/index.vue')
                    },
                    {
                        path: '/cinemaDetail',
                        name: "CinemaDetail",
                        component: () => import('../views/Cinema/CinemaDetail/index.vue')
                    },
                    {
                        path: '/pay',
                        name: "Pay",
                        component: () => import('../views/Home/Pay/index.vue'),
                        redirect: '/pay/order',
                        children: [{
                            path: '/pay/order',
                            name: "Order",
                            component: () => import('../views/Home/Pay/Order/index.vue')
                        }, {
                            path: '/pay/payorder',
                            name: "PayOrder",
                            component: () => import('../views/Home/Pay/PayOrder/index.vue')
                        }, {
                            path: '/pay/success',
                            name: "Success",
                            component: () => import('../views/Home/Pay/Success/index.vue')
                        }]

                    },
                    {
                        path: '/movieDetail',
                        name: "MovieDetail",
                        component: () => import('../views/Movie/MovieDetail/index.vue')
                    },
                    {
                        path: '/user',
                        name: "User",
                        component: () => import('../views/User/index.vue')
                    }]
            },
            {
                path: '/login',
                name: "Login",
                component: () => import('../views/Login/index.vue')
            },
            {
                path: '/register',
                name: "Register",
                component: () => import('../views/Register/index.vue')
            },
        ]
    }]


const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router
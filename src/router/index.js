import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Ads from '@/components/Ads'
import AdsCreate from '@/components/AdsCreate'
import AdsDetail from '@/components/AdsDetail'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '',
            name: 'home',
            component: Home
        },
        {
            path: '/ads',
            name: 'ads',
            component: Ads
        },
        {
            path: '/post',
            name: 'post',
            component: AdsCreate
        },
        {
            path: '/ads/:id',
            props: true,
            name: 'ad',
            component: AdsDetail
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Registration
        }
    ],
    mode: 'history'
})
import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '../views/TestView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Test',
        title: 'Тесты',
        component: Test,
        header: true,
    },
    {
        path: '/lists/:id',
        name: 'List',
        title: 'Группа слов',
        component: function () {
            return import('../views/ListView.vue')
        },
        header: false,
    },
    {
        path: '/lists/',
        name: 'Lists',
        title: 'Списки слов',
        component: function () {
            return import('../views/ListView.vue')
        },
        header: true,
    },
    {
        path: '/upload',
        name: 'Upload',
        title: 'Загрузить список',
        component: function () {
            return import('../views/UploadView.vue')
        },
        header: true,
    },
    {
        path: '/profile',
        name: 'Profile',
        title: 'Личный кабинет',
        component: Test,
        header: true,
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '../views/TestView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Тесты',
        component: Test,
        header: true,
    },
    {
        path: '/lists/:id',
        name: 'Группа слов',
        component: function () {
            return import('../views/ListView.vue')
        },
        header: false,
    },
    {
        path: '/lists/',
        name: 'Списки слов',
        component: function () {
            return import('../views/ListView.vue')
        },
        header: true,
    },
    {
        path: '/upload',
        name: 'Загрузить список',
        component: function () {
            return import('../views/UploadView.vue')
        },
        header: true,
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router

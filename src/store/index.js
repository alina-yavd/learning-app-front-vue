import Vue from 'vue';
import Vuex from 'vuex';
import tests from './tests';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        local: {
            list: null,
            language: null,
        },
        languages: null
    },
    getters: {},
    mutations: {
        setLanguages(state, payload) {
            state.languages = payload;
        },
        setList(state, payload) {
            state.local.list = payload;
        },
    },
    actions: {

    },
    modules: {
        tests
    }
});

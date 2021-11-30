import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import tests from './tests';
import lists from './lists';
import languages from './languages';

Vue.use(Vuex);

export default new Vuex.Store({
    // state: {
    //     user: {},
    //     local: {
    //         list: null,
    //         language: null,
    //     },
    //     languages: null
    // },
    // getters: {},
    // mutations: {
    //     setLanguages(state, payload) {
    //         state.languages = payload;
    //     },
    //     setList(state, payload) {
    //         state.local.list = payload;
    //     },
    // },
    // actions: {
    //
    // },
    modules: {
        user,
        tests,
        lists,
        languages,
    }
});

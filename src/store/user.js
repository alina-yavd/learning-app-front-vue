import api from '@/api';
import {
    A_GET_USER,
    A_RESET_LIST
} from '../types/actions';
import {
    SET_USER,
    SET_USER_LIST
} from '../types/mutations';

export default {
    namespaced: true,

    state: () => ({
        user: null,
        list: null,
        language: null,
    }),

    mutations: {
        [SET_USER](state, payload) {
            state.user = payload.data;
        },

        [SET_USER_LIST](state, payload) {
            state.list = payload; // TODO: save to localStorage
        },
    },

    actions: {
        async [A_GET_USER]({commit}) {
            console.log('getting user');
            try {
                const data = await api.getUser();
                commit(SET_USER, await data.data);
            } catch (error) {
                console.log(error);
            }
        },

        [A_RESET_LIST]({commit}) {
            console.log('resetting list');
            commit(SET_USER_LIST, null);
        }
    }
}

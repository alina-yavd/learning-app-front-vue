import api from '@/api';
import {
    A_GET_LISTS
} from '../types/actions';
import {
    SET_LIST,
    SET_LISTS
} from '../types/mutations';

export default {
    namespaced: true,

    state: () => ({
        lists: [],
    }),

    mutations: {
        [SET_LIST](state, payload) {
            state.lists = [];
            state.lists.push(payload.data);
        },

        [SET_LISTS](state, payload) {
            state.lists = payload.data;
        },
    },

    actions: {
        async [A_GET_LISTS]({commit}, {id, language, translation}) {
            try {
                let data;
                if (id) {
                    console.log('getting list ' + id);
                    data = await api.getList(id);
                    commit(SET_LIST, await data);
                } else {
                    console.log('getting lists');
                    data = await api.getLists(language, translation);
                    commit(SET_LISTS, await data.data);
                }
            } catch (error) {
                console.log(error);
            }
        },
    }
}

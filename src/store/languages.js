import api from '@/api';
import {
    A_GET_LANGUAGES
} from '../types/actions';
import {
    SET_LANGUAGES
} from '../types/mutations';

export default {
    namespaced: true,

    state: () => ({
        languages: [],
    }),

    mutations: {
        [SET_LANGUAGES](state, payload) {
            state.languages = payload.data;
        },
    },

    actions: {
        async [A_GET_LANGUAGES]({commit}) {
            try {
                const data = await api.getLanguages();
                commit(SET_LANGUAGES, await data.data);
            } catch (error) {
                console.log(error);
            }
        },
    }
}

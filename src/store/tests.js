import api from '@/api';
import {
    A_GET_TEST,
    A_CHECK_ANSWER,
    A_INIT_TEST_STORE,
    A_UPDATE_COUNT,
    A_RESET_COUNT
} from '../types/actions';
import {
    SET_TEST,
    SET_TEST_RESULT,
    SET_TEST_RESULT_TEXT,
    SET_RESULTS_COUNT,
    UPDATE_RESULTS_COUNT,
    SAVE_RESULTS_COUNT
} from '../types/mutations';

export default {
    namespaced: true,

    state: () => ({
        word: null,
        answers: [],
        hasResult: false,
        resultText: null,
        resultStatus: false,
        resultsCountAll: 0,
        resultsCountCorrect: 0,
    }),

    mutations: {
        [SET_TEST](state, payload) {
            state.word = payload.word;
            state.answers = payload.answers.data;
        },

        [SET_TEST_RESULT](state, payload) {
            state.hasResult = true;
            state.resultStatus = payload.result;
        },

        [SET_TEST_RESULT_TEXT](state, payload) {
            let answers = [];
            let answersText = [];
            if (payload.group) {
                answers = payload.word.translations.filter(x => x.language === payload.group.translation.code);
            } else {
                answers = payload.word.translations;
            }
            answers.map(function (answer) {
                answersText.push(answer.text);
            });

            state.resultText = payload.word.text + " &mdash; " + answersText.join(' | ');
        },

        [SET_RESULTS_COUNT](state, payload) {
            state.resultsCountAll = parseInt(payload.all);
            state.resultsCountCorrect = parseInt(payload.correct);
        },

        [SAVE_RESULTS_COUNT](state) {
            localStorage.setItem('resultsCountAll', state.resultsCountAll);
            localStorage.setItem('resultsCountCorrect', state.resultsCountCorrect);
        },

        [UPDATE_RESULTS_COUNT](state, payload) {
            state.resultsCountAll++;
            if (payload.result) {
                state.resultsCountCorrect++;
            }
        },
    },

    actions: {
        [A_INIT_TEST_STORE](store) {
            store.commit('SET_RESULTS_COUNT', {
                all: localStorage.getItem('resultsCountAll'),
                correct: localStorage.getItem('resultsCountCorrect'),
            });
            store.commit('SAVE_RESULTS_COUNT');
        },

        async [A_GET_TEST]({commit}) {
            console.log('getting test');
            try {
                const data = await api.getTest();
                commit(SET_TEST, await data.data);
            } catch (error) {
                console.log(error);
            }
        },

        async [A_CHECK_ANSWER]({commit}, {wordId, answerId}) {
            console.log('checking answer');
            try {
                const data = await api.checkAnswer(wordId, answerId);
                commit(SET_TEST_RESULT, await data.data);
                commit(SET_TEST_RESULT_TEXT, await data.data);
                commit(UPDATE_RESULTS_COUNT, await data.data)
                await this.dispatch('tests/' + A_GET_TEST); // TODO: check if ok
            } catch (error) {
                console.log(error);
            }
        },

        [A_UPDATE_COUNT]({commit}) { // TODO: изменить способ сохранения чтобы убрать watcher с компонента
            commit(SAVE_RESULTS_COUNT);
        },

        [A_RESET_COUNT]({commit}) {
            this.state.tests.resultsCountAll = 0;
            this.state.tests.resultsCountCorrect = 0;
            commit(SAVE_RESULTS_COUNT);
        },
    }
}

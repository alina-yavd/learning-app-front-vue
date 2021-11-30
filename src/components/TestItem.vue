<template>
  <div v-if="currentWord" class="test-inner">
    <div class="question">{{ currentWord.text }}</div>
    <div v-if="currentAnswers" class="answers">
      <div v-for="answer in currentAnswers" v-on:click="checkAnswerTemp({wordId: currentWord.id, answerId: answer.id})" :key="answer.id" class="answer">
        {{ answer.text }}
      </div>
      <div v-if="hasResult" :class="`${'correct-answer ' + (resultStatus ? 'success' : 'error')}`"
           v-html="resultText"></div>
    </div>
    <div class="question-buttons">
      <div v-on:click="getTestTemp" class="btn-next"><span
          class="btn btn-bg btn-icon btn-icon-right">Следующий вопрос</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {A_CHECK_ANSWER, A_GET_TEST, A_UPDATE_COUNT} from '../types/actions';

export default {
  name: 'TestItem',

  async beforeCreate() {
    await this.$store.dispatch('tests/' + A_GET_TEST);
  },

  computed: {
    ...mapState('tests', {
      currentWord: state => state.word,
      currentAnswers: state => state.answers,
      hasResult: state => state.hasResult,
      resultStatus: state => state.resultStatus,
      resultText: state => state.resultText,
      resultsCountAll: state => state.resultsCountAll,
      resultsCountCorrect: state => state.resultsCountCorrect,
    })
  },

  methods: {
    ...mapActions('tests', {
      getTestTemp: A_GET_TEST,
      checkAnswerTemp: A_CHECK_ANSWER,
      updateCount: A_UPDATE_COUNT,
    }),
  },

  watch: {
    resultsCountAll() {
      this.updateCount();
    },
    resultsCountCorrect() {
      this.updateCount();
    }
  },
}
</script>

<style lang="scss">
@import '../assets/_mixins.scss';
@import '../assets/_testitem.scss';
</style>
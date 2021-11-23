<template>
  <div v-if="currentWord" class="test-inner">
    <div class="question">{{ currentWord.text }}</div>
    <div v-if="currentAnswers" class="answers">
      <div v-for="answer in currentAnswers" v-on:click="checkAnswer(answer.id)" :key="answer.id" class="answer">
        {{ answer.text }}
      </div>
      <div v-if="hasResult" :class="`${'correct-answer ' + (resultStatus ? 'success' : 'error')}`"
           v-html="resultText"></div>
    </div>
    <div class="question-buttons">
      <div v-on:click="getTest" class="btn-next"><span
          class="btn btn-bg btn-icon btn-icon-right">Следующий вопрос</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestItem',
  inject: ['api'],

  data() {
    return {
      hasResult: null,
      currentWord: null,
      currentAnswers: null,
      resultText: null,
      resultStatus: false,
      resultsCountAll: 0,
      resultsCountCorrect: 0,
    }
  },

  methods: {
    getTest(i = 0) {
      console.log('getTest');
      let vm = this;
      this.api.getTest()
          .then(function (response) {
            vm.currentWord = response.word;
            vm.currentAnswers = response.answers.data;
          })
          .catch(() => {
            i++;
            if (i < 5) {
              vm.getTest(i);
            }
          });
    },

    checkAnswer(id) {
      console.log('checkAnswer');
      let vm = this;
      this.api.checkAnswer(vm.currentWord.id, id)
          .then(function (response) {
            console.log(response);
            vm.hasResult = true;
            vm.resultStatus = response.result;
            vm.setResultText(response);
          })
          .then(() => {
            this.getTest()
          });
    },


    setResultText(data) {
      let answers = [];
      let answersText = [];
      if (data.group) {
        answers = data.word.translations.filter(x => x.language === data.group.translation.code);
      } else {
        answers = data.word.translations;
      }
      answers.map(function (answer) {
        answersText.push(answer.text);
      });
      this.resultText = data.word.text + " &mdash; " + answersText.join(' | ');
      this.updateResultsCount();
    },

    updateResultsCount() {
      this.resultsCountAll++;
      if (this.resultStatus) {
        this.resultsCountCorrect++;
      }
    }
  },

  mounted() {
    console.log('mounted');
    this.getTest();

    if (localStorage.resultsCountAll) {
      this.resultsCountAll = parseInt(localStorage.resultsCountAll);
    }
    if (localStorage.resultsCountCorrect) {
      this.resultsCountCorrect = parseInt(localStorage.resultsCountCorrect);
    }
  },

  watch: {
    resultsCountAll(newCount) {
      localStorage.resultsCountAll = newCount;
    },
    resultsCountCorrect(newCount) {
      localStorage.resultsCountCorrect = newCount;
    }
  }
}
</script>

<style lang="scss">
@import '../assets/_mixins.scss';
@import '../assets/_testitem.scss';
</style>
<template>
  <section class="tests">
    <div class="tests-nav">
      <div class="nav-block nav-left">
        <div class="current-language"><span>Язык:&nbsp;</span>
          <span v-if="language">
            <span class="language">{{ language.name }}</span>
            <span v-if="flagLanguage" class="flag"><img :src="flagLanguage"></span>
          </span>
          <span v-else>Все</span>
        </div>
        <div class="current-source"><span>Группа слов:&nbsp;</span>
          <span v-if="list">
            <router-link :to="'/lists/'+list.id" class="list-name">{{ list.name }}</router-link>&nbsp;
            <span class="btn-inline group-clear"><i class="far fa-times-circle"></i></span>
          </span>
          <span v-else>Все слова</span>
        </div>
      </div>
      <div class="nav-block nav-right">
        <div class="results-clear" v-on:click="clearResultsCount"><span class="btn btn-inline">Очистить прогресс</span></div>
        <div class="results-count">Ответов:
          <span>{{ resultsCountAll ? resultsCountCorrect + ' / ' + resultsCountAll : 0 }}</span>
        </div>
      </div>
    </div>
    <test-item/>
  </section>
</template>

<script>

import TestItem from '../components/TestItem';

export default {
  name: 'TestView',
  components: {TestItem},
  data() {
    return {
      resultsCountAll: 0,
      resultsCountCorrect: 0,
      language: null,
      list: null,
      flagLanguage: this.language ? require('@/assets/images/flags/' + this.language.code + '.svg') : null,
    }
  },

  methods: {
    clearResultsCount() {
      this.resultsCountAll = 0;
      this.resultsCountCorrect = 0;
    }
  },

  mounted() { // TODO: make one with TestItem component
    console.log('mounted page');

    if (localStorage.resultsCountAll) {
      this.resultsCountAll = parseInt(localStorage.resultsCountAll);
    }
    if (localStorage.resultsCountCorrect) {
      this.resultsCountCorrect = parseInt(localStorage.resultsCountCorrect);
    }
  },

  watch: { // TODO: make one with TestItem component
    resultsCountAll(newCount) {
      localStorage.resultsCountAll = newCount;
    },
    resultsCountCorrect(newCount) {
      localStorage.resultsCountCorrect = newCount;
    }
  }
}
</script>

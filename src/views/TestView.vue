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
            <router-link :to="{name: 'List', params: {id: list.id}}" class="list-name">{{ list.name }}</router-link>&nbsp;
            <span v-on:click="resetList" class="btn-inline group-clear"><i class="far fa-times-circle"></i></span>
          </span>
          <span v-else>Все слова</span>
        </div>
      </div>
      <div class="nav-block nav-right">
        <div class="results-clear" v-on:click="resetCount"><span class="btn btn-inline">Очистить прогресс</span></div>
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
import {mapActions, mapState} from 'vuex';
import {A_RESET_COUNT, A_RESET_LIST} from '../types/actions';

export default {
  name: 'TestView',
  components: {TestItem},

  data() {
    return {
      flagLanguage: this.language ? require('@/assets/images/flags/' + this.language.code + '.svg') : null,
    }
  },

  computed: {
    ...mapState({
      language: state => state.local.language,
      list: state => state.local.list,
    }),
    ...mapState('tests', {
      resultsCountAll: state => state.resultsCountAll,
      resultsCountCorrect: state => state.resultsCountCorrect,
    }),
    ...mapState('user', {
      user: state => state.user,
      list: state => state.list,
      language: state => state.language,
    }),
  },

  methods: {
    ...mapActions('tests', {
      resetCount: A_RESET_COUNT,
    }),
    ...mapActions('user', {
      resetList: A_RESET_LIST,
    }),
  },
}
</script>

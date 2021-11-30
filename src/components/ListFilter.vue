<template>
  <form v-on:submit.prevent="filterLists({language: languageCode, translation: translationCode})" class="list-filter-form" method="post">
    <h4>Фильтр:</h4>
    <div class="fields">
      <div class="field field-s">
        <label>
          <span>Язык оригинала</span>
          <select v-model="languageCode" class="language-select">
            <option></option>
            <option v-for="language in languages" :key="language.code"
                    :value="language.code">{{ language.name }}
            </option>
          </select>
        </label>
      </div>
      <div class="field field-s">
        <label>
          <span>Язык перевода</span>
          <select v-model="translationCode" class="language-select">
            <option></option>
            <option v-for="language in languages" :key="language.code"
                    :value="language.code">{{ language.name }}
            </option>
          </select>
        </label>
      </div>
    </div>
    <div class="submit-btn">
      <button type="submit" class="btn btn-outline">Применить</button>
    </div>
  </form>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import {A_GET_LANGUAGES, A_GET_LISTS} from '../types/actions';

export default {
  name: 'ListFilter',

  data() {
    return {
      languageCode: null,
      translationCode: null,
    }
  },

  async beforeCreate() {
    await this.$store.dispatch('languages/' + A_GET_LANGUAGES);
  },

  computed: {
    ...mapState('languages', {
      languages: state => state.languages,
    }),
  },

  methods: {
    ...mapActions('languages', {
      getLanguages: A_GET_LANGUAGES,
    }),
    ...mapActions('lists', {
      filterLists: A_GET_LISTS,
    }),
  },
}
</script>

<style lang="scss">
@import '../assets/_mixins.scss';
@import '../assets/_list.scss';
</style>

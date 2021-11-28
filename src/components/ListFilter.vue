<template>
  <form v-on:submit.prevent="onSubmit" class="list-filter-form" method="post">
    <h4>Фильтр:</h4>
    <div class="fields">
      <div class="field field-s">
        <label>
          <span>Язык оригинала</span>
          <select v-model="originalCode" class="language-select">
            <option></option>
            <option v-for="language in languages" :key="language.code"
                    :value="language.code">{{ language.name }}</option>
          </select>
        </label>
      </div>
      <div class="field field-s">
        <label>
          <span>Язык перевода</span>
          <select v-model="translationCode" class="language-select">
            <option></option>
            <option v-for="language in languages" :key="language.code"
                    :value="language.code">{{ language.name }}</option>
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

export default {
  name: 'ListFilter',
  inject: ['api'],

  data() {
    return {
      originalCode: null,
      translationCode: null,
      languages: null,
    }
  },

  methods: {
    getLanguages() { // TODO: make one with UploadList component
      console.log('getLanguages');
      let vm = this;
      this.api.getLanguages()
          .then(function (response) {
            vm.languages = response.data;
          });
    },

    onSubmit() {
      this.$emit('filterLists',
          {originalCode: this.originalCode, translationCode: this.translationCode}
      );
    },
  },

  mounted() {
    console.log('mounted');
    this.getLanguages();
  },

}
</script>

<style lang="scss">
@import '../assets/_mixins.scss';
@import '../assets/_list.scss';
</style>

<template>
  <div class="upload-language">
    <form v-on:submit.prevent="onSubmit" class="language-form" method="post">
      <h3>Нет нужного языка? Создайте его сами</h3>
      <div class="fields">
        <div class="field field-s">
          <label><span>Код языка <a href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes" target="_blank"><i
              class="fas fa-info-circle"></i></a></span>
            <input v-model="languageCode" type="text" name="code" minlength="2" maxlength="2">
          </label>
        </div>
        <div class="field field-s">
          <label>
            <span>Название языка</span>
            <input v-model="languageName" type="text" name="name">
          </label>
        </div>
      </div>
      <div class="submit-btn">
        <div v-if="resultText" :class="`${'message-' + (resultStatus ? 'success' : 'error')}`">{{ resultText }}</div>
        <button type="submit" class="btn btn-bg">Создать</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UploadLanguage',
  inject: ['api'],

  data() {
    return {
      languageCode: null,
      languageName: null,
      resultStatus: false,
      resultText: null,
    }
  },

  methods: {
    onSubmit() {
      if (!this.languageCode || !this.languageName) {
        this.resultText = 'Ошибка: Введите код и название';
        return;
      }

      this.uploadLanguage();
    },

    uploadLanguage() {
      console.log('uploadLanguage');
      let vm = this;
      this.resultText = null;
      this.api.uploadLanguage(
          this.languageCode,
          this.languageName
      ).then(() => {
        vm.resultStatus = true;
        vm.resultText = 'Язык успешно создан';
        // TODO: update global languages list
      }).catch(error => {
        vm.resultStatus = false;
        vm.resultText = 'Ошибка: ' + error;
      });
    },
  }
}
</script>

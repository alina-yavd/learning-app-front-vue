<template>
  <div class="upload-list">
    <form v-on:submit.prevent="onSubmit" class="upload-form" method="post">
      <h2>Загрузить свой список слов</h2>
      <div class="fields">
        <div class="field">
          <label>
            <span>Выберите файл:</span>
            <input type="file" @change="handleFileUpload($event)" name="file">
          </label>
          <div class="description">Поддерживаемые форматы: JSON, XML.
            Скачать пример файла <a href="files/dict-a.json" target="_blank">JSON</a>, <a
                href="files/dict-b.xml" target="_blank">XML</a>.
          </div>
        </div>
        <div class="field field-s">
          <label>
            <span>Язык оригинала</span>
            <select v-if="languages" v-model="selectedLanguage" class="language-select">
              <option v-for="language in languages" :key="language.code" :value="language.code">{{
                  language.name
                }}
              </option>
            </select>
          </label>
        </div>
        <div class="field field-s">
          <label>
            <span>Язык перевода</span>
            <select v-if="languages" v-model="selectedTranslation" class="language-select">
              <option v-for="language in languages" :key="language.code" :value="language.code">{{
                  language.name
                }}
              </option>
            </select>
          </label>
        </div>
        <div class="field">
          <label>
            <span>Название списка</span>
            <input v-model="listTitle" type="text" name="listTitle">
          </label>
        </div>
      </div>
      <div class="submit-btn">
        <div v-if="resultText" :class="`${'message-' + (resultStatus ? 'success' : 'error')}`">{{ resultText }}</div>
        <button type="submit" class="btn btn-bg">Загрузить</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UploadList',
  inject: ['api'],

  data() {
    return {
      languages: null,
      uploadFile: null,
      listTitle: null,
      selectedLanguage: null,
      selectedTranslation: null,
      resultStatus: false,
      resultText: null,
    }
  },

  methods: {
    getLanguages() {
      console.log('getLanguages');
      let vm = this;
      this.api.getLanguages()
          .then(function (response) {
            vm.languages = response.data;
          });
    },

    onSubmit() {
      if (!this.uploadFile) {
        this.resultText = 'Ошибка: Выберите файл';
        return;
      }
      if (!this.listTitle) {
        this.resultText = 'Ошибка: Введите название списка';
        return;
      }
      if (!this.selectedLanguage || !this.selectedTranslation) {
        this.resultText = 'Ошибка: Выберите язык';
        return;
      }

      this.uploadList();
    },

    handleFileUpload(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.uploadFile = files[0];
    },

    uploadList() {
      console.log('uploadList');
      let vm = this;
      this.resultText = null;
      this.api.uploadList(
          this.uploadFile,
          this.listTitle,
          this.selectedLanguage,
          this.selectedTranslation
      ).then(() => {
        vm.resultStatus = true;
        vm.resultText = 'Список успешно загружен';
      }).catch(error => {
        vm.resultStatus = false;
        vm.resultText = 'Ошибка: ' + error;
      });
    }
  },

  mounted() {
    console.log('mounted');
    this.getLanguages();
  },
}
</script>

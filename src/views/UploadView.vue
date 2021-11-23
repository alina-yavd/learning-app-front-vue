<template>
  <section class="upload-forms">
    <upload-list/>
    <upload-language/>
  </section>
</template>

<script>
import UploadList from '../components/UploadList';
import UploadLanguage from '../components/UploadLanguage';

export default {
  name: 'UploadView',
  components: {UploadLanguage, UploadList},
}
</script>

<template>
  <div id="app">
    <app-header></app-header>
    <main class="site-main">
      <div class="container">
        <router-view/>
      </div>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

export default {
  components: {AppFooter, AppHeader}
}
</script>

<style lang="scss">
@import 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css';
@import 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap';
@import './assets/_mixins.scss';
@import './assets/_reset.scss';
@import './assets/_basic.scss';
@import './assets/_pages.scss';
@import './assets/_elements.scss';
@import './assets/_forms.scss';

</style>

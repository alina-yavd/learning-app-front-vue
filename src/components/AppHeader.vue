<template>
  <header class="site-header">
    <div class="container">
      <div class="head-wrap">
        <div class="head-title">
          <router-link to="/"><span class="head-title-desc">Learning App</span></router-link>
        </div>
        <div class="head-menu">
          <ul id="nav">
            <li v-for="route in routes" :key="route.path">
              <router-link :to="route.path" router-link-exact-active>{{ route.name }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      routes: this.$router.options.routes.filter(item => item.header)
    }
  }
}
</script>

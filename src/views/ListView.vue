<template>
  <section class="words">
    <list-filter v-if="!$route.params.id"/>
    <list/>
  </section>
</template>

<script>
import List from '../components/List';
import ListFilter from '../components/ListFilter';

export default {
  name: 'ListView',
  components: {ListFilter, List},
}
</script>

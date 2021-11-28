<template>
  <section class="words">
    <list-filter v-if="!$route.params.id" @filterLists="filter($event)"/>
    <list :filters="filters"/>
  </section>
</template>

<script>
import List from '../components/List';
import ListFilter from '../components/ListFilter';

export default {
  name: 'ListView',
  components: {ListFilter, List},

  data() {
    return {
      filters: null,
    }
  },

  methods: {
    filter(filters) {
      this.filters = filters;
    }
  }
}
</script>

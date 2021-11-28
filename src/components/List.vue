<template>
  <div class="word-list">
    <list-item v-for="list in lists" :key="list.id" :list="list" :user="user"/>
  </div>
</template>

<script>
import ListItem from "./ListItem";

export default {
  name: 'List',
  inject: ['api'],
  components: {ListItem},

  props: {
    filters: {
      type: Object,
      required: false
    },
  },

  data() {
    return {
      lists: null,
      user: null,
    }
  },

  methods: {
    fetchData(id) {
      if (id) {
        this.getList(id);
      } else {
        this.getLists();
      }
    },

    filterData() {
      this.getLists(this.filters.originalCode, this.filters.translationCode);
    },

    getList(id) {
      console.log('getList id ' + id);
      let vm = this;
      this.api.getList(id)
          .then(function (response) {
            vm.lists = [];
            vm.lists[0] = response;
          });
    },

    getLists(original, translation) {
      console.log('getLists');
      let vm = this;
      this.api.getLists(original, translation)
          .then(function (response) {
            vm.lists = response.data;
          });
    },
  },

  mounted() {
    console.log('mounted');
    this.fetchData(this.$route.params.id);
  },

  watch: {
    '$route.params': {
      handler(newValue) {
        const {id} = newValue
        this.fetchData(id)
      },
      immediate: true,
    },

    filters(newValue) {
      this.filters = newValue;
      this.filterData();
    }
  }
}
</script>

<style lang="scss">
@import '../assets/_mixins.scss';
@import '../assets/_list.scss';
</style>

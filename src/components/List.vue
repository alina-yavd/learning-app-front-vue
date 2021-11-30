<template>
  <div class="word-list">
    <list-item v-for="list in lists" :key="list.id" :list="list"/>
  </div>
</template>

<script>
import ListItem from './ListItem';
import {mapActions, mapState} from 'vuex';
import {A_GET_LISTS} from '../types/actions';

export default {
  name: 'List',
  components: {ListItem},

  computed: {
    ...mapState('lists', {
      lists: state => state.lists,
    }),
    ...mapState('user', {
      user: state => state.user,
      list: state => state.list,
      language:  state => state.language,
    }),
  },

  methods: {
    ...mapActions('lists', {
      getLists: A_GET_LISTS,
    }),
  },

  watch: {
    '$route.params': {
      handler(newValue) {
        const {id} = newValue
        this.getLists({id: id})
      },
      immediate: true,
    },
  }
}
</script>

<style lang="scss">
@import '../assets/_mixins.scss';
@import '../assets/_list.scss';
</style>

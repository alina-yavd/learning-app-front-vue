<template>
  <div class="list-item">
    <div class="list-title">
      <div class="list-actions">

        <template v-if="user">
          <div v-if="list.id in user.lists" class="btn-remove-user-list">
            <span class="btn btn-outline btn-remove-icon" title="Удалить группу с профиля"><i class="far fa-minus"></i></span>
          </div>
          <div v-else class="btn-add-user-list">
            <span class="btn btn-outline btn-add-icon" title="Добавить группу в профиль"><i
                class="far fa-plus"></i></span>
          </div>
        </template>
        <router-link :to="'/lists/'+list.id" class="list-name-wrap">
          <span class="list-name">{{ list.name }}</span>
        </router-link>

      </div>

      <div class="btns-wrap">
          <span class="list-progress">
              <span class="progress-inner">
                  <span class="number">{{ list.progress }}%</span>
                  <span class="line" :style="{width: list.progress}"></span>
              </span>
          </span>
        <div class="lang-flags-wrap">
          <span class="flag"><img :src="flagLanguage"></span>
          <span class="flag"><img :src="flagTranslation"></span>
        </div>
        <div class="btn-test" v-on:click="startTest(list.id)">
          <span class="btn btn-outline">Начать тест</span>
        </div>
        <div v-if="user" class="btn-delete-list">
          <span class="btn btn-outline btn-remove-icon" title="Удалить группу"><i class="far fa-times"></i></span>
        </div>
      </div>
    </div>

    <div v-if="list.words" class="list-words">
      <div v-for="word in list.words" :key="word.id" class="word">{{ word.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    list: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: false
    },
  },

  data() {
    return {
      flagLanguage: require('@/assets/images/flags/' + this.list.language.code + '.svg'),
      flagTranslation: require('@/assets/images/flags/' + this.list.translation.code + '.svg'),
    }
  },

  methods: {
    startTest(id) {
      console.log('startTest id ' + id);
    }
  },
}
</script>

<template>
    <div>
      <div class="pages">
        <v-btn v-on:click="sortNames">Отсортировать по вопросам по Алфавиту</v-btn>
      </div>
      <v-btn v-if="!isFives" v-on:click="filterByMark" >Отобразить только оценки 5</v-btn>
      <v-btn v-if="isFives" v-on:click="show" >Отобразить все оценки</v-btn>
        <ul>
          <Order v-bind:marks="marks" />
        </ul>
      <div class="pages">
        <v-btn v-on:click="prev" >Предыдущая</v-btn>
        <v-btn v-on:click="next" >След страница</v-btn> 
      </div>
      <v-btn v-on:click="drop">Сбросить сортировку и фильтр</v-btn>
    </div>
</template>

<script>
import Order from '@/components/Order'

export default {
  data() {
    return {
      isFives: false
    }
  },
  components: {Order},
  async fetch({store}) {
    if (store.getters['mar/marks'].length === 0) {
      await store.dispatch('mar/fetch')
    }
  },
  computed: {
    marks() {
        return this.$store.getters['mar/marks'];
    }
  },
  methods: {
    async show() {
      this.isFives = !this.isFives
      await this.$store.dispatch('mar/fetch')
    },
    async filterByMark() {
      this.isFives = !this.isFives
      await this.$store.dispatch('mar/filterByMark', this.$store.getters['mar/marks'])
    },
    async next() {
      const next = this.$store.getters['mar/next'];
      if (next) {
        this.$store.dispatch('mar/fetchNext', next);
      } else {
        alert('Следующей страницы нет')
      }
    },
    async prev() {
      const prev = this.$store.getters['mar/prev'];
      if (prev) {
        this.$store.dispatch('mar/fetchPrev', prev);
      } else {
        alert('Предыдущей страницы нет')
      }
    },
    async sortNames() {
      await this.$store.dispatch('mar/fetchAll');
      const vacancies = this.$store.getters['mar/marks'];
      await this.$store.dispatch('mar/sortByNames', vacancies);
    },
    async drop() {
      this.isFives = false
      await this.$store.dispatch('mar/fetch')
    }
  }
}
</script>

<style>
  .pages {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
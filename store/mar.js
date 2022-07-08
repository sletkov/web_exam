export const state = () => ({
    marks: [],
    next: null,
    prev: null
  })
  
  export const mutations = {
    setMarks(state, marks) {
      state.marks = marks
    },
    setNext(state, next) {
      state.next = next
    },
    setPrevious(state, prev) {
      state.prev = prev
    },
  }
  
  export const actions = {
    async fetch({commit}) {
      const marks = await this.$axios.$get('/api/mark/?limit=2')
      commit('setMarks', marks.results);
      commit('setNext', marks.next)
      commit('setPrevious', marks.previous);
    },
    async filterByMark({commit}, marks) {
      const filteredMarks = [...marks].filter(mark => mark.mark === 5);
      commit('setMarks', filteredMarks)
    },
    async fetchAll({commit}) {
      const marks = await this.$axios.$get('/api/mark/')
      commit('setMarks', marks.results)
      commit('setNext', marks.next);
      commit('setPrevious', marks.previous);
    },
    sortByNames({commit}, marks) {
      const sortedMarks = [...marks].sort((a, b) => {
        if (a.answer_data.question_data.text < b.answer_data.question_data.text) {
          return -1;
        }
        if (a.answer_data.question_data.text > b.answer_data.question_data.text) {
          return 1;
        }
        return 0;
      });

      commit('setMarks', sortedMarks);
    },
    async fetchNext({commit}, nextLink) {
      const marks = await this.$axios.$get('/api/' + nextLink.split('/api/')[1]); 
      commit('setMarks', marks.results);
      commit('setNext', marks.next);
      commit('setPrevious', marks.previous);
    },
    async fetchPrev({commit}, prevLink) {
      const marks = await this.$axios.$get('/api/' + prevLink.split('/api/')[1]); 
      commit('setMarks', marks.results);
      commit('setNext', marks.next);
      commit('setPrevious', marks.previous);
    },
  }
  
  export const getters = {
    marks: s => {
      console.log('got data')
      return s.marks
    },
    next: s => s.next,
    prev: s => s.prev
  }
  
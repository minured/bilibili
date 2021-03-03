import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    commentList: null,
    currentCommentIndex: undefined,
    showAllChildren: false,
  },
  mutations: {
    increment(state, payload) {
      state.count += payload;
    },
    loadComment(state, comment) {
      state.commentList = comment;
    },
    loadIndex(state, index) {
      state.currentCommentIndex = index;
    },
    loadPopStatus(state, status) {
      state.showAllChildren = status;
    },
  },
  actions: {},
  modules: {},
});

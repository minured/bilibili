import Vue from "vue";
import Vuex from "vuex";
import dayjs from "dayjs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    commentList: null,
    currentCommentIndex: undefined,
    showAllChildren: false,
    commentModel: {
      content: undefined,
      date: dayjs().format("YYYY-MM-DD"),
      parentId: null,
      
      videoId: undefined,
    },
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
    updateCommentModel(state, model) {
      state.commentModel = model;
      console.log(state.commentModel);
    },
  },
  getters: {
    getCommentModel(state) {
      return state.commentModel;
    },
  },
  actions: {},
  modules: {},
});

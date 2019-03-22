import Vue from 'vue';
import Vuex from 'vuex';
import LSManager from '../script/localStorage_manager';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    settings: {
      tips: false,
      timer: false,
      disableSolved: false,
      dark: false
    },
    books: [],// 收藏夹
    slideName: '',
  },
  mutations: {
    initializeSettings (state, settings) {// 初始化设置
      state.settings = settings;
      LSManager.setGameState('settings', state.settings);
    },
    mutateSettings (state, {setting, value}) {// 更改设置
      this.state.settings[setting] = value;
      LSManager.setGameState('settings', state.settings);
    },
    initializeBooks (state, books) {// 初始化书签收藏
      state.books = books;
      LSManager.setGameState('books', state.books);
    },
    markBook (state, book) {// 增加收藏
      state.books.push(book);
      LSManager.setGameState('books', state.books);
    },
    delBook (state, id) {// 删除收藏
      state.books = state.books.filter(book => book.id !== id);
      LSManager.setGameState('books', state.books);
    },
    delBooks (state, books) {// 批量删除收藏
      state.books = state.books.filter((book, index) => !books[index]);
      LSManager.setGameState('books', state.books);
    },
    mutateSlideName (state, slideName) {// 更改 slideName
      state.slideName = slideName;
    },
  },
  actions: {
    initializeSettings ({commit}, settings) {
      commit('initializeSettings', settings);
    },
    mutateSettings ({commit}, payload) {
      commit('mutateSettings', payload);
    },
    initializeBooks ({commit}, books) {
      commit('initializeBooks', books);
    },
    markBook ({commit}, book) {
      commit('markBook', book);
    },
    delBook ({commit}, id) {
      commit('delBook', id);
    },
    delBooks ({commit}, books) {
      commit('delBooks', books);
    },
    mutateSlideName ({commit}, slideName) {
      commit('mutateSlideName', slideName);
    },
  }
});
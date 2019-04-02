import kbStore from './kbStore';

export default {
  modules: {
    kbStore,
  },
  state () {
    return {
      timerStart: false,
      originGrid: [],
      gameGrid: [],
      id: '',
    };
  },
  getters: {
    size: state => state.gameGrid.length,
  },
  mutations: {
    initializeOriginGrid (state, originGrid) {
      state.originGrid = originGrid;
    },
    initializeGameGrid (state, gameGrid) {
      state.gameGrid = gameGrid;
    },
    initializeGameID (state, id) {
      state.id = id;
    },
    setGrids (state, { originGrid, gameGrid }) {
      state.originGrid = originGrid;
      state.gameGrid = gameGrid;
    },
    clearGame (state) {
      state.originGrid = [];
      state.gameGrid = [];
      state.id = '';
    },
    createID (state) {
      const id = (new Date()).getTime();
      state.id = id.toString();
    },
    startTimer (state) {
      state.timerStart = true;
    },
    clearTimer (state) {
      state.timerStart = false;
    }
  },
  actions: {
    initializeOriginGrid ({ commit }, originGrid) {
      commit('initializeOriginGrid', originGrid);
    },
    initializeGameGrid ({ commit }, gameGrid) {
      commit('initializeGameGrid', gameGrid);
    },
    initializeGameID ({ commit }, id) {
      commit('initializeGameID', id);
    },
    setGrids ({ commit }, payload) {
      commit('setGrids', payload);
    },
    clearGame ({ commit }) {
      commit('clearGame');
    },
    createID ({ commit }) {
      commit('createID');
    },
    toggleTimer ({ commit, rootState }, timerStart) {
      if (!rootState.settings.timer) return;
      if (timerStart) {
        commit('startTimer');
      } else {
        commit('clearTimer');
      }
    }
  }
};
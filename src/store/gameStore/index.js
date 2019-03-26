import LSManager from '@/script/localStorage_manager';
import Grid from '@/script/grid';

export default {
  state () {
    return {
      timerStart: false,
    };
  },
  getters: {
    
  },
  mutations: {
    startTimer (state) {
      state.timerStart = true;
    },
    clearTimer (state) {
      state.timerStart = false;
    }
  },
  actions: {
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
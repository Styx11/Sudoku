// 管理键盘按键的禁用状态
export default {
  state () {
    return {
      numDisabled: true,
      checkDisabled: true,
      operateDisabled: true,
      numberSolved: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false 
      },
    };
  },
  mutations: {
    disableOperate (state, disabled) {
      state.operateDisabled = disabled;
    },
    disableCheck (state, disabled) {
      state.checkDisabled = disabled;
    },
    disableNum (state, disabled) {
      state.numDisabled = disabled;
    },
    solveNum (state, { disableSolved, keyRange, nums }) {// 处理数字完成量
      for (let n in nums) {
        state.numberSolved[n] = disableSolved && nums ? (nums[n] >= keyRange) : false;
      }
    },
  },
  actions: {
    disableOperate ({ commit }, disabled) {
      commit('disableOperate', disabled);
    },
    disableCheck ({ commit }, disabled) {
      commit('disableCheck', disabled);
    },
    disableNum ({ commit }, disabled) {
      commit('disableNum', disabled);
    },
    solveNum ({ commit, rootState, rootGetters }, nums) {
      const keyRange = rootGetters.size;
      const disableSolved = rootState.settings.disableSolved;
      commit('solveNum', { disableSolved, keyRange, nums });
    }
  }
};
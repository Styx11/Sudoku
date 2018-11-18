Vue.component('game-keyboard', {
  props: {
    keyRange: {
      type: Number,
      require: true
    }
  },
  data: function () {
    return {
      btnDisabled: true,
      checkDisabled: true,
      gameComplete: false
    }
  },
  template: "\
    <div class='keyboard'>\
      <div class='keyboard-input'>\
        <span \
          v-for='n in 9'\
          @click='inputNum(n)'\
          class='keyboard-tile mdui-shadow-1'\
          :style='disabledClass(btnDisabled || n>keyRange).btn'\
          :class='disabledClass(btnDisabled || n>keyRange).ripple'\
          >{{ n }}</span>\
      </div>\
      <div class='keyboard-operate'>\
        <span class='keyboard-tile mdui-shadow-1' @click='markTile'\
        :style='disabledClass(btnDisabled).btn'\
        :class='disabledClass(btnDisabled).ripple'>标记</span>\
        <span class='keyboard-tile mdui-shadow-1' @click='delNum'\
        :style='disabledClass(btnDisabled).btn'\
        :class='disabledClass(btnDisabled).ripple'>清除</span>\
        <span v-if='!gameComplete' class='keyboard-tile mdui-ripple mdui-shadow-1' @click='checkGrid'\
        :style='disabledClass(checkDisabled).btn'\
        :class='disabledClass(checkDisabled).ripple'>查错</span>\
      </div>\
    </div>\
  ",
  methods: {
    inputNum: function (n) {
      if (n > this.keyRange) return;
      bus.$emit('inputNum', n);
    },
    markTile: function () {
      bus.$emit('markTile');
    },
    delNum: function () {
      bus.$emit('delNum');
    },
    checkGrid: function () {
      bus.$emit('checkGrid');
    },

    // 由是否可用，返回相应的样式与类
    disabledClass: function (disabled) {
      var button = {
        backgroundColor: disabled ? 'rgb(235, 236, 236)' : 'rgb(214, 215, 215)'
      }
      var ripple = {
        'mdui-ripple': !disabled
      }

      return {
        btn: button,
        ripple: ripple
      }
    }
  },
  mounted: function () {
    var _this = this;

    // 监听键盘是否可用
    bus.$on('keyboardToggle', function (disabled) {
      _this.btnDisabled = disabled;
    })

    // 监听差错按钮是否可用
    bus.$on('checkBtnDisabled', function (disabled) {
      _this.checkDisabled = disabled;
    })

    // 监听游戏是否完成
    bus.$on('gameComplete', function (complete) {
      _this.gameComplete = complete;
    })
  }
})
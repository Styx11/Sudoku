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
          :class='disabledClass(btnDisabled || n>keyRange)'\
          >{{ n }}</span>\
      </div>\
      <div class='keyboard-operate'>\
        <span class='keyboard-tile mdui-shadow-1' @click='markTile'\
        :class='disabledClass(btnDisabled)'>标记</span>\
        <span class='keyboard-tile mdui-shadow-1' @click='delNum'\
        :class='disabledClass(btnDisabled)'>清除</span>\
        <span v-if='!gameComplete' class='keyboard-tile mdui-ripple mdui-shadow-1' @click='checkGrid'\
        :class='disabledClass(checkDisabled)'>查错</span>\
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
      return {
        'mdui-ripple': !disabled,
        'keyboard-tile-abled': !disabled,
        'keyboard-tile-disabled': disabled
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
Vue.component('game-keyboard', {
  props: {
    keyRange: {
      type: Number,
      require: true
    }
  },
  data: function () {
    return {
      numDisabled: true,
      checkDisabled: true,
      opreateDisabled: true
    }
  },
  template: "\
    <div class='keyboard'>\
      <div class='keyboard-input'>\
        <span \
          v-for='n in 9'\
          @click='inputNum(n)'\
          class='keyboard-tile mdui-shadow-1'\
          :class='disabledClass(numDisabled || n>keyRange)'\
          >{{ n }}</span>\
      </div>\
      <div class='keyboard-operate'>\
        <span class='keyboard-tile mdui-shadow-1' @click='markTile'\
        :class='disabledClass(opreateDisabled)'>标记</span>\
        <span class='keyboard-tile mdui-shadow-1' @click='delNum'\
        :class='disabledClass(opreateDisabled, true)'>清除</span>\
        <span class='keyboard-tile mdui-shadow-1' @click='checkGrid'\
        :class='disabledClass(checkDisabled)'>查错</span>\
      </div>\
    </div>\
  ",
  methods: {
    inputNum: function (n) {
      if (n <= this.keyRange) return bus.$emit('inputNum', n);
    },
    markTile: function () {
      bus.$emit('markTile');
    },
    delNum: function () {
      bus.$emit('delNum');
    },
    checkGrid: function () {
      if (!this.checkDisabled) return bus.$emit('checkGrid');
    },

    // 由是否可用，返回相应的样式与类
    disabledClass: function (disabled, delBtn) {
      return {
        'mdui-ripple': delBtn ? false : !disabled,// 取消清除按钮的涟漪效果，修复禁用后涟漪动画错位bug
        'keyboard-tile-abled': !disabled,
        'keyboard-tile-disabled': disabled
      }
    }
  },
  mounted: function () {
    var _this = this;

    // 监听数字键盘是否可用
    bus.$on('numDisabled', function (disabled) {
      _this.numDisabled = disabled;
    })

    // 监听操作键是否可用
    bus.$on('opreateDisabled', function (disabled) {
      _this.opreateDisabled = disabled;
    })

    // 监听差错按钮是否可用
    bus.$on('checkDisabled', function (disabled) {
      _this.checkDisabled = disabled;
    })
  }
})
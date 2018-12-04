Vue.component('game-keyboard', {
  props: {
    keyRange: {
      type: Number,
      require: true
    },
    disableSolved: {
      type: Boolean,
      require: false
    }
  },
  data: function () {
    return {
      numDisabled: true,
      checkDisabled: true,
      opreateDisabled: true,
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
      }
    }
  },
  template: "\
    <div class='keyboard'>\
      <div class='keyboard-input'>\
        <span \
          v-for='n in 9'\
          @click='inputNum(n)'\
          class='keyboard-tile mdui-shadow-1'\
          :class='numClass(n)'\
          >{{ n }}</span>\
      </div>\
      <div class='keyboard-operate'>\
        <span class='keyboard-tile mdui-shadow-1' @click='markTile'\
        :class='operateClass(opreateDisabled)'>标记</span>\
        <span class='keyboard-tile mdui-shadow-1' @click='delNum'\
        :class='operateClass(opreateDisabled, true)'>清除</span>\
        <span class='keyboard-tile mdui-shadow-1' @click='checkGrid'\
        :class='operateClass(checkDisabled)'>查错</span>\
      </div>\
    </div>\
  ",
  methods: {
    inputNum: function (n) {
      if (n <= this.keyRange && !this.numberSolved[n]) return bus.$emit('inputNum', n);
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
    operateClass: function (disabled, delBtn) {
      return {
        'mdui-ripple': delBtn ? false : !disabled,// 取消清除按钮的涟漪效果，修复禁用后涟漪动画错位bug
        'keyboard-tile-abled': !disabled,
        'keyboard-tile-disabled': disabled
      }
    },
    numClass: function (num) {
      var keyRange = this.keyRange;// 数字量若达到上限，则禁用
      var disabled = this.numDisabled || num > keyRange || this.numberSolved[num];

      return {
        'mdui-ripple': !disabled || this.disableSolved,// 开启数字量禁用时，开启涟漪
        'keyboard-tile-abled': !disabled,
        'keyboard-tile-disabled': disabled
      }
    },

    // 处理数字完成量
    handleNums: function (nums) {
      for (var n in nums) {
        this.numberSolved[n] = this.disableSolved && nums ? (nums[n] >= this.keyRange) : false;
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

    // 监听数字完成量
    bus.$on('numberSolved', this.handleNums)
  }
})
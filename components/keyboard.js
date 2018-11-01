Vue.component('key-input', {
  data: function () {
    return {
      disabled: true,
    }
  },
  computed: {
    disabledBtn: function () {
      return {
        backgroundColor: this.disabled ? 'rgb(235, 236, 236)' : 'rgb(214, 215, 215)'
      }
    },
    disabledRipple: function () {
      return {
        'mdui-ripple': !this.disabled
      }
    }
  },
  template: "\
    <div class='keyboard'>\
      <div class='keyboard-input'>\
        <span \
          v-for='n in 9'\
          @click='inputNum(n)'\
          class='keyboard-tile'\
          :style='disabledBtn'\
          :class='disabledRipple'\
          >{{ n }}</span>\
      </div>\
      <div class='keyboard-operate'>\
        <span class='keyboard-tile' @click='markTile' :style='disabledBtn' :class='disabledRipple'>标记</span>\
        <span class='keyboard-tile' @click='delNum' :style='disabledBtn' :class='disabledRipple'>清除</span>\
        <span class='keyboard-tile mdui-ripple' @click='checkGrid'>查重</span>\
      </div>\
    </div>\
  ",
  methods: {
    inputNum: function (n) {
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
    }
  },
  mounted: function () {
    var _this = this;

    bus.$on('keyboardToggle', function (disabled) {
      _this.disabled = disabled;
    })
  }
})
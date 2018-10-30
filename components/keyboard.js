Vue.component('key-input', {
  template: "\
    <div class='keyboard'>\
      <div class='keyboard-input'>\
        <span \
          v-for='n in 10'\
          @click='inputNum(n)'\
          class='keyboard-tile mdui-ripple'>{{ n }}</span>\
      </div>\
      <div class='keyboard-operate'>\
        <span class='keyboard-tile mdui-ripple' @click='markTile'>标记</span>\
        <span class='keyboard-tile mdui-ripple' @click='delNum'>清除</span>\
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
    }
  }
})
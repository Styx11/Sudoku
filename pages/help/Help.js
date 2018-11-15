Vue.component("HelpPage", {
  template: '\
    <div class="help">\
      <mdui-header :title="\'帮助\'">\
        <template slot="drawer">\
          <a class="mdui-btn mdui-btn-icon mdui-ripple mdui-text-color-white" @click="go(\'HomePage\')">\
            <i class="mdui-icon material-icons">&#xe5c4;</i>\
          </a>\
        </template>\
      </mdui-header>\
      <ul class="mdui-list">\
        <li class="mdui-subheader mdui-text-color-theme-accent">规则</li>\
        <li class="mdui-list-item mdui-ripple" @click="go(\'HelpHow\')">怎么玩</li>\
        <li class="mdui-list-item mdui-ripple" @click="go(\'HelpTrick\')">基本技巧</li>\
        <li class="mdui-subheader mdui-text-color-theme-accent">反馈</li>\
        <li class="mdui-list-item mdui-ripple">\
          <a href="https://github.com/Styx11/Sudoku/issues">BUG报告</a>\
        </li>\
      </ul>\
    </div>\
  ',
  methods: {
    go: function (path) {
      bus.$emit('go', path);
    }
  }
})
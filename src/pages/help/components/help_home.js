var HelpPage = {
  template: '\
    <div class="help-home">\
      <mdui-header title="帮助">\
        <template slot="drawer">\
          <a class="mdui-btn mdui-btn-icon mdui-ripple mdui-text-color-white" @click="goBack">\
            <i class="mdui-icon material-icons">&#xe5c4;</i>\
          </a>\
        </template>\
      </mdui-header>\
      <ul class="mdui-list">\
        <li class="mdui-subheader mdui-text-color-theme-accent">规则</li>\
        <router-link to="/help/how">\
          <li class="mdui-list-item mdui-ripple">怎么玩</li>\
        </router-link>\
        <router-link to="/help/trick">\
          <li class="mdui-list-item mdui-ripple">基本技巧</li>\
        </router-link>\
        <li class="mdui-subheader mdui-text-color-theme-accent">反馈</li>\
        <li class="mdui-list-item mdui-ripple">\
          <a href="https://github.com/Styx11/Sudoku/issues">BUG报告</a>\
        </li>\
      </ul>\
    </div>\
  ',
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
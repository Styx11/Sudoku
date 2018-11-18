Vue.component('SettingPage', {
  data: function () {
    return {
      tips: false,
      timer: false,
      disableSolved: false,
      dark: false
    }
  },
  computed: {
    settings: function () {
      return {
        tips: this.tips,
        timer: this.timer,
        disableSolved: this.disableSolved,
        dark: this.dark
      }
    }
  },
  template: '\
    <div>\
    <mdui-header title="设置">\
      <template slot="drawer">\
        <a class="mdui-btn mdui-btn-icon mdui-ripple mdui-text-color-white" @click="go(\'HomePage\')">\
          <i class="mdui-icon material-icons">&#xe5c4;</i>\
        </a>\
      </template>\
    </mdui-header>\
    <ul class="mdui-list">\
      <li class="mdui-subheader mdui-text-color-theme-accent">谜题</li>\
      <label class="mdui-list-item mdui-ripple mdui-typo">\
        <li class="mdui-list-item-content">\
          <div class="mdui-list-item-title mdui-list-item-one-line">显示提示选项</div>\
          <div class="mdui-list-item-text mdui-list-item-one-line">一点小小的帮助</div>\
        </li>\
        <div class="mdui-checkbox">\
          <input type="checkbox" v-model="tips"/>\
          <i class="mdui-checkbox-icon"></i>\
        </div>\
      </label>\
      <label class="mdui-list-item mdui-ripple">\
        <li class="mdui-list-item-content">\
          <div class="mdui-list-item-title mdui-list-item-one-line">启用计时器</div>\
          <div class="mdui-list-item-text mdui-list-item-one-line">分秒必争地玩</div>\
        </li>\
        <div class="mdui-checkbox">\
          <input type="checkbox" v-model="timer"/>\
          <i class="mdui-checkbox-icon"></i>\
        </div>\
      </label>\
      <label class="mdui-list-item mdui-ripple">\
        <li class="mdui-list-item-content">\
          <div class="mdui-list-item-title mdui-list-item-one-line">禁用已解决的数字</div>\
          <div class="mdui-list-item-text mdui-list-item-one-line">当数字放置9次后按钮变为灰色</div>\
        </li>\
        <div class="mdui-checkbox">\
          <input type="checkbox" v-model="disableSolved"/>\
          <i class="mdui-checkbox-icon"></i>\
        </div>\
      </label>\
      <li class="mdui-subheader mdui-text-color-theme-accent">通用</li>\
      <label class="mdui-list-item mdui-ripple">\
        <li class="mdui-list-item-content">深色模式</li>\
        <div class="mdui-checkbox">\
          <input type="checkbox" v-model="dark"/>\
          <i class="mdui-checkbox-icon"></i>\
        </div>\
      </label>\
      <li class="mdui-subheader mdui-text-color-theme-accent">版本</li>\
      <li class="mdui-list-item mdui-ripple">1.4.2</li>\
    </ul>\
    </div>\
  ',
  methods: {
    go: function (path) {
      bus.$emit('go', path);
    }
  },
  watch: {
    // 监视并发出设置事件
    settings: function () {
      bus.$emit('getSets', this.settings);
    }
  }
})
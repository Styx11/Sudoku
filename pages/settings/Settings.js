var SettingPage = {
  props: {
    settings: {
      type: Object,
      require: true
    }
  },
  data: function () {
    return {
      tips: this.settings.tips,
      timer: this.settings.timer,
      disableSolved: this.settings.disableSolved,
      dark: this.settings.dark
    }
  },
  template: '\
    <div class="settings">\
    <mdui-header title="设置">\
      <template slot="drawer">\
        <a class="mdui-btn mdui-btn-icon mdui-ripple mdui-text-color-white" @click="goBack">\
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
          <input type="checkbox" @click="getSets(\'tips\', !tips)" v-model="tips"/>\
          <i class="mdui-checkbox-icon"></i>\
        </div>\
      </label>\
      <label class="mdui-list-item mdui-ripple">\
        <li class="mdui-list-item-content">\
          <div class="mdui-list-item-title mdui-list-item-one-line">启用计时器</div>\
          <div class="mdui-list-item-text mdui-list-item-one-line">分秒必争地玩</div>\
        </li>\
        <div class="mdui-checkbox">\
          <input type="checkbox" @click="getSets(\'timer\', !timer)" v-model="timer"/>\
          <i class="mdui-checkbox-icon"></i>\
        </div>\
      </label>\
      <label class="mdui-list-item mdui-ripple mdui-hidden-lg-up">\
        <li class="mdui-list-item-content">\
          <div class="mdui-list-item-title mdui-list-item-one-line">禁用已解决的数字</div>\
          <div class="mdui-list-item-text mdui-list-item-one-line">当数字放置4/6/9次后按钮变为灰色</div>\
        </li>\
        <div class="mdui-checkbox">\
          <input type="checkbox" @click="getSets(\'disableSolved\', !disableSolved)" v-model="disableSolved"/>\
          <i class="mdui-checkbox-icon"></i>\
        </div>\
      </label>\
      <li class="mdui-subheader mdui-text-color-theme-accent">通用</li>\
      <label class="mdui-list-item mdui-ripple">\
        <li class="mdui-list-item-content">深色模式</li>\
        <div class="mdui-checkbox">\
          <input type="checkbox" @click="getSets(\'dark\', !dark)" v-model="dark"/>\
          <i class="mdui-checkbox-icon"></i>\
        </div>\
      </label>\
      <li class="mdui-subheader mdui-text-color-theme-accent">版本</li>\
      <li class="mdui-list-item mdui-ripple">1.4.2</li>\
    </ul>\
    </div>\
  ',
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    getSets: function (item, setting) {
      bus.$emit('getSets', {
        item: item,
        setting: setting
      })
    }
  }
}
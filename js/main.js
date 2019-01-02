var bus = new Vue();
var body = document.getElementsByTagName('body')[0];
var keyboardManager = new KeyboardManager(bus);
var localStorageManager = new localStorageManager();

var sudoku = new Vue({
  el: '#sudoku',
  router: router,
  data: {
    settings: {
      tips: false,
      timer: false,
      disableSolved: false,
      dark: false
    },
    slideName: ''
  },
  created: function () {
    var settings = localStorageManager.getGameState("settings");

    if (settings) this.settings = settings;
  },
  mounted: function () {
    var _this = this;
    if (_this.settings.dark) body.classList.add('mdui-theme-layout-dark');

    // 接收设置
    bus.$on('getSets', function (e) {
      var item = e.item;
      var setting = e.setting;

      _this.settings[item] = setting;
      _this.settings.dark
        ? body.classList.add('mdui-theme-layout-dark')
        : body.classList.remove('mdui-theme-layout-dark');

      localStorageManager.setGameState("settings", _this.settings);
    })
  },
  watch: {
    '$route': function (to, from) {
      var toPath = to.path;
      var fromPath = from.path;

      if (fromPath === '/') {// 根路径split后长度也为2，所以直接判断
        return this.slideName = 'slideInRight';
      } else if (toPath === '/') {
        return this.slideName = 'slideInLeft';
      }

      var toDepth = toPath.split('/').length;
      var fromDepth = fromPath.split('/').length;
      this.slideName = toDepth > fromDepth ? 'slideInRight' : 'slideInLeft';
    }
  }
})
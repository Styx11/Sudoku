var bus = new Vue();
var localStorageManager = new localStorageManager();

var sudoku = new Vue({
  el: '#sudoku',
  data: {
    page: "HomePage",
    settings: {
      tips: false,
      timer: false,
      disableSolved: false,
      dark: false
    }
  },
  created: function () {
    // 应用页面缓存
    var page = localStorageManager.getGameState("page");
    var settings = localStorageManager.getGameState("settings");

    if (page) this.page = page;
    if (settings) this.settings = settings;
  },
  mounted: function () {
    var _this = this;

    // 模拟路由
    bus.$on('go', function (path) {
      _this.page = path;
      localStorageManager.setGameState("page", _this.page);
    })

    // 接收设置
    bus.$on('getSets', function (e) {
      var item = e.item;
      var setting = e.setting;

      _this.settings[item] = setting;
      localStorageManager.setGameState("settings", _this.settings);
    })
  }
})
var bus = new Vue();
var inst = new mdui.Dialog('#correct');
var localStorageManager = new localStorageManager();

var sudoku = new Vue({
  el: '#sudoku',
  data: {
    page: "HomePage"
  },
  mounted: function () {
    var _this = this;

    // 模拟路由
    bus.$on('go', function (path) {
      _this.page = path;
    })
  }
})
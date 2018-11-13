var bus = new Vue();
var inst = new mdui.Dialog('#correct');
var localStorageManager = new localStorageManager();

var sudoku = new Vue({
  el: '#sudoku',
  data: {
    page: "home-page"
  }
})
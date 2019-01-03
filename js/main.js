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
    books: [],// 收藏夹
    slideName: ''
  },
  created: function () {
    var settings = localStorageManager.getGameState("settings");
    var books = localStorageManager.getGameState("books");

    if (settings) this.settings = settings;
    if (books) this.books = books;
  },
  mounted: function () {
    if (this.settings.dark) body.classList.add('mdui-theme-layout-dark');

    bus.$on('getSets', this.getSets);// 接收设置
    bus.$on('markBook', this.markBook);// 添加收藏
    bus.$on('delBook', this.delBook);// 删除收藏
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
  },
  methods: {
    getSets: function (e) {
      var item = e.item;
      var setting = e.setting;

      this.settings[item] = setting;
      this.settings.dark
        ? body.classList.add('mdui-theme-layout-dark')
        : body.classList.remove('mdui-theme-layout-dark');

      localStorageManager.setGameState("settings", this.settings);
    },
    markBook: function (e) {
      var book = e;
      this.books.push(book);
      localStorageManager.setGameState('books', this.books);
    },
    delBook: function (id) {
      var id = id;
      var books = [];
      this.books.forEach(function (item) {
        if (item.id !== id) {
          books.push(item);
        }
      })
      this.books = books;
      localStorageManager.setGameState('books', this.books);
    }
  }
})
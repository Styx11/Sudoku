var bus = new Vue();
var localStorageManager = new localStorageManager();

var sudoku = new Vue({
  el: '#sudoku',
  data: {
    size: 0,
    levels: {
      0: 1/3,
      1: 1/2,
      2: 2/3
    },
    originGrid: [],
    gameGrid: []
  },
  computed: {
    bindClass: function () {
      return {
        gridClass: 'mdui-row-xs-' + this.size
      }
    }
  },
  created: function () {
    // 应用本地缓存
    var originGrid = localStorageManager.getGameState("originGrid");
    var gameGrid = localStorageManager.getGameState("gameGrid");

    if (!originGrid || !gameGrid) return;
    this.originGrid = originGrid;
    this.gameGrid = gameGrid;
    this.size = gameGrid.length;
  },
  methods: {
    reset: function () {
      bus.$emit('resetGrid');
    },
    start: function (size, level) {
      localStorageManager.clearGameState();// 清除上一次缓存

      this.size = this.size ? 0 : size;
      if (!this.size) return;// 将每次均执行改为开关，解决组件缓存

      var grid = new Grid(this.size);
      var level = Math.floor(this.size * this.levels[level]);

      this.originGrid = grid.cells;
      this.gameGrid = grid.gameCells(level);

      // 记录缓存
      localStorageManager.setGameState("originGrid", this.originGrid);
      localStorageManager.setGameState("gameGrid", this.gameGrid);
    }
  }
})
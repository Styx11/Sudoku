var bus = new Vue();

var sudoku = new Vue({
  el: '#sudoku',
  data: {
    size: 0,
    levels: {
      0: 1/3,
      1: 1/2,
      2: 2/3
    },
    originalGrid: [],
    gameGrid: []
  },
  computed: {
    bindClass: function () {
      return {
        cellSize: 'mdui-row-xs-' + this.size
      }
    }
  },
  methods: {
    reset: function () {
      bus.$emit('resetGrid');
    },
    start: function (size, level) {
      this.size = this.size ? 0 : size;
      if (!this.size) return;// 将每次均执行改为开关，解决组件缓存

      var level = Math.floor(this.size * this.levels[level]);
      var grid = new Grid(this.size);

      this.originalGrid = grid.cells;
      this.gameGrid = grid.gameCells(level);
    }
  }
})
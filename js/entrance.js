// level = {
//   easy: 1/3,
//   normal: 1/2,
//   hard: 1-1/3,
// }
var bus = new Vue();

var sudoku = new Vue({
  el: '#sudoku',
  data: {
    size: 0,
    level: 0
  },
  computed: {
    grid: function () {
      var grid = new Grid(this.size);
      var originalGrid = grid.cells;
      var level = Math.floor(this.size * this.level);
      var gameGrid = grid.gameCells(level);

      return {
        originalGrid: originalGrid,
        gameGrid: gameGrid
      }
    },
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
      var levels = {
        0: 1/3,
        1: 1/2,
        2: 2/3
      }

      this.size = size;
      this.level = levels[level];
    }
  }
})
// console.log(grid.cells);
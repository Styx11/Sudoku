// level = {
//   easy: 1/3,
//   normal: 1/2,
//   hard: 1-1/3,
// }
var bus = new Vue();

var sudoku = new Vue({
  el: '#sudoku',
  data: {
    size: 9,
  },
  computed: {
    grid: function () {
      var grid = new Grid(this.size);
      var originalGrid = grid.cells;
      var gameGrid = grid.gameCells(4);

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
    }
  },
  mounted: function () {

  }
})
// console.log(grid.cells);
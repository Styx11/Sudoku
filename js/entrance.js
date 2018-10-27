
// level = {
//   easy: 1/3,
//   normal: 1/2,
//   hard: 1-1/3,
// }

var sudoku = new Vue({
  el: '#sudoku',
  data: {
    size: 9,
  },
  computed: {
    grid: function () {
      var grid = new Grid(this.size);
      return {
        grid: grid,
        gameGrid: grid.gameCells(4)
      }
    },
    bindClass: function () {
      return {
        cellSize: 'mdui-row-xs-' + this.size
      }
    }
  },
  mounted: function () {

  }
})
// console.log(grid.cells);
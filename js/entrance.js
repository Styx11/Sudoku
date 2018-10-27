var grid = new Grid(9);
// level = {
//   easy: 1/3,
//   normal: 1/2,
//   hard: 1-1/3,
// }

var sudoku = new Vue({
  el: '#sudoku',
  data: {
    cells: grid.gameCells(4),
  }
})
// console.log(grid.cells);
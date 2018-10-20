var grid = new Grid(9);
grid.initGrid();
try {
  grid.loop(grid.box[0], function () {
    grid.loop(grid.box[1])
  });
} catch (e) {
  console.log(e);
}
console.log(grid.cells);
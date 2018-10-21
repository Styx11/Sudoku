var grid = new Grid(9);
grid.initGrid();

while (true) {
  if (grid.loop(grid.box[0]) && grid.loop(grid.box[2]) && grid.loop(grid.box[3]) && grid.loop(grid.box[5])) {
    break;
  } else {
    grid.initGrid();
  }
}
console.log(grid.cells);
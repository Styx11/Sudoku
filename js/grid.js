function Grid (size) {
  this.size = size ? size : 9;
  this.cells = [];
  this.box = [
    {rowStart: 0, rowEnd: 2, colStart: 3, colEnd: 5},
    {rowStart: 0, rowEnd: 2, colStart: 6, colEnd: 8},
    {rowStart: 3, rowEnd: 5, colStart: 0, colEnd: 2},
    {rowStart: 3, rowEnd: 5, colStart: 6, colEnd: 8},
    {rowStart: 6, rowEnd: 8, colStart: 0, colEnd: 2},
    {rowStart: 6, rowEnd: 8, colStart: 3, colEnd: 5}
  ]
}
Grid.prototype.randomIndex = function (min, max) {
  if (!max) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
}
Grid.prototype.shuffle = function (arr) {
  // 创建一个长度为size的数组
  // map方法要求一个可遍历的数组
  var arr = arr ? arr : Array.apply(null, {length: this.size}).map(function (item, index) {
    return index + 1;
  })
  var length = this.size;
  var shuffled = new Array(length);
  for (var index=0; index<length; index++) {
    var random = this.randomIndex(0, index);
    if (random !== index) {
      shuffled[index] = shuffled[random];
    }
    shuffled[random] = arr[index];
  }
  return shuffled;
}
Grid.prototype.initGrid = function () {
  var shuffled = this.shuffle();
  for (var row=0; row<this.size; row++) {
    this.cells[row] = [];
    for (var col=0; col<this.size; col++) {
      this.cells[row].push(0);
    }
  }
  var maxCol = 3;
  var col = 0;
  var index = 0;// 建立对角线宫格
  for (var row=0; row<maxCol; row++) {
    if (row === 9) break;
    for ( ; col<maxCol; col++) {
      this.cells[row][col] = shuffled[index];
      index++;
    }
    if (!((row + 1) % 3)) {
      maxCol += 3;
      index = 0;
      shuffled = this.shuffle();
    }
    col = maxCol - 3;
  }
}
Grid.prototype.loop = function (box, callback) {
  var rowEnd = box.rowEnd + 1,
    rowStart = box.rowStart;
  var colEnd = box.colEnd + 1,
    colStart = box.colStart;
  var boxHash = {};
  var shuffled = this.shuffle();
  for (row=rowStart; row<rowEnd; row++) {
    var rowHash = this.hash(row, 'row');
    for (col=colStart; col<colEnd; col++) {
      var colHash = this.hash(col, 'col');
      for (var index=0; index<9; index++) {
        if (!rowHash[shuffled[index]] && !colHash[shuffled[index]] && !boxHash[shuffled[index]]) {
          boxHash[shuffled[index]] = true;
          this.cells[row][col] = shuffled[index];
          break;
        }
      }
      if (!this.cells[row][col]) {
        this.loop(box);
      }
    }
  }
  if (callback) {
    callback();
  }
  return true;
}
Grid.prototype.hash = function (index, line) {
  var hash = {};// 返回指定列的哈希表，并携带其数目状态
  if (line === 'col') {
    for (var row=0; row<this.size; row++) {
      if (!hash[this.cells[row][index]]) {
        hash[this.cells[row][index]] = 'single';
      } else {
        hash[this.cells[row][index]] = 'surplus';
      }
    }
  } else {
    for (var col=0; col<this.size; col++) {
      if (!hash[this.cells[index][col]]) {
        hash[this.cells[index][col]] = 'single';
      } else {
        hash[this.cells[index][col]] = 'surplus';
      }
    }
  }
  return hash;
}
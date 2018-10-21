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
  // 洗牌算法生成随机数组
  for (var index=0; index<length; index++) {
    var random = this.randomIndex(0, index);
    if (random !== index) {
      shuffled[index] = shuffled[random];
    }
    shuffled[random] = arr[index];
  }
  return shuffled;
}

// 初始化栅格，包括初始化、建立对角线九宫格、建立反对角线九宫格
Grid.prototype.initGrid = function () {
  for (var row=0; row<this.size; row++) {
    this.cells[row] = Array.apply(null, {length: this.size});
  }

  var maxCol = 3;
  var col = 0;
  var index = 0;
  var shuffled = this.shuffle();

  // 建立对角线宫格
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
  // 填写反对角九宫格 (比填写中间九宫格效率高，所以一并执行)
  while (true) {
    if (grid.loop(grid.box[1]) && grid.loop(grid.box[4])) {
      break;
    }
  }
}

// 根据九宫格位置填写九宫格
Grid.prototype.loop = function (box) {
  var rowEnd = box.rowEnd + 1,
    rowStart = box.rowStart;
  var colEnd = box.colEnd + 1,
    colStart = box.colStart;
  var boxHash = {};// 九宫格哈希表
  var shuffled = this.shuffle();

  for (row=rowStart; row<rowEnd; row++) {
    var rowHash = this.hash(row, 'row');// 行哈希表
    for (col=colStart; col<colEnd; col++) {
      var colHash = this.hash(col, 'col');// 列哈希表
      for (var index=0; index<9; index++) {
        // 判断三个哈希表均无该值
        if (!rowHash[shuffled[index]] && !colHash[shuffled[index]] && !boxHash[shuffled[index]]) {
          boxHash[shuffled[index]] = true;// 更新九宫格哈希表
          this.cells[row][col] = shuffled[index];
          break;
        }
      }
      if (!this.cells[row][col]) {
        return false;// 由于栈溢出，从递归改为循环
      }
    }
  }
  return true;
}

// 返回指定列的哈希表，并携带其数目状态
Grid.prototype.hash = function (index, line) {
  var hash = {};
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
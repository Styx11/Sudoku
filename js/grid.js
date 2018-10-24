function Grid (size) {
  this.size = size ? size : 9;
  this.cells = [];
  this.boxs = {
    9: [
      {rowStart: 0, rowEnd: 2, colStart: 0, colEnd: 2},// box1
      {rowStart: 0, rowEnd: 2, colStart: 3, colEnd: 5},// box2
      {rowStart: 0, rowEnd: 2, colStart: 6, colEnd: 8},// box3
      {rowStart: 3, rowEnd: 5, colStart: 0, colEnd: 2},// box4
      {rowStart: 3, rowEnd: 5, colStart: 3, colEnd: 5},// box5
      {rowStart: 3, rowEnd: 5, colStart: 6, colEnd: 8},// box6
      {rowStart: 6, rowEnd: 8, colStart: 0, colEnd: 2},// box7
      {rowStart: 6, rowEnd: 8, colStart: 3, colEnd: 5},// box8
      {rowStart: 6, rowEnd: 8, colStart: 6, colEnd: 8},// box9
    ],
    6: [
      {rowStart: 0, rowEnd: 1, colStart: 0, colEnd: 2},// box1
      {rowStart: 0, rowEnd: 1, colStart: 3, colEnd: 5},// box2
      {rowStart: 2, rowEnd: 3, colStart: 0, colEnd: 2},// box3
      {rowStart: 2, rowEnd: 3, colStart: 3, colEnd: 5},// box4
      {rowStart: 4, rowEnd: 5, colStart: 0, colEnd: 2},// box5
      {rowStart: 4, rowEnd: 5, colStart: 3, colEnd: 5},// box6
    ],
    4: [
      {rowStart: 0, rowEnd: 1, colStart: 0, colEnd: 1},// box1
      {rowStart: 0, rowEnd: 1, colStart: 2, colEnd: 3},// box2
      {rowStart: 2, rowEnd: 3, colStart: 0, colEnd: 1},// box3
      {rowStart: 2, rowEnd: 3, colStart: 2, colEnd: 3} // box4
    ]
  };
  this.box = this.boxs[this.size];
  this.fillGrid();
}

// 获取区间内的随机数
Grid.prototype.randomIndex = function (min, max) {
  if (!max) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
}

// 获取一个随机数组
Grid.prototype.shuffle = function (arr) {
  // 创建一个长度为size的数组
  // map方法要求一个可遍历的数组
  var arr = arr
    ? arr 
    : Array.apply(null, {length: this.size})
        .map(function (item, index) {
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

// 初始化并完成九宫格填写
Grid.prototype.fillGrid = function () {
  // 持续执行，直到完成填写
  while (true) {
    var flag = true;

    // 建立可遍历矩阵
    for (var row=0; row<this.size; row++) {
      this.cells[row] = Array.apply(null, {length: this.size});
    }

    // 按宫填写数字
    for (var index=0; index<this.size; index++) {
      if (!this.fillBox(this.box[index])) {
        flag = false;// 标记某宫填写失败
        break;
      }
    }
    if (flag) {
      break;
    }
  }
  return true;
}

// 按难度返回九宫格
Grid.prototype.gameCells = function (level) {
  var gameCells = this.cells;
  var length = level;
  var shuffled = [];
  var shuffledCol = 0;

  // 按难度每行去除数字
  for (var row=0; row<this.size; row++) {
    shuffled = this.shuffle();

    // 按难度截取随机数组前level个数, col序数为该数的单元格为0
    for (var index=0; index<length; index++) {
      shuffledCol = shuffled[index] - 1;
      gameCells[row][shuffledCol] = 0;
    }
  }
  return gameCells;
}

// 根据九宫格位置填写九宫格
Grid.prototype.fillBox = function (box) {
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
      for (var index=0; index<shuffled.length; index++) {
        // 判断三个哈希表均无该值
        if (!rowHash[shuffled[index]] && !colHash[shuffled[index]] && !boxHash[shuffled[index]]) {
          boxHash[shuffled[index]] = true;// 更新九宫格哈希表
          this.cells[row][col] = shuffled[index];
          break;
        }
      }
      // 若单元格填写失败，则此次九宫格创建失败
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
        hash[this.cells[row][index]] = true;
      }
    }
  } else {
    for (var col=0; col<this.size; col++) {
      if (!hash[this.cells[index][col]]) {
        hash[this.cells[index][col]] = true;
      }
    }
  }
  return hash;
}
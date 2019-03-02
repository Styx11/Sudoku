export default class Grid {
  constructor(size) {
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
    this.rowHash = [];// 行列哈希表
    this.colHash = [];// 按宫填写失败时重置
    this.count = 0;
    this.box = this.boxs[this.size];
    this.egg = [
      {row: 1, col: 1},
      {row: 1, col: 2},
      {row: 2, col: 0},
      {row: 2, col: 3},
      {row: 3, col: 0},
      {row: 3, col: 4},
      {row: 4, col: 0},
      {row: 5, col: 1},
      {row: 6, col: 2},
      {row: 7, col: 3},
      {row: 8, col: 4}
    ];
    this.fillGrid();
  }

  // 获取区间内的随机数
  randomIndex(min, max) {
    if (!max) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  // 获取一个随机数组
  shuffle(targetArr) {
    // 创建一个长度为size的数组
    // map方法要求一个可遍历的数组
    const arr = targetArr
    ? targetArr
    : Array
        .apply(null, {length: this.size})
        .map((item, index) => index + 1);
    const length = this.size;
    const shuffled = new Array(length);

    // 洗牌算法生成随机数组
    for (let i=0; i<length; i++) {
      let random = this.randomIndex(0, i);
      if (random !== i) {
        shuffled[i] = shuffled[random];
      }
      shuffled[random] = arr[i];
    }
    return shuffled;
  }

  // 初始化并完成九宫格填写
  fillGrid() {
    let flag = true;

    // 持续执行，直到完成填写
    while (flag) {
      let count = this.size;

      // 建立可遍历矩阵
      for (let row=0; row<this.size; row++) {
        this.cells[row] = Array.apply(null, {length: this.size});
      }

      // 按宫填写数字
      for (let i=0; i<this.size; i++) {
        if (!this.fillBox(this.box[i])) {
          count--;// 标记某宫填写失败
          break;
        }
      }
      this.rowHash = [];// 重置
      this.colHash = [];
      if (count === this.size) {// 全部填写完成
        flag = false;
      }
    }
  }

  // 根据九宫格位置填写九宫格
  fillBox(box) {
    const rowEnd = box.rowEnd + 1,
      rowStart = box.rowStart;
    const colEnd = box.colEnd + 1,
      colStart = box.colStart;
    const boxHash = {};// 九宫格哈希表
    const rowHash = this.rowHash;
    const colHash = this.colHash;
    const shuffled = this.shuffle();

    for (let row=rowStart; row<rowEnd; row++) {
      if (!rowHash[row]) {
        rowHash[row] = {};
      }
      for (let col=colStart; col<colEnd; col++) {
        if (!colHash[col]) {
          colHash[col] = {};
        }
        for (let i=0; i<shuffled.length; i++) {
          // 判断三个哈希表均无该值
          const value = shuffled[i];
          if (!rowHash[row][value] && !colHash[col][value] && !boxHash[value]) {
            boxHash[value] = true;
            rowHash[row][value] = true;// 更新哈希表
            colHash[col][value]  = true;
            this.cells[row][col] = value;
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

  // 实现原九宫格的深拷贝
  deepClone(obj) {
    const _obj = JSON.stringify(obj);
    const objClone = JSON.parse(_obj);

    return objClone;
  }

  // 按难度返回九宫格
  gameGrid(level) {
    const gameGrid = this.deepClone(this.cells);
    const length = level;
    let shuffled = [];
    let shuffledCol = 0;

    // 按难度每行去除数字
    for (let row=0; row<this.size; row++) {
      shuffled = this.shuffle();

      // 按难度截取随机数组前level个数, col序数为该数的单元格为0
      for (let i=0; i<length; i++) {
        shuffledCol = shuffled[i] - 1;
        gameGrid[row][shuffledCol] = 0;
      }
    }
    return gameGrid;
  }

  // 游戏彩蛋
  easterEgg() {
    const easterEgg = this.deepClone(this.cells);
    const egg = this.egg;
    const heart = [];
  
    for (let i=0; i<9; i++) {// 创建可遍历9x9
      heart[i] = Array.apply(null, {length: 9});
    }
    
    for (let j=0; j<egg.length; j++) {
      const row = egg[j].row;
      const col = egg[j].col;
      const symCol = 8 - col;// 心形为对称图形，定义一个对称列
  
      heart[row][col] = easterEgg[row][col];// 在特定位置上填上数字
      heart[row][symCol] = easterEgg[row][symCol];
    }
  
    for (let row=0; row<9; row++) {// 心形终盘默认为9x9
      for (let col=0; col<9; col++) {
        easterEgg[row][col] = heart[row][col] ? heart[row][col] : 0;
      }
    }
    return easterEgg;
  }
}
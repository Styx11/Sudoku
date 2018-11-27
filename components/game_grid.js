Vue.component('game-grid', {
  props:[
    'grid',
    'originGrid'
  ],
  data: function () {
    return {
      gameGrid: JSON.parse(JSON.stringify(this.grid)),
      size: this.grid.length,
      // 用于当前选中单元格
      selectedCell: {
        rowIndex: undefined,
        colIndex: undefined
      },
      // 用于单元格标记
      markGrid: [],
      markClass: {
        1: 'grid-cell-marked',
        2: 'grid-cell-incorrect',
        3: 'grid-cell-selected',
        4: 'grid-cell-same'
      }
    }
  },
  template: '\
    <div>\
    <!-- 未发现错误 -->\
    <mdui-dialog id="correct" content="未发现错误"></mdui-dialog>\
    <!-- 游戏完成提示对话框 -->\
    <mdui-dialog\
      id="complete"\
      title="恭喜！你已完成该题目"\
      content="是否进行新游戏?"\
      :close=true\
      :confirm="start">\
    </mdui-dialog>\
    \
    <table class="game-grid" cellspacing="0">\
      <tbody>\
      <tr\
        :class="\'grid-row-\' + size"\
        v-for="(row, rowIndex) in gameGrid"\
      >\
        <td\
          class="grid-cell mdui-ripple"\
          v-for="(col, colIndex) in row"\
          @click="selectTile(rowIndex, colIndex)"\
          :class="markStyle(rowIndex, colIndex)"\
        >\
          <span v-if="col && grid[rowIndex][colIndex]">{{ col }}</span>\
          <span\
            v-else-if="col && !grid[rowIndex][colIndex]"\
            class="mdui-text-color-blue-500">{{ col }}</span>\
          <span v-else class="mdui-text-color-white"></span>\
        </td>\
      </tr>\
      </tbody>\
    </table>\
    </div>\
  ',
  methods: {
    // 选中单元格，并触发keyboard
    selectTile: function (rowIndex, colIndex) {
      var gridCell = this.grid[rowIndex][colIndex];
      var gameCell = this.gameGrid[rowIndex][colIndex];

      this.selectedCell = {
        rowIndex: rowIndex,
        colIndex: colIndex
      }
      this.markSameNum();
      this.$emit('tipsToggle', this.selectedCell);// 选中单元格时，开关提示按钮

      bus.$emit('numDisabled', gridCell);// 当选中原始单元格时禁用数字键盘
      bus.$emit('opreateDisabled', !gameCell || gridCell);// 选中空/原始单元格时禁用操作键
    },

    // 标记相同数字单元格
    markSameNum: function () {
      var rowIndex = this.selectedCell.rowIndex;
      var colIndex = this.selectedCell.colIndex;
      var selectNum = this.gameGrid[rowIndex][colIndex];
      
      // 标记相同数字
      for (var row=0; row<this.size; row++) {
        for (var col=0; col<this.size; col++) {
          // 跳过已标记和错误数字
          if (this.markGrid[row][col] === 1 || this.markGrid[row][col] === 2) continue;

          // 清除上一次选中和相同数字标记
          if (this.markGrid[row][col] === 3 || this.markGrid[row][col] === 4) {
            this.markTile(row, col, 0);
          }

          // 相同标记，数字需存在且相等
          if (this.gameGrid[row][col] === selectNum && this.gameGrid[row][col]) {
            this.markTile(row, col, 4);
          }
        }
      }

      // 数字选中需跳过已标记及错误数字
      if (this.markGrid[rowIndex][colIndex] !== 1 && this.markGrid[rowIndex][colIndex] !== 2) {
        this.markTile(rowIndex, colIndex, 3);
      }
    },

    // 按照序列标记单元格
    markTile: function (rowIndex, colIndex, markValue) {

      this.$set(this.markGrid[rowIndex], colIndex, markValue);
      localStorageManager.setGameState("markGrid", this.markGrid);

    },

    // 对标记单元格应用的样式
    markStyle: function (rowIndex, colIndex) {
      var tile = this.markGrid[rowIndex][colIndex];

      if (this.markClass[tile]) return this.markClass[tile];
    },

    start: function () {
      this.$emit("start");
    }
  },
  created: function () {
    // 应用本地缓存
    var gridSize = this.grid.length;
    var gamingGrid = localStorageManager.getGameState("gamingGrid");// 游戏中用于填写的九宫格缓存
    var markGrid = localStorageManager.getGameState("markGrid");// 游戏中用于标记的九宫格缓存

    if (gamingGrid) this.gameGrid = gamingGrid;

    if (markGrid) return this.markGrid = markGrid;
    
    // 将数独九宫格与另一个九宫格关联
    // 它记录了单元格是否被标记
    for (var row=0; row<gridSize; row++) {
      this.$set(this.markGrid, row, Array.apply(null, {length: gridSize}));
    }
  },
  mounted: function () {
    var _this = this;

    // 监听数字输入
    bus.$on('inputNum', function (e) {
      var row = _this.selectedCell.rowIndex;
      var col = _this.selectedCell.colIndex;

      if (row === undefined || col === undefined) return;// 未选中任何单元格
      if (_this.grid[row][col]) return;// 选中原始单元格

      // 解决Vue无法检测 vm.items[indexOfItem] = newValue 变更的数组
      _this.$set(_this.gameGrid[row], col, e);
      _this.markTile(row, col, 0);// 清除标记
      _this.markSameNum();// 标记相同数字

      bus.$emit('opreateDisabled', false);// 启用操作键

      // 记录缓存
      localStorageManager.setGameState("gamingGrid", _this.gameGrid);
    })

    // 监听数字清除
    bus.$on('delNum', function () {
      var row = _this.selectedCell.rowIndex;
      var col = _this.selectedCell.colIndex;

      if (row === undefined || col === undefined) return;// 未选中任何单元格
      if (_this.grid[row][col]) return;

      _this.$set(_this.gameGrid[row], col, 0);
      _this.markTile(row, col, 0);// 清除标记
      _this.markSameNum();// 标记空单元格，去除上次数字标记
      
      bus.$emit('opreateDisabled', true);// 禁用操作键

      // 记录缓存
      localStorageManager.setGameState("gamingGrid", _this.gameGrid);
    })

    // 监听数字标记
    bus.$on('markTile', function () {
      var row = _this.selectedCell.rowIndex;
      var col = _this.selectedCell.colIndex;

      if (row === undefined || col === undefined) return;// 未选中任何单元格
      if (_this.grid[row][col]) return;
      if (!_this.gameGrid[row][col]) return;

      var markValue = _this.markGrid[row][col] === 1 ? 0 : 1;
      _this.markTile(row, col, markValue);
    })

    // 监听重置事件
    bus.$on('resetGrid', function () {
      _this.gameGrid = JSON.parse(JSON.stringify(_this.grid));

      // 重置标记九宫格
      var gridSize = _this.grid.length;
      for (var row=0; row<gridSize; row++) {
        _this.$set(_this.markGrid, row, Array.apply(null, {length: gridSize}));
      }

      // 记录缓存
      localStorageManager.setGameState("gamingGrid", _this.gameGrid);
      localStorageManager.setGameState("markGrid", _this.markGrid);
    })

    // 监听查错事件
    bus.$on('checkGrid', function () {
      var length = _this.gameGrid.length;
      var answerCorrect = true;
      var gameComplete = true;

      for (var row=0; row<length; row++) {
        for (var col=0; col<length; col++) {
          if (!_this.gameGrid[row][col]) {
            gameComplete = false;
            continue;
          }

          if (_this.originGrid[row][col] !== _this.gameGrid[row][col]) {
            _this.markTile(row, col, 2);
            answerCorrect = false;
          }
        }
      }

      var instComplete = new mdui.Dialog("#complete");

      if (gameComplete && answerCorrect) return instComplete.open();

      var instCorrect = new mdui.Dialog("#correct");

      if (answerCorrect) return instCorrect.open();
    })
  },
  watch: {
    // 当九宫格无变化时禁用查错按钮
    gameGrid: function () {
      var grid = JSON.stringify(this.grid);
      var gameGrid = JSON.stringify(this.gameGrid);
      var disabled = (gameGrid ===  grid);// 禁用查错
      
      bus.$emit('checkDisabled', disabled);
    }
  }
})
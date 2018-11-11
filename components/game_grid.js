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
      cells: {
        rowIndex: undefined,
        colIndex: undefined
      },

      // 用于单元格标记
      markGrid: [],

      // 差错结果是否正确
      answerCorrect: false
    }
  },
  template: '\
    <table class="game-grid" cellspacing="0">\
      <tbody>\
      <tr\
        :class="\'grid-row-\' + size"\
        v-for="(row, rowIndex) in gameGrid"\
      >\
        <td\
          class="grid-cell mdui-ripple"\
          v-for="(col, colIndex) in row"\
          @click="selectCell(rowIndex, colIndex)"\
          :class="markClass(rowIndex, colIndex)"\
        >\
          <span v-if="col && grid[rowIndex][colIndex]">{{ col }}</span>\
          <span \
            v-else-if="col && !grid[rowIndex][colIndex]"\
            class="mdui-text-color-blue-500">{{ col }}</span>\
          <span v-else class="mdui-text-color-white"></span>\
        </td>\
      </tr>\
      </tbody>\
    </table>\
  ',
  methods: {
    // 选中单元格，并触发keyboard
    selectCell: function (rowIndex, colIndex) {
      if (this.grid[rowIndex][colIndex]) {
        this.cells = {
          rowIndex: undefined,
          colIndex: undefined
        }
        bus.$emit('keyboardToggle', true);
      } else {
        this.cells = {
          rowIndex: rowIndex,
          colIndex: colIndex
        }
        bus.$emit('keyboardToggle', false);
      }
    },
    // 按照序列标记单元格
    markTile: function (rowIndex, colIndex, markValue) {

      this.$set(this.markGrid[rowIndex], colIndex, markValue);
      localStorageManager.setGameState("markGrid", this.markGrid);

    },
    // 对标记单元格应用的类
    markClass: function (rowIndex, colIndex) {
      var tile = this.markGrid[rowIndex][colIndex];
      var markClass = {
        1: 'grid-cell-marked',
        2: 'grid-cell-marked-incorrect'
      }

      if (!markClass[tile]) return;
      return markClass[tile];
    }
  },
  created: function () {
    // 应用本地缓存
    var gridSize = this.grid.length;
    var gamingGrid = localStorageManager.getGameState("gamingGrid");// 游戏中用于填写的九宫格缓存
    var markGrid = localStorageManager.getGameState("markGrid");// 游戏中用于标记的九宫格缓存

    if (gamingGrid) {
      this.gameGrid = gamingGrid;
    }
    if (markGrid) {
      this.markGrid = markGrid;
      return;
    }

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
      var rowIndex = _this.cells.rowIndex;
      var colIndex = _this.cells.colIndex;

      if (rowIndex === undefined && colIndex === undefined) return;

      // 解决Vue无法检测 vm.items[indexOfItem] = newValue 变更的数组
      _this.$set(_this.gameGrid[rowIndex], colIndex, e);
      _this.markTile(rowIndex, colIndex, 0);// 清除标记

      // 记录缓存
      localStorageManager.setGameState("gamingGrid", _this.gameGrid);
    })

    // 监听数字清除
    bus.$on('delNum', function () {
      var rowIndex = _this.cells.rowIndex;
      var colIndex = _this.cells.colIndex;

      if (rowIndex === undefined && colIndex === undefined) return;

      _this.$set(_this.gameGrid[rowIndex], colIndex, 0);
      _this.markTile(rowIndex, colIndex, 0);// 清除标记

      // 记录缓存
      localStorageManager.setGameState("gamingGrid", _this.gameGrid);
    })

    // 监听数字标记
    bus.$on('markTile', function () {
      var rowIndex = _this.cells.rowIndex;
      var colIndex = _this.cells.colIndex;

      if (rowIndex === undefined && colIndex === undefined) return;
      if (!_this.gameGrid[rowIndex][colIndex]) return;

      var markValue = _this.markGrid[rowIndex][colIndex] === 1 ? 0 : 1;
      _this.markTile(rowIndex, colIndex, markValue);
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

      for (var row=0; row<length; row++) {
        for (var col=0; col<length; col++) {
          if (!_this.gameGrid[row][col]) continue;

          if (_this.originGrid[row][col] !== _this.gameGrid[row][col]) {
            _this.markTile(row, col, 2);
            answerCorrect = false;
          }
        }
      }

      _this.answerCorrect = answerCorrect;
    })
  },
  watch: {

    // 当九宫格无变化时禁用查错按钮
    gameGrid: function () {
      var grid = JSON.stringify(this.grid);
      var gameGrid = JSON.stringify(this.gameGrid);
      var originGrid = JSON.stringify(this.originGrid);
      var disabled = (gameGrid ===  grid);// 禁用查错
      var gameComplete = (gameGrid === originGrid);// 是否完成游戏

      bus.$emit('checkBtnDisabled', disabled);
      bus.$emit('gameComplete', gameComplete);
    },

    // 答案正确时打开提示框
    answerCorrect: function () {
      if (!this.answerCorrect) return;

      inst.open();
      this.answerCorrect = false;
    }
  }
})
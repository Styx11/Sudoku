Vue.component('game-grid', {
  props:[
    'cellsize',
    'grid',
    'originalgrid'
  ],
  data: function () {
    return {
      gameGrid: JSON.parse(JSON.stringify(this.grid)),
      cells: {
        rowIndex: undefined,
        colIndex: undefined
      },
      // 用于单元格标记
      markGrid: []
    }
  },
  template: '\
    <table class="game-grid mdui-container-fluid">\
      <tbody>\
      <tr\
        class="grid-row"\
        :class="cellsize"\
        v-for="(row, rowIndex) in gameGrid"\
      >\
        <td\
          class="grid-cell mdui-col mdui-ripple"\
          v-for="(col, colIndex) in row"\
          @click="selectCell(rowIndex, colIndex)"\
          :class="{\'grid-cell-marked\': markGrid[rowIndex][colIndex]}"\
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
    markTile: function (rowIndex, colIndex) {
      var cellValue = !this.markGrid[rowIndex][colIndex];

      this.$set(this.markGrid[rowIndex], colIndex, cellValue);
    }
  },
  created: function () {
    var gridSize = this.grid.length;

    // 将数独九宫格与另一个九宫格对应
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
    })

    // 监听数字清除
    bus.$on('delNum', function () {
      var rowIndex = _this.cells.rowIndex;
      var colIndex = _this.cells.colIndex;

      if (rowIndex === undefined && colIndex === undefined) return;
      _this.$set(_this.gameGrid[rowIndex], colIndex, 0);
    })

    // 监听数字标记
    bus.$on('markTile', function () {
      var rowIndex = _this.cells.rowIndex;
      var colIndex = _this.cells.colIndex;

      if (rowIndex === undefined && colIndex === undefined) return;
      if (!_this.gameGrid[rowIndex][colIndex]) return;

      _this.markTile(rowIndex, colIndex);
    })

    // 监听重置事件
    bus.$on('resetGrid', function () {
      _this.gameGrid = JSON.parse(JSON.stringify(_this.grid));
    })

    // 监听查重事件
  }
})
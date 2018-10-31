Vue.component('game-grid', {
  props:[
    'cellsize',
    'grid'
  ],
  data: function () {
    return {
      gameGrid: JSON.parse(JSON.stringify(this.grid)),
      cells: {
        rowIndex: undefined,
        colIndex: undefined
      },
      fillNum: false,
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
          class="grid-cell mdui-col"\
          v-for="(col, colIndex) in row"\
          @click="selectCell(rowIndex, colIndex)"\
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
    selectCell: function (rowIndex, colIndex) {
      if (this.grid[rowIndex][colIndex]) {
        this.cells = {
          rowIndex: undefined,
          colIndex: undefined
        }
      } else {
        this.cells = {
          rowIndex: rowIndex,
          colIndex: colIndex
        }
      }
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
      Vue.set(_this.gameGrid[rowIndex], colIndex, e);
    })

    // 监听数字清除
    bus.$on('delNum', function () {
      var rowIndex = _this.cells.rowIndex;
      var colIndex = _this.cells.colIndex;

      if (rowIndex === undefined && colIndex === undefined) return;
      Vue.set(_this.gameGrid[rowIndex], colIndex, 0);
    })

    // 监听数字标记

    // 监听重置事件
    bus.$on('resetGrid', function () {
      _this.gameGrid = JSON.parse(JSON.stringify(_this.grid));
    })
  }
})
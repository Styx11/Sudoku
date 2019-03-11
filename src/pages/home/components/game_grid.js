const Mdui = require('mdui/dist/js/mdui.min.js');
import MduiDialog from '@/common/mdui_dialog';
import LSManager from '@/script/localStorage_manager';

export default {
  name: 'GameGrid',
  props: {
    grid: {
      type: Array,
      require: true
    },
    originGrid: {
      type: Array,
      require: true
    },
    disableSolved: {
      type: Boolean,
      require: false
    },
  },
  data () {
    return {
      gameGrid: JSON.parse(JSON.stringify(this.grid)),
      size: this.grid.length,
      // 用于当前选中单元格
      selectedCell: {
        rowIndex: undefined,
        colIndex: undefined,
      },
      // 用于单元格标记
      markGrid: [],
      markClass: {
        1: 'grid-cell-marked',
        2: 'grid-cell-incorrect',
        3: 'grid-cell-selected',
        4: 'grid-cell-same'
      }
    };
  },
  computed: {
    dialogComplete () {
      return new Mdui.Dialog('#complete', {history: false});
    },
    dialogCorrect () {
      return new Mdui.Dialog('#correct', {history: false});
    }
  },
  created () {
    const markGrid = LSManager.getGameState('markGrid');// 游戏中用于标记的九宫格缓存
    const gamingGrid = LSManager.getGameState('gamingGrid');// 游戏中用于填写的九宫格缓存

    if (gamingGrid) this.gameGrid = gamingGrid;
    if (markGrid) return this.markGrid = markGrid;

    // 将数独九宫格与另一个九宫格关联
    // 它记录了单元格是否被标记
    for (let row=0; row<this.size; row++) {
      this.$set(this.markGrid, row, Array.apply(null, {length: this.size}));
    }
  },
  mounted () {
    // 监听数字输入
    this.bus.$on('inputNum', this.handleNum);

    // 监听数字清除
    this.bus.$on('delNum', this.handleNum);

    // 监听数字标记
    this.bus.$on('markTile', this.markNum);

    // 监听重置事件
    this.bus.$on('resetGrid', this.resetGame);

    // 监听查错事件
    this.bus.$on('checkGrid', this.checkGrid);
  },
  beforeDestroy () {
    // 解除事件绑定
    this.bus.$off('delNum');
    this.bus.$off('inputNum');
    this.bus.$off('markTile');
    this.bus.$off('resetGrid');
    this.bus.$off('checkGrid');
  },
  watch: {
    // 当九宫格无变化时禁用查错按钮
    gameGrid: function () {
      const grid = JSON.stringify(this.grid);
      const gameGrid = JSON.stringify(this.gameGrid);
      const disabled = (gameGrid ===  grid);// 禁用查错
      
      this.bus.$emit('checkDisabled', disabled);
    }
  },
  methods: {
    selectTile (rowIndex, colIndex) {
      const gridCell = this.grid[rowIndex][colIndex];
      const gameCell = this.gameGrid[rowIndex][colIndex];

      this.selectedCell = {
        rowIndex,
        colIndex
      };
      this.markSameNum();
      this.$emit('tipsToggle', this.selectedCell);// 选中单元格时，开关提示按钮
      if (!gridCell) this.disableSolvedNum();// 禁用数字量上线的数字

      this.bus.$emit('numDisabled', gridCell);// 当选中原始单元格时禁用数字键盘
      this.bus.$emit('operateDisabled', !gameCell || gridCell);// 选中空/原始单元格时禁用操作键
    },

    // 处理数字输入、删除
    handleNum (value = 0) {
      const row = this.selectedCell.rowIndex;
      const col = this.selectedCell.colIndex;

      if (row === undefined || col === undefined) return;// 未选中任何单元格
      if (this.grid[row][col]) return;// 选中原始单元格

      // 解决Vue无法检测 vm.items[indexOfItem] = newValue 变更的数组
      this.$set(this.gameGrid[row], col, value);
      this.markTile(row, col, 0);// 清除标记
      this.markSameNum();// 标记相同数字
      this.disableSolvedNum();

      this.bus.$emit('operateDisabled', !value);// 启用/禁用操作键

      LSManager.setGameState('gamingGrid', this.gameGrid);// 记录缓存
    },

    // 处理数字数量，当开启时keyboard将其禁用
    disableSolvedNum () {
      const nums = {};
      let num = 0;

      if (!this.disableSolved) return this.bus.$emit('numberSolved', null);

      for (let row=0; row<this.size; row++) {
        for (let col=0; col<this.size; col++) {
          num = this.gameGrid[row][col];
          if (!num) continue;
          nums[num] = nums[num] ? ++nums[num] : 1;
        }
      }
      this.bus.$emit('numberSolved', nums);
    },

    // 数字标记回调
    markNum () {
      const row = this.selectedCell.rowIndex;
      const col = this.selectedCell.colIndex;

      if (row === undefined || col === undefined) return;// 未选中任何单元格
      if (this.grid[row][col]) return;// 不标记原始单元格
      if (!this.gameGrid[row][col]) return;// 不标记空单元格

      const markValue = this.markGrid[row][col] === 1 ? 0 : 1;
      this.markTile(row, col, markValue);
    },

    // 标记相同数字单元格
    markSameNum () {
      const rowIndex = this.selectedCell.rowIndex;
      const colIndex = this.selectedCell.colIndex;
      const selectNum = this.gameGrid[rowIndex][colIndex];
      
      // 标记相同数字
      for (let row=0; row<this.size; row++) {
        for (let col=0; col<this.size; col++) {
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
    markTile (row, col, markValue) {
      this.$set(this.markGrid[row], col, markValue);
      LSManager.setGameState('markGrid', this.markGrid);
    },

    // 对标记单元格应用的样式
    markStyle (row, col) {
      const tile = this.markGrid[row][col];
      if (this.markClass[tile]) return this.markClass[tile];
    },

    // 开始新游戏
    start () {
      this.$emit('start');
    },

    // 重置游戏
    resetGame () {
      this.gameGrid = JSON.parse(JSON.stringify(this.grid));

      // 重置标记九宫格
      for (var row=0; row<this.size; row++) {
        this.$set(this.markGrid, row, Array.apply(undefined, {length: this.size}));
      }

      // 记录缓存
      LSManager.setGameState('gamingGrid', this.gameGrid);
      LSManager.setGameState('markGrid', this.markGrid);
    },
    checkGrid () {
      let answerCorrect = true;
      let gameComplete = true;

      for (let row=0; row<this.size; row++) {
        for (let col=0; col<this.size; col++) {
          if (!this.gameGrid[row][col]) {
            gameComplete = false;
            continue;
          }

          if (this.originGrid[row][col] !== this.gameGrid[row][col]) {
            this.markTile(row, col, 2);
            answerCorrect = false;
          }
        }
      }

      if (gameComplete && answerCorrect) return this.dialogComplete.open();
      if (answerCorrect) return this.dialogCorrect.open();
    },
  },
  render () {
    const gameCell = (row, col, value) => {
      if (value && this.grid[row][col]) {
        return (
          <span>{ value }</span>
        );
      } else if (value && !this.grid[row][col]) {
        return (
          <span class='mdui-text-color-blue-500'>{ value }</span>
        );
      } else {
        return (
          <span class='mdui-text-color-white'></span>
        );
      }
    };
    const gameCol = (rValue, row) => {
      return rValue
        .map((cValue, col) => {
          return (
            <td
              class='grid-cell mdui-ripple'
              {...{class: this.markStyle(row, col)}}
              onClick={this.selectTile.bind(this, row, col)}
            >
              { gameCell(row, col, cValue) }
            </td>
          );
        });
    };
    const gameRow = () => {
      return this.gameGrid
        .map((rValue, row) => {
          return (
            <tr class={`grid-row-${this.size}`}>
              { gameCol(rValue, row) }
            </tr>
          );
        });
    };

    return (
      <div>
        <MduiDialog
          id='correct'
          content='未发现错误'
        />
        <MduiDialog
          id='complete'
          title='恭喜！你已完成该题目'
          content='是否进行新游戏?'
          close={true}
          confirm={this.start.bind(this)}
        />
        <table class='game-grid' cellspacing='0'>
          <tbody>
            { gameRow() }
          </tbody>
        </table>
      </div>
    );
  }
};
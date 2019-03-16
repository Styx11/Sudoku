import LSManager from '@/script/localStorage_manager';

export default {
  name: 'BookMark',
  props: {
    book: { type: Object, required: true },
    index: { type: Number, required: true },
    editMode: { type: Boolean, required: true },
    bookCheck: { default: false }
  },
  data () {
    return {
      levels: {
        0: '简单',
        1: '普通',
        2: '困难'
      }
    };
  },
  computed: {
    gameGrid: function () {
      const gameGrid = JSON.parse(this.book.gameGrid);
      return gameGrid;
    },
    originGrid: function () {
      const originGrid = JSON.parse(this.book.originGrid);
      return originGrid;
    },
    id: function () {
      const id = this.book.id;
      return id;
    },
    size () {
      const size = this.gameGrid.length;
      return size;
    },
    levelStr () {// 返回当前难度对应文字描述
      const row = this.gameGrid[0];
      let nums = 0;
      let level = 0;
      let levelStr = '';

      row.forEach(function (num) {
        if (!num) nums++;
      });

      if (nums === this.size) return '彩蛋';

      level = this.size / nums;
      if (level >= 3 && level <= 4) {
        levelStr = this.levels[0];
      } else if (level >= 1.8 && level <= 2) {
        levelStr = this.levels[1];
      } else if (level >= 1.3 && level <= 1.5) {
        levelStr = this.levels[2];
      }
      return levelStr;
    },
  },
  methods: {
    setGameState () {
      LSManager.clearGameState();
      LSManager.setGameState('originGrid', this.originGrid);
      LSManager.setGameState('gameGrid', this.gameGrid);
      LSManager.setGameState('gameID', this.id);
    },
    goHome () {// 返回游戏首页
      this.$router.push('/');
    },
    bookClick () {
      this.setGameState();
      this.goHome();
    },
    handleCheck () {
      this.$emit('bookChecked', !this.bookCheck, this.index - 1);
    }
  },
  render () {
    const editCheckbox = () => {
      if (this.editMode) {
        return (
          <label class='mdui-checkbox edit-checkbox'>
            <input type="checkbox" checked={this.bookCheck} onChange={this.handleCheck.bind(this)} />
            <i class="mdui-checkbox-icon"></i>
          </label>
        );
      }
    };
    const gridRow = () => {
      return this.gameGrid
        .map((row, rowIndex) => {
          return (
            <tr class={`grid-row-${this.size}`}>
              { gridCol(row, rowIndex) }
            </tr>
          );
        });
    };
    const gridCol = (row, rowIndex) => {
      return row
        .map((col, colIndex) => {
          return (
            <td class='grid-cell'>
              { gridCell(rowIndex, colIndex, col) }
            </td>
          );
        });
    };
    const gridCell = (rowIndex, colIndex, col) => {
      if (col && this.originGrid[rowIndex][colIndex]) {
        return (
          <span>{ col }</span>
        );
      } else {
        return (
          <span class="mdui-text-color-white"></span>
        );
      }
    };
    return (
      <div class='book-mark mdui-ripple'>
        { editCheckbox() }
        <div onClick={this.bookClick.bind(this)}>
          <div class='book-desc' {...{class: {'edit-desc': this.editMode}}}>
            <span class='book-level'>{ this.levelStr }</span>
            <span class='book-index'>#{ this.index }</span>
          </div>
          <span class='book-size'>{ this.size } X { this.size }</span>
          <i class='mdui-icon material-icons book-icon'>&#xe866;</i>
          <table class='book-grid' cellspacing='0'>
            <tbody>
              { gridRow() }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};
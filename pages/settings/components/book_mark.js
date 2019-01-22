Vue.component('book-mark', {
  props: {
    book: { type: Object, required: true },
    index: { type: Number, required: true },
  },
  data: function () {
    return {
      levels: {
        0: '简单',
        1: '普通',
        2: '困难'
      }
    }
  },
  template: '\
    <div class="book-mark mdui-ripple" @click="bookClick">\
      <div class="book-desc">\
        <span class="book-level">{{ levelStr }}</span>\
        <span class="book-index">#{{ index }}</span>\
      </div>\
      <i class="mdui-icon material-icons book-icon">&#xe866;</i>\
      <table class="book-grid" cellspacing="0">\
        <tbody>\
        <tr\
          :class="\'grid-row-\' + size"\
          v-for="(row, rowIndex) in gameGrid"\
        >\
          <td\
            class="grid-cell"\
            v-for="(col, colIndex) in row"\
          >\
            <span v-if="col && originGrid[rowIndex][colIndex]">{{ col }}</span>\
            <span v-else class="mdui-text-color-white"></span>\
          </td>\
        </tr>\
        </tbody>\
      </table>\
    </div>\
  ',
  computed: {
    size: function () {
      var size = this.gameGrid.length;
      return size;
    },
    levelStr: function () {// 返回当前难度对应文字描述
      var row = this.gameGrid[0];
      var nums = 0;
      var level = 0;
      var levelStr = "";

      row.forEach(function (num) {
        if (!num) nums++;
      })

      if (nums === this.size) return "彩蛋";

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
    gameGrid: function () {
      var gameGrid = JSON.parse(this.book.gameGrid);
      return gameGrid;
    },
    originGrid: function () {
      var originGrid = JSON.parse(this.book.originGrid);
      return originGrid;
    },
    id: function () {
      var id = this.book.id;
      return id;
    },
  },
  methods: {
   setGameState: function () {
     localStorageManager.clearGameState();
     localStorageManager.setGameState('originGrid', this.originGrid);
     localStorageManager.setGameState('gameGrid', this.gameGrid);
     localStorageManager.setGameState('gameID', this.id);
   },
   goHome: function () {// 返回游戏首页
     this.$router.push('/');
   },
   bookClick: function () {
     this.setGameState();
     this.goHome();
   },
  }
})
var HomePage = {
  props: ['settings'],
  data: function () {
    return {
      size: 0,
      levels: {
        0: 1/3,
        1: 1/2,
        2: 2/3
      },
      originGrid: [],
      gameGrid: [],
      id: 0,// 游戏id
      answer: 0// 选中单元格答案
    }
  },
  template: '\
  <div class="home">\
    <!-- 新游戏对话框 -->\
    <mdui-dialog\
      id="restart"\
      title="确认开始新游戏?"\
      content="你将丢失当前游戏进度"\
      :close=true\
      :confirm="clear">\
    </mdui-dialog>\
    <!-- 彩蛋游戏对话框 -->\
    <mdui-dialog\
      id="easterEgg"\
      title="开始彩蛋游戏?"\
      content="你将丢失当前游戏进度"\
      :close=true\
      :confirm="startEgg">\
    </mdui-dialog>\
  \
    <mdui-header title="Sudoku" github="https://github.com/Styx11/Sudoku"\
      :timer="settings.timer"\
      @openEgg="openEgg"\
    >\
      <template slot="menu">\
        <button class="mdui-btn mdui-btn-icon mdui-ripple mdui-text-color-white"\
          mdui-tooltip="{content: \'取消收藏\'}"\
          v-if="size && marked" @click="delBook"\
        >\
          <i class="mdui-icon material-icons">bookmark</i>\
        </button>\
        <button class="mdui-btn mdui-btn-icon mdui-ripple mdui-text-color-white"\
          mdui-tooltip="{content: \'添加收藏\'}"\
          v-if="size && !marked" @click="markBook"\
        >\
          <i class="mdui-icon material-icons">bookmark_border</i>\
        </button>\
        <a class="mdui-btn mdui-btn-icon mdui-ripple" mdui-menu="{target: \'#menu\'}">\
            <i class="mdui-icon material-icons mdui-text-color-white">more_vert</i>\
        </a>\
        <ul class="mdui-menu" id="menu">\
          <li v-if="settings.tips && size" class="mdui-menu-item mdui-ripper"\
            :disabled="!answer" @click="showTip">\
            <a class="mdui-ripple">显示该单元</a>\
          </li>\
          <li v-if="size" class="mdui-menu-item mdui-ripper" @click="reset">\
            <a class="mdui-ripple">重置</a>\
          </li>\
          <li v-if="size" class="mdui-menu-item mdui-ripper" mdui-dialog="{target: \'#restart\', history: false}">\
              <a class="mdui-ripple">新游戏</a>\
          </li>\
          <li class="mdui-menu-item mdui-ripper">\
            <router-link to="/help">帮助 & 反馈</router-link>\
          </li>\
          <li class="mdui-menu-item mdui-ripper">\
            <router-link to="/settings">设置</router-link>\
          </li>\
        </ul>\
      </template>\
    </mdui-header>\
  \
    <div class="game">\
      <game-grid\
        v-if="size"\
        :grid="gameGrid"\
        :origin-grid="originGrid"\
        :disableSolved="settings.disableSolved"\
        @start="clear"\
        @tipsToggle="tipsToggle"\
      ></game-grid>\
      <game-selector v-else @start="start($event.size, $event.level)"></game-selector>\
    </div>\
    \
    <game-keyboard\
      :key-range="size"\
      :disableSolved="settings.disableSolved">\
    </game-keyboard>\
  </div>\
  ',
  created: function () {
    var originGrid = localStorageManager.getGameState("originGrid");// 应用本地缓存
    var gameGrid = localStorageManager.getGameState("gameGrid");
    var id = localStorageManager.getGameState("gameID");

    if (!originGrid || !gameGrid || !id) return;
    this.originGrid = originGrid;
    this.gameGrid = gameGrid;
    this.id = id;
    this.size = gameGrid.length;
  },
  computed: {
    marked: function () {// 当前游戏是否被收藏
      var id = this.id;
      return this.$root.books.some(function (item) {
        return (item.id === id);
      })
    }
  },
  methods: {
    createID: function () {// 根据时间创建游戏id
      var id = (new Date()).getTime();
      return id;
    },
    markBook: function () {// 收藏游戏，包括id，终盘，游戏盘
      var book = {
        id: this.id,
        originGrid: JSON.stringify(this.originGrid),
        gameGrid: JSON.stringify(this.gameGrid)
      }
      bus.$emit('markBook', book);
      mdui.snackbar({// 打开底部snackbar
        message: '收藏成功',
        timeout: 3000
      });
    },
    delBook: function () {// 根据id删除收藏
      var id = this.id;
      bus.$emit('delBook', id);
      mdui.snackbar({
        message: '取消收藏',
        timeout: 3000
      });
    },
    tipsToggle: function (e) {
      var row = e.rowIndex;
      var col = e.colIndex;
      var answer = this.originGrid[row][col];
      
      if (this.gameGrid[row][col]) return this.answer = 0;// 当选中原始数字时禁用

      this.answer = answer;
    },
    showTip: function () {
      bus.$emit('inputNum', this.answer);
    },
    setGameState: function () {
      localStorageManager.setGameState("originGrid", this.originGrid);
      localStorageManager.setGameState("gameGrid", this.gameGrid);
      localStorageManager.setGameState("gameID", this.id);
    },
    disableBtn: function () {// 禁用所有按钮
      bus.$emit('numDisabled', true);
      bus.$emit('checkDisabled', true);
      bus.$emit('opreateDisabled', true);
    },
    reset: function () {
      bus.$emit('resetGrid');
    },
    clear: function () {// 结束当前游戏
      if (this.settings.timer) bus.$emit('timerStart', false);
      localStorageManager.clearGameState();// 清除上一次缓存

      this.size = 0;
      this.disableBtn();
    },
    start: function (size, level) {
      this.size = size;// 彩蛋游戏为9x9

      if (this.settings.timer) bus.$emit('timerStart', true);

      var id = this.createID();
      var grid = new Grid(this.size);
      var level = Math.floor(this.size * this.levels[level]);

      this.id = id;
      this.originGrid = grid.cells;
      this.gameGrid = grid.gameGrid(level);
      this.setGameState();// 记录缓存
    },
    startEgg: function () {
      this.size = 9;
      
      if (this.settings.timer) bus.$emit('timerStart', true);// 计时器开关

      var id = this.createID();
      var grid = new Grid(this.size);

      this.id = id;
      this.originGrid = grid.cells;
      this.gameGrid = grid.easterEgg();
      this.setGameState();
    },
    openEgg: function () {
      if (this.size) return;// 在游戏选择界面可以触发彩蛋
      var instEgg = new mdui.Dialog('#easterEgg', {history: false});
      instEgg.open();
    }
  }
}
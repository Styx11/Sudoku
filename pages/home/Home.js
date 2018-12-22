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
      :confirm="start">\
    </mdui-dialog>\
  \
    <mdui-header title="Sudoku" github="https://github.com/Styx11/Sudoku" :timer="settings.timer">\
      <template slot="menu">\
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
        @start="start"\
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
    // 应用本地缓存
    var originGrid = localStorageManager.getGameState("originGrid");
    var gameGrid = localStorageManager.getGameState("gameGrid");

    if (!originGrid || !gameGrid) return;
    this.originGrid = originGrid;
    this.gameGrid = gameGrid;
    this.size = gameGrid.length;
  },
  methods: {
    tipsToggle: function (e) {
      var row = e.rowIndex;
      var col = e.colIndex;
      var answer = this.originGrid[row][col];
      
      // 当选中原始数字时禁用
      if (this.gameGrid[row][col]) return this.answer = 0;

      this.answer = answer;
    },
    showTip: function () {
      bus.$emit('inputNum', this.answer);
    },
    reset: function () {
      bus.$emit('resetGrid');
    },
    start: function (size, level) {
      localStorageManager.clearGameState();// 清除上一次缓存

      this.size = this.size ? 0 : size;

      // 计时器开关
      if (this.settings.timer) {
        bus.$emit('timerStart', this.size);
      }

      if (!this.size) {
        // 禁用所有按钮
        bus.$emit('numDisabled', true);
        bus.$emit('opreateDisabled', true);
        bus.$emit('checkDisabled', true);
        return;// 将每次均执行改为开关，解决组件缓存
      }

      var grid = new Grid(this.size);
      var level = Math.floor(this.size * this.levels[level]);

      this.originGrid = grid.cells;
      this.gameGrid = grid.gameGrid(level);

      // 记录缓存
      localStorageManager.setGameState("originGrid", this.originGrid);
      localStorageManager.setGameState("gameGrid", this.gameGrid);
    }
  }
}
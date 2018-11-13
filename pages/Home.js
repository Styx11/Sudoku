Vue.component("home-page", {
  data: function () {
    return {
      size: 0,
      levels: {
        0: 1/3,
        1: 1/2,
        2: 2/3
      },
      originGrid: [],
      gameGrid: []
    }
  },
  template: '\
  <div>\
    <!-- 新游戏对话框 -->\
    <div class="mdui-dialog" id="restart">\
      <div class="mdui-dialog-title">确认开始新游戏?</div>\
      <div class="mdui-dialog-content">你将丢失当前游戏进度</div>\
      <div class="mdui-dialog-actions">\
        <button class="mdui-btn mdui-ripple" mdui-dialog-close>取消</button>\
        <button class="mdui-btn mdui-ripple" @click="start(9, 2)" mdui-dialog-confirm>确定</button>\
      </div>\
    </div>\
    <!-- 游戏完成提示对话框 -->\
    <div class="mdui-dialog" id="complete">\
      <div class="mdui-dialog-title">恭喜！你已完成该题目</div>\
      <div class="mdui-dialog-content">是否进行新游戏?</div>\
      <div class="mdui-dialog-actions">\
        <button class="mdui-btn mdui-ripple" mdui-dialog-close>取消</button>\
        <button class="mdui-btn mdui-ripple" @click="start(9, 2)" mdui-dialog-confirm>确定</button>\
      </div>\
    </div>\
  \
    <mdui-header :title="\'Sudoku\'" :github="\'https://github.com/Styx11/Sudoku\'">\
      <template slot="menu">\
        <a class="mdui-btn mdui-btn-icon mdui-ripple" mdui-menu="{target: \'#menu\'}">\
            <i class="mdui-icon material-icons mdui-text-color-white">more_vert</i>\
        </a>\
        <ul class="mdui-menu" id="menu">\
          <li v-if="size" class="mdui-menu-item mdui-ripper" mdui-dialog="{target: \'#restart\'}">\
              <a class="mdui-ripple">新游戏</a>\
          </li>\
          <li v-if="size" class="mdui-menu-item mdui-ripper" @click="reset">\
            <a class="mdui-ripple">重置</a>\
          </li>\
          <li class="mdui-menu-item mdui-ripper">\
            <a href="javascript:;">Help & feedback</a>\
          </li>\
          <li class="mdui-menu-item mdui-ripper">\
            <a>Settings</a>\
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
      ></game-grid>\
      <button\
        v-else\
        class="selector-btn mdui-shadow-2 mdui-ripple mdui-color-light-blue mdui-text-color-white"\
        mdui-dialog="{target: \'#selector\'}">选择游戏</button>\
    </div>\
    <game-selector @start="start($event.size, $event.level)"></game-selector>\
  \
    <game-keyboard :key-range="size"></game-keyboard>\
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
    reset: function () {
      bus.$emit('resetGrid');
    },
    start: function (size, level) {
      localStorageManager.clearGameState();// 清除上一次缓存

      this.size = this.size ? 0 : size;

      if (!this.size) {
        // 禁用所有按钮
        bus.$emit('keyboardToggle', true);
        bus.$emit('checkBtnDisabled', true);
        bus.$emit('gameComplete', false);

        // 将每次均执行改为开关，解决组件缓存
        return;
      }

      var grid = new Grid(this.size);
      var level = Math.floor(this.size * this.levels[level]);

      this.originGrid = grid.cells;
      this.gameGrid = grid.gameCells(level);

      // 记录缓存
      localStorageManager.setGameState("originGrid", this.originGrid);
      localStorageManager.setGameState("gameGrid", this.gameGrid);
    }
  }
})
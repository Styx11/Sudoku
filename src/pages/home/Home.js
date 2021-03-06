import { mapActions, mapGetters, mapState } from 'vuex';
import Mdui from 'mdui/dist/js/mdui.min.js';
import Grid from '@/script/grid.js';
import LSManager from '@/script/localStorage_manager.js';
import MduiDialog from '@/common/mdui_dialog.js';
import MduiHeader from '@/common/mdui_header.js';
import GameKeyboard from './components/game_keyboard';
import GameGrid from './components/game_grid';
import GameSelector from './components/game_selector';

export default {
  name: 'HomePage',
  components: {
    MduiDialog,
    MduiHeader,
    GameGrid,
    GameKeyboard,
    GameSelector,
  },
  data () {
    return {
      levels: {
        0: 1/3,
        1: 1/2,
        2: 2/3
      },
      answer: 0,// 选中单元格答案
    };
  },
  computed: {
    marked () {
      const id = this.id;
      if (this.books) {
        return this.books.some(item => item.id === id);
      }
    },
    ...mapState({
      originGrid: state => state.gameStore.originGrid,
      gameGrid: state => state.gameStore.gameGrid,
      settings: state => state.settings,
      id: state => state.gameStore.id,
      books: state => state.books,
    }),
    ...mapGetters([
      'size'
    ])
  },
  created () {
    const originGrid = LSManager.getGameState('originGrid');// 应用本地缓存
    const gameGrid = LSManager.getGameState('gameGrid');
    const id = LSManager.getGameState('gameID');

    if (!originGrid || !gameGrid || !id) return;
    this.initializeOriginGrid(originGrid);
    this.initializeGameGrid(gameGrid);
    this.initializeGameID(id);
  },
  methods: {
    ...mapActions([// 提交更改
      'markBook',
      'delBook',
      'createID',
      'toggleTimer',
      'initializeOriginGrid',
      'initializeGameGrid',
      'initializeGameID',
      'setGrids',
      'clearGame',
      'disableNum',
      'disableCheck',
      'disableOperate',
    ]),
    markTheBook () {// 收藏游戏，包括id，终盘，游戏盘
      const book = {
        id: this.id,
        originGrid: JSON.stringify(this.originGrid),
        gameGrid: JSON.stringify(this.gameGrid),
      };
      this.markBook(book);
      Mdui.snackbar('收藏成功');// 打开底部snackbar
    },
    delTheBook () {// 根据id删除收藏
      const id = this.id;
      this.delBook(id);
      Mdui.snackbar('取消收藏');
    },
    tipsToggle (e) {
      const row = e.rowIndex;
      const col = e.colIndex;
      const answer = this.originGrid[row][col];

      // 当选中原始数字时禁用
      if (this.gameGrid[row][col]) return this.answer = 0;
      this.answer = answer;
    },
    showTip () {
      this.bus.$emit('inputNum', this.answer);
    },
    setGameState () {
      LSManager.setGameState('originGrid', this.originGrid);
      LSManager.setGameState('gameGrid', this.gameGrid);
      LSManager.setGameState('gameID', this.id);
    },
    disableBtn () {// 禁用所有按钮
      this.disableNum(true);
      this.disableCheck(true);
      this.disableOperate(true);
    },
    reset () {
      this.bus.$emit('resetGrid');
      this.disableBtn();
    },
    clear () {// 结束当前游戏
      if (this.settings.timer) this.toggleTimer(false);
      
      this.clearGame();
      this.disableBtn();
      LSManager.clearGameState();// 清除上一次缓存
    },
    start ({level, size = 9} = {}) {// 彩蛋游戏为9x9
      if (this.settings.timer) this.toggleTimer(true);

      let gameLevel = level !== undefined
        ? Math.ceil(size * this.levels[level])
        : 0;
      if (size === 4 ) gameLevel = Math.floor((size + 1) * this.levels[level]);

      const grid = new Grid(size);
      const originGrid = grid.cells;
      const gameGrid = gameLevel// 选择开启普通或彩蛋游戏
        ? grid.gameGrid(gameLevel)
        : grid.easterEgg();

      this.createID();
      this.setGrids({ originGrid, gameGrid });
      this.setGameState();// 记录缓存
    },
    openEgg () {
      if (this.size) return;// 在游戏选择界面可以触发彩蛋
      const eggDialog = new Mdui.Dialog('#easterEgg', {history: false});
      eggDialog.open();
    }
  },
  render () {
    const bookBtn = () => {
      if (this.size && this.marked) {
        return (
          <button
            class='mdui-btn mdui-btn-icon mdui-ripple mdui-text-color-white'
            mdui-tooltip='{content: "取消收藏"}'
            onClick={this.delTheBook.bind(this)}
          >
            <i class='mdui-icon material-icons'>bookmark</i>
          </button>
        );
      } else if (this.size && !this.marked) {
        return (
          <button
            class='mdui-btn mdui-btn-icon mdui-ripple mdui-text-color-white'
            mdui-tooltip='{content: "添加收藏"}'
            onClick={this.markTheBook.bind(this)}
          >
            <i class='mdui-icon material-icons'>bookmark_border</i>
          </button>
        );
      }
    };
    const tipBtn = () => {
      if (this.settings.tips && this.size) {
        return (
          <li
            class='mdui-menu-item mdui-ripper'
            disabled={!this.answer}
            onClick={this.showTip.bind(this)}
          >
            <a class='mdui-ripple'>显示该单元</a>
          </li>
        );
      }
    };
    const resetBtn = () => {
      if (this.size) {
        return (
          <li
            class='mdui-menu-item mdui-ripper'
            onClick={this.reset.bind(this)}
          >
            <a class='mdui-ripple'>重置</a>
          </li>
        );
      }
    };
    const newGameBtn = () => {
      if (this.size) {
        return (
          <li
            class='mdui-menu-item mdui-ripper'
            mdui-dialog='{target: "#restart", history: false}'
          >
            <a class='mdui-ripple'>新游戏</a>
          </li>
        );
      }
    };
    const gameSection = () => {
      if (this.size) {
        return (
          <GameGrid
            onStart={this.clear.bind(this)}
            onTipsToggle={this.tipsToggle.bind(this)}
          />
        );
      } else {
        return (
          <GameSelector
            onStart={this.start.bind(this)}
          />
        );
      }
    };

    return (
      <div class='home'>
        <MduiDialog
          id='restart'
          title='确认开始游戏?'
          content='你将丢失当前游戏进度'
          close={true}
          confirm={this.clear.bind(this)}
        />
        <MduiDialog
          id='easterEgg'
          title='开始彩蛋游戏?'
          content='你将丢失当前游戏进度'
          close={true}
          confirm={this.start.bind(this)}
        />
        <MduiHeader
          title='Sudoku'
          github='https://github.com/Styx11/Sudoku'
          timer={this.settings.timer}
          onOpenEgg={this.openEgg.bind(this)}
        >
          <template slot='menu'>
            { bookBtn() }
            <a class='mdui-btn mdui-btn-icon mdui-ripple' mdui-menu='{target: "#menu"}'>
                <i class='mdui-icon material-icons mdui-text-color-white'>more_vert</i>
            </a>
            <ul class='mdui-menu' id='menu'>
              { tipBtn() }
              { resetBtn() }
              { newGameBtn() }
              <li class='mdui-menu-item mdui-ripper'>
                <router-link to='/help'>帮助 & 反馈</router-link>
              </li>
              <li class='mdui-menu-item mdui-ripper'>
                <router-link to='/settings'>设置</router-link>
              </li>
            </ul>
          </template>
        </MduiHeader>

        <div class='game'>
          { gameSection() }
        </div>
        <GameKeyboard
          keyRange={this.size}
          disableSolved={this.settings.disableSolved}
        />
      </div>
    );
  }
};
const Mdui = require('mdui/dist/js/mdui.min.js');

export default {
  name: 'GameSelector',
  data () {
    return {
      size: 0,
      level: 1,
    };
  },
  computed: {
    gameData () {
      return {
        size: this.size,
        level: this.level
      };
    }
  },
  mounted () {
    const tab = new Mdui.Tab('#selector-tabs');
    this.$refs['selector'].addEventListener('open.mdui.dialog', () => tab.handleUpdate());
  },
  methods: {
    selectSize (size) {
      this.size = size;
    },
    selectLevel (level) {
      this.level = level;
    },
    start () {
      this.$emit('start', this.gameData);
    }
  },
  render () {
    // tab 导航
    const tabTitle = () => {
      return (
        <div class='mdui-tab mdui-tab-full-width' id='selector-tabs' mdui-tab>
          <a href='#tab-1' class='mdui-ripple' onClick={this.selectLevel.bind(this, 0)}>简单</a>
          <a href='#tab-2' class='mdui-ripple mdui-tab-active' onClick={this.selectLevel.bind(this, 1)}>普通</a>
          <a href='#tab-3' class='mdui-ripple' onClick={this.selectLevel.bind(this, 2)}>困难</a>
        </div>
      );
    };
    // tab 内容
    const tabContent = () => {
      return [1, 2, 3]
        .map(item => {
          return (
            <div id={`tab-${item}`} class='mdui-p-a-1'>
              <label class='mdui-radio mdui-center'>
                <input type='radio' name='group1' onClick={this.selectSize.bind(this, 4)} />
                <i class='mdui-radio-icon'></i>
                4 X 4
              </label>
              <label class='mdui-radio mdui-center'>
                <input type='radio' name='group1' onClick={this.selectSize.bind(this, 6)} />
                <i class='mdui-radio-icon'></i>
                6 X 6
              </label>
              <label class='mdui-radio mdui-center'>
                <input type='radio' name='group1' onClick={this.selectSize.bind(this, 9)} />
                <i class='mdui-radio-icon'></i>
                9 X 9
              </label>
            </div>
          );
        });
    };
    // 对话框确认按钮
    const confirmBtn = () => {
      if (this.size) {
        return (
          <button
            class='mdui-btn mdui-ripple'
            onClick={this.start.bind(this)}
            mdui-dialog-confirm
          >确定</button>
        );
      } else {
        return (
          <button
            class='mdui-btn mdui-ripple'
            disabled
            mdui-dialog-confirm
          >确定</button>
        );
      }
    };
    return (
      <div>
        <button
          class='selector-btn mdui-shadow-2 mdui-ripple mdui-color-light-blue mdui-text-color-white'
          mdui-dialog='{target: "#selector", history: false}'
        >选择游戏</button>
        <div class='mdui-dialog' id='selector' ref='selector'>
          {tabTitle()}
          {tabContent()}
          <div class='mdui-dialog-actions'>
            <button class='mdui-btn mdui-ripple' mdui-dialog-close>取消</button>
            {confirmBtn()}
          </div>
        </div>
      </div>
    );
  }
};
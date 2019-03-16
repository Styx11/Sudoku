const Mdui = require('mdui/dist/js/mdui.min.js');

export default {
  name: 'FabDial',
  data () {
    return {
      edit: false,
      instFab: null,
    };
  },
  mounted () {
    const fabBtn = document.getElementById('mainFab');
    
    this.instFab = new Mdui.Fab('#mainFab', {trigger: 'click'});
    fabBtn.addEventListener('close.mdui.fab', () => {
      if (this.edit) {// 确保点击书签checkbox时不会自动关闭
        this.instFab.open();
      }
    });
  },
  methods: {
    fabClick () {// 进入编辑模式
      this.edit = !this.edit;
      this.$emit('enterEditMode', this.edit);
    },
    delClick () {
      this.$emit('delBooks');
    },
    allClick () {
      this.$emit('selectAll');
    },
  },
  watch: {
    edit () {// 根据状态唯一确定关闭开启状态
      this.edit
        ? this.instFab.open()
        : this.instFab.close();
    }
  },
  render () {
    return (
      <div class='fab-dial'>
        <div class='mdui-fab-wrapper mdui-fab-fixed' id='mainFab'>
          <button class="mdui-fab mdui-ripple mdui-color-theme-accent" onClick={this.fabClick.bind(this)}>
            <i class="mdui-icon material-icons">add</i>
            <i class="mdui-icon mdui-fab-opened material-icons">build</i>
          </button>
          <div class="mdui-fab-dial">
            <button class="mdui-fab mdui-fab-mini mdui-ripple mdui-color-pink" onClick={this.delClick.bind(this)}><i class="mdui-icon material-icons">&#xe872;</i></button>
            <button class="mdui-fab mdui-fab-mini mdui-ripple mdui-color-red" onClick={this.allClick.bind(this)}><i class="mdui-icon material-icons">&#xe877;</i></button>
          </div>
        </div>
      </div>
    );
  }
};
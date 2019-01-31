Vue.component('fab-dial', {
  data: function () {
    return {
      edit: false,
      instFab: null,
    }
  },
  template: '\
    <div class="fab-dial">\
      <div class="mdui-fab-wrapper mdui-fab-fixed" id="mainFab">\
        <button class="mdui-fab mdui-ripple mdui-color-theme-accent" @click="fabClick">\
          <i class="mdui-icon material-icons">add</i>\
          <i class="mdui-icon mdui-fab-opened material-icons">build</i>\
        </button>\
        <div class="mdui-fab-dial">\
          <button class="mdui-fab mdui-fab-mini mdui-ripple mdui-color-pink" @click="delClick"><i class="mdui-icon material-icons">&#xe872;</i></button>\
          <button class="mdui-fab mdui-fab-mini mdui-ripple mdui-color-red" @click="allClick"><i class="mdui-icon material-icons">&#xe877;</i></button>\
        </div>\
      </div>\
    </div>\
  ',
  mounted: function () {
    var _this = this;
    var fabBtn = document.getElementById('mainFab');

    this.instFab = new mdui.Fab('#mainFab', {trigger: 'click'});
    fabBtn.addEventListener('close.mdui.fab', function () {
      if (_this.edit) {// 确保点击书签checkbox时不会自动关闭
        _this.instFab.open();
      }
    });
  },
  methods: {
    fabClick: function () {// 进入编辑模式
      this.edit = !this.edit;
      this.$emit('enterEditMode', this.edit);
    },
    delClick: function () {
      this.$emit('delBooks');
    },
    allClick: function () {
      this.$emit('selectAll');
    },
  },
  watch: {
    edit: function () {// 根据状态唯一确定关闭开启状态
      this.edit
        ? this.instFab.open()
        : this.instFab.close();
    }
  }
})
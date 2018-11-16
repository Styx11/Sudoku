Vue.component("HelpHow", {
  template: '\
  <div class="help-how">\
    <mdui-header :title="\'怎么玩\'">\
      <template slot="drawer">\
        <a class="mdui-btn mdui-btn-icon mdui-ripple mdui-text-color-white" @click="go(\'HelpPage\')">\
          <i class="mdui-icon material-icons">&#xe5c4;</i>\
        </a>\
      </template>\
    </mdui-header>\
    <div class="mdui-typo-display-1 mdui-m-a-3 mdui-text-left">通过无重复地填写数字完成谜题...</div>\
    <div class="mdui-typo-display-1 mdui-m-a-5 mdui-text-center">每一行</div>\
    <div class="mdui-m-a-3">\
      <img class="help-img-row mdui-center" src="https://s1.ax1x.com/2018/11/15/iv04v6.png" alt="iv04v6.png" border="0"/>\
    </div>\
    <div class="mdui-m-a-3">\
      <img class="help-img-row mdui-center" src="https://s1.ax1x.com/2018/11/15/ivd7QK.png" alt="ivd7QK.png" border="0" style="transform:scale(0.9)"/>\
    </div>\
    <div class="mdui-m-a-3">\
      <img class="help-img-row mdui-center" src="https://s1.ax1x.com/2018/11/15/ivB3GR.png" alt="ivB3GR.png" border="0" style="transform:scale(0.7)"/>\
    </div>\
    <div class="mdui-typo-display-1 mdui-m-a-3 mdui-text-center">每一列</div>\
    <span class="mdui-center mdui-clearfix mdui-p-l-5 img-col-container">\
      <img class="help-img-col mdui-float-left mdui-m-a-3" src="https://s1.ax1x.com/2018/11/15/ivJA8U.png" alt="ivJA8U.png" border="0"/>\
      <img class="help-img-col mdui-float-left mdui-m-a-3" src="https://s1.ax1x.com/2018/11/15/ivr1jx.png" alt="ivr1jx.png" border="0"/>\
      <img class="help-img-col mdui-float-left mdui-m-a-3" src="https://s1.ax1x.com/2018/11/15/ivrlg1.png" alt="ivrlg1.png" border="0"/>\
    </span>\
    <div class="mdui-typo-display-1 mdui-m-a-3 mdui-text-center">和每一宫</div>\
    <div class="mdui-m-a-2">\
      <img class="help-img-box mdui-center" src="https://s1.ax1x.com/2018/11/15/ivseMt.png" alt="ivseMt.png" border="0" style="transform:scale(0.7)"/>\
    </div>\
    <div class="mdui-m-a-2">\
      <img class="help-img-box mdui-center" src="https://s1.ax1x.com/2018/11/15/ivsmsP.png" alt="ivsmsP.png" border="0" style="transform:scale(0.7)"/>\
    </div>\
    <div class="mdui-m-a-2">\
      <img class="help-img-box mdui-center" src="https://s1.ax1x.com/2018/11/15/ivsnqf.png" alt="ivsnqf.png" border="0" style="transform:scale(0.7)"/>\
    </div>\
    <div class="mdui-text-color-light-blue mdui-typo-display-2 mdui-m-a-3 mdui-text-center">尽情游戏吧!</div>\
    <div class="mdui-m-a-2">\
      <img class="help-img-box mdui-center" src="https://s1.ax1x.com/2018/11/15/ivypSs.png" alt="ivypSs.png" border="0" style="transform:scale(1)"/>\
    </div>\
  </div>\
  ',
  methods: {
    go: function (path) {
      bus.$emit("go", path);
    }
  }
})
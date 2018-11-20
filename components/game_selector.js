Vue.component('game-selector', {
  data: function () {
    return {
      size: 0,
      level: 1
    }
  },
  template: '\
    <div>\
      <button\
        class="selector-btn mdui-shadow-2 mdui-ripple mdui-color-light-blue mdui-text-color-white"\
        mdui-dialog="{target: \'#selector\'}"\
      >选择游戏</button>\
      <div class="mdui-dialog" id="selector">\
        <div class="mdui-tab mdui-tab-full-width" id="selector-tabs" mdui-tab>\
          <a href="#tab-1" class="mdui-ripple" @click="selectLevel(0)">简单</a>\
          <a href="#tab-2" class="mdui-ripple mdui-tab-active" @click="selectLevel(1)">普通</a>\
          <a href="#tab-3" class="mdui-ripple" @click="selectLevel(2)">困难</a>\
        </div>\
        <div v-for="n in 3" :id="\'tab-\' + n" class="mdui-p-a-1">\
          <label class="mdui-radio mdui-center">\
            <input type="radio" name="group1" @click="selectSize(4)"/>\
            <i class="mdui-radio-icon"></i>\
            4 X 4\
          </label>\
          <label class="mdui-radio mdui-center">\
            <input type="radio" name="group1" @click="selectSize(6)"/>\
            <i class="mdui-radio-icon"></i>\
            6 X 6\
          </label>\
          <label class="mdui-radio mdui-center">\
            <input type="radio" name="group1" @click="selectSize(9)"/>\
            <i class="mdui-radio-icon"></i>\
            9 X 9\
          </label>\
        </div>\
        <div class="mdui-dialog-actions">\
          <button class="mdui-btn mdui-ripple" mdui-dialog-close>取消</button>\
          <button class="mdui-btn mdui-ripple"\
          v-if="size"\
          @click="start" mdui-dialog-confirm>确定</button>\
          <button class="mdui-btn mdui-ripple" v-else disabled mdui-dialog-confirm>确定</button>\
        </div>\
      </div>\
    </div>\
  ',
  computed: {
    gameData: function () {
      return {
        size: this.size,
        level: this.level
      }
    }
  },
  methods: {
    selectSize: function (size) {
      this.size = size;
    },
    selectLevel: function (level) {
      this.level = level;
    },
    start: function () {
      this.$emit("start", this.gameData);
    }
  },
  mounted: function () {
    var instTab = new mdui.Tab("#selector-tabs");
    instTab.handleUpdate();
  }
})
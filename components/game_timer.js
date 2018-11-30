Vue.component('game-timer', {
  data: function () {
    return {
      minute: 0,
      second: 0,
      timer: undefined
    }
  },
  template: '\
    <div class="game-timer">\
      <span class="game-timer-tick">{{minute}}:{{ second < 10 ? "0" + second : second }}</span>\
    </div>\
  ',
  created: function () {
    var timerState = localStorageManager.getGameState('timer');

    if (!timerState) return;

    this.second = timerState.second || 0;
    this.minute = timerState.minute || 0;
    this.timer  = undefined;

    this.start();
  },
  mounted: function () {
    bus.$on('timerStart', this.timerStart);
  },
  beforeDestroy: function () {
    this.pause();
  },
  methods: {
    start: function () {
      var _this = this;

      if (this.timer) return;

      this.timer = setInterval(function () {
        _this.second = (++_this.second) % 60;// 60秒取模
        if (!(_this.second % 60)) {
          _this.minute++;// 分钟进位
        }
        localStorageManager.setGameState("timer", {minute: _this.minute, second: _this.second});
      }, 1000)
    },
    pause: function () {
      clearInterval(this.timer);
    },
    clear: function () {
      this.minute = 0;
      this.second = 0;
      this.timer = undefined;
    },
    timerStart: function (start) {
      if (!start) {
        this.pause();
        this.clear();
        return;
      }
      this.start();
    }
  }
})
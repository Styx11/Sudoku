import LSManager from '../script/localStorage_manager';
import { mapState } from 'vuex';

export default {
  name: 'GameTimer',
  data() {
    return {
      minute: 0,
      second: 0,
      timer: null,
    };
  },
  computed: {
    ...mapState({
      startTimer: state => state.gameStore.timerStart,
    })
  },
  render() {
    const minute = this.minute;
    const second = this.second;
    const time = `${minute}:${second < 10 ? `0${second}` : second}`;
    return (
      <div class='game-timer'>
        <span class='game-timer-tick'>{ time }</span>
      </div>
    );
  },
  created() {
    const gameExist = LSManager.getGameState('gameGrid');
    const timerState = LSManager.getGameState('timer');

    // 若游戏存在则自动开始
    if (!gameExist) return;

    this.second = timerState ? timerState.second : 0;
    this.minute = timerState ? timerState.minute : 0;
    this.timer = null;
    this.$store.dispatch('toggleTimer', true);// timerStart 未在本地保存，所以此处将其设为 true
  },
  beforeDestroy() {
    this.pause();
    this.$store.dispatch('toggleTimer', false);
  },
  watch: {
    startTimer () {// 监测是否开启计时器
      this.timerStart(this.startTimer);
    }
  },
  methods: {
    start() {
      if (this.timer) return;

      this.timer = setInterval(() => {
        this.second = (++this.second) % 60;// 60秒取模
        if (!(this.second % 60)) {
          this.minute++;// 分钟进位
        }
        LSManager.setGameState('timer', {minute: this.minute, second: this.second});
      }, 1000);
    },
    stop() {
      this.pause();
      this.clear();
    },
    pause() {
      clearInterval(this.timer);
    },
    clear() {
      this.minute = 0;
      this.second = 0;
      this.timer = null;
      LSManager.setGameState('timer', {minute: 0, second: 0});
    },
    timerStart(start) {
      if (start) {
        this.start();
      } else {
        this.stop();
      }
    }
  }
};
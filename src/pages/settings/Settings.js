export default {
  name: 'SettingsPage',
  props: {
    slideName: String,
    settings: Object,
  },
  data () {
    return {
      settingsRoute: ''
    };
  },
  computed: {
    settingsRouteClass () {
      return {
        'settingsRoute': this.settingsRoute === '/settings'// 当切换至home页时，增加overflow，解决header抖动
      };
    }
  },
  created () {
    this.settingsRoute = this.$router.history.current.path;// 获取当前路由路径
  },
  watch: {
    '$route' () {// 监听路由
      this.settingsRoute = this.$router.history.current.path;
    }
  },
  render () {
    return (
      <div class='settings' {...{class: this.settingsRouteClass}}>
        <transition enter-active-class={this.slideName}>
          <router-view settings={this.settings}></router-view>
        </transition>
      </div>
    );
  }
};
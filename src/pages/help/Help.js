export default {
  name: 'HelpPage',
  props: {
    slideName: String,
  },
  data () {
    return {
      helpRoute: ''
    };
  },
  computed: {
    helpRouteClass () {
      return {
        'helpRoute': this.helpRoute === '/help'// 当切换至help-home页时，增加overflow，解决header抖动
      };
    }
  },
  created () {
    this.helpRoute = this.$router.history.current.path;// 获取当前路由路径    
  },
  watch: {
    '$route' () {// 监听路由
      this.helpRoute = this.$router.history.current.path;
    }
  },
  render () {
    return (
      <div class='help' {...{class: this.helpRouteClass}}>
        <transition enter-active-class={this.slideName}>
          <router-view/>
        </transition>
      </div>
    );
  }
};
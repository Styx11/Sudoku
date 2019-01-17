var Settings = {
  props: ['slideName', 'settings'],
  data: function () {
    return {
      settingsRoute: ''
    }
  },
  template: '\
  <div class="settings" :class="settingsRouteClass">\
    <transition :enter-active-class="slideName">\
      <router-view :settings="settings"></router-view>\
    </transition>\
  </div>',
  created: function () {
    this.settingsRoute = this.$router.history.current.path;// 获取当前路由路径
  },
  watch: {
    '$route': function () {// 监听路由
      this.settingsRoute = this.$router.history.current.path;
    }
  },
  computed: {
    settingsRouteClass: function () {
      return {
        'settingsRoute': this.settingsRoute === '/settings'// 当切换至home页时，增加overflow，解决header抖动
      }
    }
  }
}
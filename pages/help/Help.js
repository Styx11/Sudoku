var Help = {
  props: ['slideName'],
  data: function () {
    return {
      helpRoute: ''
    }
  },
  template: '\
  <div class="help" :class="helpRouteClass">\
    <transition :enter-active-class="slideName">\
      <router-view></router-view>\
    </transition>\
  </div>',
  created: function () {
    this.helpRoute = this.$router.history.current.path;// 获取当前路由路径
  },
  watch: {
    '$route': function () {// 监听路由
      this.helpRoute = this.$router.history.current.path;
    }
  },
  computed: {
    helpRouteClass: function () {
      return {
        'helpRoute': this.helpRoute === '/help'// 当切换至help-home页时，增加overflow，解决header抖动
      }
    }
  }
}
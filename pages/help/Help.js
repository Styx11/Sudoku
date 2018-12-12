var Help = {
  data: function () {
    return {
      helpRoute: ''
    }
  },
  template: '\
  <div class="help" :class="helpRouteClass">\
      <router-view></router-view>\
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
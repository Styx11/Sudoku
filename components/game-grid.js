Vue.component('game-grid', {
  props:[
    'cellsize',
    'grid'
  ],
  data: function () {
    return {
      gameGrid: this.grid
    }
  },
  template: '\
    <table class="game-grid mdui-container-fluid">\
      <tbody>\
      <tr\
        class="grid-row mdui-btn-group"\
        :class="cellsize"\
        v-for="row in gameGrid"\
      >\
        <td\
          class="grid-cell mdui-col mdui-btn mdui-btn-icon mdui-ripple"\
          v-for="item in row"\
        >\
          <span v-if="item">{{ item }}</span>\
          <span v-else class="mdui-text-color-white">?</span>\
        </td>\
      </tr>\
      </tbody>\
    </table>\
  '
})
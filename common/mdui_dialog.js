Vue.component("mdui-dialog", {
  props: {
    id: {
      type: String,
      require: true
    },
    close: {
      type: Boolean
    },
    confirm: {
      type: Function
    },
    title: {
      type: String
    },
    content: {
      type: String
    }
  },
  template: '\
  <div class="mdui-dialog" :id="id">\
    <div v-if="title" class="mdui-dialog-title">{{ title }}</div>\
    <div v-if="content" class="mdui-dialog-content">{{ content }}</div>\
    <div class="mdui-dialog-actions">\
      <button v-if="close" class="mdui-btn mdui-ripple" mdui-dialog-close>取消</button>\
      <button v-if="confirm" class="mdui-btn mdui-ripple" @click="confirm" mdui-dialog-confirm>确定</button>\
      <button v-else class="mdui-btn mdui-ripple" mdui-dialog-confirm>确定</button>\
    </div>\
  </div>\
  '
})
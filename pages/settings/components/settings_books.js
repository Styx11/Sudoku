var SettingsBooks = {
  data: function () {
    return {
      books: [],
    }
  },
  template: '\
    <div class="settings-books">\
      <mdui-header title="书签">\
        <template slot="drawer">\
          <a class="mdui-btn mdui-btn-icon mdui-ripple mdui-text-color-white" @click="goBack">\
            <i class="mdui-icon material-icons">&#xe5c4;</i>\
          </a>\
        </template>\
      </mdui-header>\
    </div>\
  ',
  created: function () {
    var books = this.$root.books;
    this.books = books;
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
  }
}
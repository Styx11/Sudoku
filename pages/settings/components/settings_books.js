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
      <div v-if="books.length" v-for="(book, index) in books">\
        <book-mark :key="book.id" :book="book" :index="index + 1"></book-mark>\
      </div>\
      <p v-if="!books.length" class="book-message">目前未有收藏</p>\
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
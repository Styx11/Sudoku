var SettingsBooks = {
  data: function () {
    return {
      books: [],
      bookChecks: [],
      edit: false,
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
        <book-mark\
          :key="book.id"\
          :book="book"\
          :index="index + 1"\
          :editMode="edit"\
          :bookCheck="bookChecks[index]"\
          @bookChecked="handleBookCheck"\
        ></book-mark>\
      </div>\
      <p v-if="!books.length" class="book-message">目前未有收藏</p>\
    </div>\
  ',
  created: function () {
    var books = this.$root.books;
    var bookSize = books.length;
    var bookChecks = this.bookChecks;

    this.books = books;
    for (var i=0; i<bookSize; i++) {
      bookChecks[i] = false;
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    handleBookCheck: function (check, index) {// 书签选中状态由父组件控制，绑定到子组件
      this.$set(this.bookChecks, index, check);// 子组件触发事件修改值，利于全选、删除功能的开发
    },
  }
}
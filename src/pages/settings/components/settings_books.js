import FabDial from './fab_dial';
import BookMark from './book_mark';
import MduiHeader from '@/common/mdui_header';
const Mdui = require('mdui/dist/js/mdui.min.js');

export default {
  name: 'SettingsBooks',
  components: {
    FabDial,
    BookMark,
    MduiHeader,
  },
  data () {
    return {
      books: [],
      bookChecks: [],
      edit: false,
    };
  },
  created () {
    const books = this.$root.books;
    const bookSize = books.length;
    
    this.books = books;
    for (let i=0; i<bookSize; i++) {
      this.$set(this.bookChecks, i, false);
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/');
    },
    handleBookCheck (check, index) {// 书签选中状态由父组件控制，绑定到子组件
      this.$set(this.bookChecks, index, check);// 子组件触发事件修改值，利于全选、删除功能的开发
    },
    handleDial (edit) {// 切换编辑模式
      this.edit = edit;
    },
    handleDel () {// 删除
      const hasSelBook = this.bookChecks.some(value => value);// 判断列表中是否有选中书签true/false
      if (hasSelBook) {
        this.bus.$emit('delBooks', this.bookChecks);
      }
    },
    handleSelAll () {// 全选/反选
      const didSelAll = this.bookChecks.every(value => value);// 判断列表是否已经全选
      this.bookChecks = this.bookChecks.map(() => !didSelAll);// 全选/反选
    }
  },
  watch: {
    '$root.books' () {// 当根实例书签列表改变时，改变书签列表和选中项
      const newBooks = this.$root.books;
      const bookSize = newBooks.length;

      this.books = newBooks;
      for (let i=0; i<bookSize; i++) {
        this.$set(this.bookChecks, i, false);
      }
      Mdui.snackbar('编辑成功');// 打开底部snackbar
    }
  },
  render () {
    const bookMarks = () => {
      return this.books
        .map((book, index) => {
          return (
            <BookMark
              key={book.id}
              book={book}
              index={index + 1}
              editMode={this.edit}
              bookCheck={this.bookChecks[index]}
              onBookChecked={this.handleBookCheck.bind(this)}
            />
          );
        });
    };
    const bookMessage = () => {
      return (
        <p class="book-message">目前未有收藏</p>
      );
    };
    const fabDial = () => {
      if (this.books.length) {
        return (
          <FabDial
            onEnterEditMode={this.handleDial.bind(this)}
            onDelBooks={this.handleDel.bind(this)}
            onSelectAll={this.handleSelAll.bind(this)}
          />
        );
      }
    };
    return (
      <div class="settings-books">
        <MduiHeader title="书签">
          <template slot="drawer">
            <a class="mdui-btn mdui-btn-icon mdui-ripple mdui-text-color-white" onClick={this.goBack.bind(this)}>
              <i class="mdui-icon material-icons">&#xe5c4;</i>
            </a>
          </template>
        </MduiHeader>
        { this.books.length ? bookMarks() : bookMessage() }
        { fabDial() }
      </div>
    );
  }
};
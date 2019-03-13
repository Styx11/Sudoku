import Vue from 'vue';
import router from './router';
import KBManager from '@/script/keyboard_manager';
import LSManager from '@/script/localStorage_manager';

const bus = new Vue();
const Mdui = require('mdui/dist/js/mdui.min.js');
const keyboardManager = new KBManager(bus);
const body = document.getElementsByTagName('body')[0];

import 'mdui/dist/css/mdui.min.css';
import './style/main.css';

Vue.prototype.bus = bus;

new Vue({
  el: '#root',
  router,
  data: {
    settings: {
      tips: false,
      timer: false,
      disableSolved: false,
      dark: false
    },
    books: [],// 收藏夹
    slideName: '',
  },
  created () {
    const settings = LSManager.getGameState('settings');
    const books = LSManager.getGameState('books');

    if (settings) this.settings = settings;
    if (books) this.books = books;
  },
  mounted () {
    if (this.settings.dark) body.classList.add('mdui-theme-layout-dark');

    this.bus.$on('getSets', this.getSets);// 接收设置
    this.bus.$on('markBook', this.markBook);// 添加收藏
    this.bus.$on('delBook', this.delBook);// 删除收藏
    this.bus.$on('delBooks', this.delBooks);// 删除列表收藏
  },
  beforeDestroy () {
    // 解除事件绑定
    this.bus.$off('getSets');
    this.bus.$off('markBook');
    this.bus.$off('delBook');
    this.bus.$off('delBooks');
  },
  watch: {
    '$route' (to, from) {
      const toPath = to.path;
      const fromPath = from.path;

      if (fromPath === '/') {// 根路径split后长度也为2，所以直接判断
        return this.slideName = 'slideInRight';
      } else if (toPath === '/') {
        return this.slideName = 'slideInLeft';
      }

      const toDepth = toPath.split('/').length;
      const fromDepth = fromPath.split('/').length;
      this.slideName = toDepth > fromDepth ? 'slideInRight' : 'slideInLeft';
    }
  },
  methods: {
    getSets (e) {
      const item = e.item;
      const setting = e.setting;

      this.settings[item] = setting;
      this.settings.dark
        ? body.classList.add('mdui-theme-layout-dark')
        : body.classList.remove('mdui-theme-layout-dark');

      LSManager.setGameState('settings', this.settings);
    },
    markBook (book) {
      this.books.push(book);
      LSManager.setGameState('books', this.books);
    },
    delBook (id) {
      this.books = this.books.filter(book => book.id !== id);
      LSManager.setGameState('books', this.books);
    },
    delBooks (books) {
      this.books = this.books.filter((book, index) => !books[index]);// 返回未被选中项
      LSManager.setGameState('books', this.books);
    }
  },
  render () {
    return (
      <div>
        <transition enter-active-class={this.slideName}>
          <router-view
            settings={this.settings}
            slideName={this.slideName}
          />
        </transition>
      </div>
    );
  }
});
import Vue from 'vue';
import router from './router';
import store from './store';
import { mapActions, mapState } from 'vuex';
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
  store,
  computed: {
    ...mapState({
      dark: state => state.settings.dark,
      slideName: state => state.slideName,
    }),
  },
  created () {
    const settings = LSManager.getGameState('settings');
    const books = LSManager.getGameState('books');

    if (settings) this.initializeSettings(settings);
    if (books) this.initializeBooks(books);
  },
  mounted () {
    if (this.dark) body.classList.add('mdui-theme-layout-dark');
  },
  methods: {
    ...mapActions([
      'initializeSettings',
      'initializeBooks',
      'mutateSlideName'
    ]),
  },
  watch: {
    '$route' (to, from) {
      const toPath = to.path;
      const fromPath = from.path;

      if (fromPath === '/') {// 根路径split后长度也为2，所以直接判断
        return this.mutateSlideName('slideInRight');
      } else if (toPath === '/') {
        return this.mutateSlideName('slideInLeft');
      }

      const toDepth = toPath.split('/').length;
      const fromDepth = fromPath.split('/').length;
      toDepth > fromDepth 
        ? this.mutateSlideName('slideInRight')
        : this.mutateSlideName('slideInLeft');
    },
    dark () {
      this.dark
        ? body.classList.add('mdui-theme-layout-dark')
        : body.classList.remove('mdui-theme-layout-dark');
    }
  },
  render () {
    return (
      <div>
        <transition enter-active-class={this.slideName}>
          <router-view />
        </transition>
      </div>
    );
  }
});
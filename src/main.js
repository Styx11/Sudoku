import Vue from 'vue';
import router from './router';

const Mdui = require('mdui/dist/js/mdui.min.js');

import 'mdui/dist/css/mdui.min.css';
import './style/main.css';

Vue.prototype.bus = new Vue();

new Vue({
  el: '#root',
  router,
  data: {

  },
  components: {
    
  },
  render() {
    return (
      <div>
        
      </div>
    );
  }
});
import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/home/Home';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '', component: HomePage }
  ]
});
import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/home/Home';
import HelpPage from '@/pages/help/Help';
import HelpHome from '@/pages/help/components/help_home';
import HelpHow from '@/pages/help/components/help_how';
import HelpTrick from '@/pages/help/components/help_trick';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '', component: HomePage },
    { path: '/help', component: HelpPage,
      children: [
        { path: '', component: HelpHome },
        { path: 'how', component: HelpHow },
        { path: 'trick', component: HelpTrick },
      ]
    }
  ]
});
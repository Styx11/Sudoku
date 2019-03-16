import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/home/Home';
import HelpPage from '@/pages/help/Help';
import HelpHome from '@/pages/help/components/help_home';
import HelpHow from '@/pages/help/components/help_how';
import HelpTrick from '@/pages/help/components/help_trick';
import SettingsPage from '@/pages/settings/Settings';
import SettingsHome from '@/pages/settings/components/settings_home';
import SettingsBooks from '@/pages/settings/components/settings_books';

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
    },
    { path: '/settings', component: SettingsPage,
      children: [
        { path: '', component: SettingsHome },
        { path: 'books', component: SettingsBooks }
      ]
    },
  ]
});
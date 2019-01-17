var router = new VueRouter({
  routes: [
    { path: '', component: HomePage},
    { path: '/settings', component: Settings,
      children: [
        { path: '', component: SettingsPage }
      ]
    },
    { path: '/help/', component: Help,
      children: [
        { path: '', component: HelpPage },
        { path: 'how', component: HelpHow },
        { path: 'trick', component: HelpTrick },
      ]
    }
  ]
})
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash'
  },
  routes: [
    // {
    //   path: '/', component: '@/pages/index',
    //   routes: [
    //     { path: 'page1', component: '@/pages/Page1' },
    //     { path: 'page2', component: '@/pages/Page2' },
    //     { path: 'page3', component: '@/pages/Page3' },
    //   ],
    // },
    // { path: '/x6', component: '@/pages/x6' },
    // { path: '/table', component: '@/pages/Table' },
    {
      path: '/', redirect: '/rain/table',
    },
    {
      path: '/rain',
      component: '@/layout/index',
      routes: [
        { path: '/table', component: '@/pages/Table' }
      ]
    }
  ],
  fastRefresh: {},
});
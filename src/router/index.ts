import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Tos',
    component: () => import('@/views/Tos.vue'),
  },
  {
    path: '/all-card',
    name: 'all-card',
    component: () => import('@/views/AllCard.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

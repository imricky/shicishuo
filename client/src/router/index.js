import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Search from '../views/Search.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/t',
    name: 'test',
    component: () => import(/* webpackChunkName: "about" */ '@/views/user/Profile.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '@/views/poem/DailyPoem.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/DailyPoem',
    name: 'DailyPoem',
    component: () => import(/* webpackChunkName: "about" */ '@/views/poem/DailyPoem.vue'),
  },
  {
    path: '/ExploreGoodPoetry',
    name: 'ExploreGoodPoetry',
    component: () => import(/* webpackChunkName: "about" */ '@/views/poem/ExploreGoodPoetry.vue'),
  },
  {
    path: '/Library',
    name: 'Library',
    component: () => import(/* webpackChunkName: "about" */ '@/views/poem/Library.vue'),
  },
  {
    path: '/CoolExploration',
    name: 'CoolExploration',
    component: () => import(/* webpackChunkName: "about" */ '@/views/poem/CoolExploration.vue'),
  },
  {
    path: '/tag/:tagName',
    name: 'Tag',
    component: () => import(/* webpackChunkName: "about" */ '@/views/poem/Tag.vue'),
  },


  // 和用户相关的路由
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/user/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '@/views/user/Register.vue'),
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '@/views/user/Profile.vue'),
  },

  // 公共页面
  {
    path: '/s',
    name: 'test',
    component: Search,
  },

  // 酷功能
  {
    path: '/flying-order',
    name: 'flying-order',
    component: () => import(/* webpackChunkName: "about" */ '@/views/CoolFeature/FlyingOrder.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

import Vue from 'vue';
import VueRouter from 'vue-router';
import { Message, MessageBox } from 'element-ui';
import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import store from '../store';

Vue.use(store);
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
  // 飞花令
  {
    path: '/flying-order',
    name: 'flying-order',
    component: () => import(/* webpackChunkName: "about" */ '@/views/CoolFeature/FlyingOrder.vue'),
  },
  // 你画我猜
  {
    path: '/you_draw_i_guess',
    name: 'you_draw_i_guess',
    // You could also have named views at tho top
    component: () => import(/* webpackChunkName: "about" */ '@/views/CoolFeature/you_draw_i_guess/YouDrawIGuess.vue'),
    children: [{
      path: 'room-list',
      name: 'room-list',
      component: () => import(/* webpackChunkName: "about" */ '@/views/CoolFeature/you_draw_i_guess/RoomList.vue'),
    }, {
      path: 'room/:id',
      name: 'room',
      component: () => import(/* webpackChunkName: "about" */ '@/views/CoolFeature/you_draw_i_guess/Room.vue'),
    }],
    // beforeEnter: (to, from, next) => {
    //   // ...
    //   console.log(to);
    //   console.log(from);
    //   next();
    // },
  },
  // 诗说FM
  {
    path: '/shishuoFM',
    name: 'shishuoFM',
    component: () => import(/* webpackChunkName: "about" */ '@/views/CoolFeature/shishuo_fm/HomePage.vue'),
  },
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  // /you_draw_i_guess/room/123
  // 路由离开房间的时候，也要清空处理
  const reg = /^(\/you_draw_i_guess\/room\/)/g;
  if (reg.test(from.path)) {
    MessageBox.confirm('离开该房间页面会导致你离开房间或者解散房间，确定要离开么?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      // 刷新vuex 状态
      const obj = {
        roomNo: store.state.roomInfo.roomNo,
        username: store.state.user.username,
        userId: store.state.user._id,
      };
      // 告诉别的客户端信息
      Vue.prototype.$socket.emit('leave', obj);
      // 触发leaveRoom事件，清空当前vuex里的房间信息和聊天信息
      store.dispatch('leaveRoom');
      next();
    }).catch((e) => {
      Message({
        type: 'info',
        message: '已取消操作',
        duration: 1500,
      });
      next(false);
    });
  } else {
    next();
  }
});

export default router;

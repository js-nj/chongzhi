import index from './pages/index/index.vue';
import login from './pages/index/login.vue';
import consumelist from './pages/index/consumelist.vue';
export default {
  routes: [{
    path: '/',
    name: 'login',
    component: login
  }, {
    path: '/index',
    name: 'index',
    component: index
  }, {
    path: '/consumelist',
    name: 'consumelist',
    component: consumelist
  }]
};

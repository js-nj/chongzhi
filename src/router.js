import index from './pages/index/index.vue';
import login from './pages/index/login.vue';
import qrdetail from './pages/index/qrdetail.vue';
import editinfo from './pages/index/editinfo.vue';
import editpw from './pages/index/editpw.vue';
import recharge from './pages/index/recharge.vue';
import stationlist from './pages/index/stationlist.vue';
import consumelist from './pages/index/consumelist.vue';
import consumedetail from './pages/index/consumedetail.vue';
import cashier from './pages/index/cashier.vue';
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
    path: '/qrdetail',
    name: 'qrdetail',
    component: qrdetail
  }, {
    path: '/editinfo',
    name: 'editinfo',
    component: editinfo
  }, {
    path: '/editpw',
    name: 'editpw',
    component: editpw
  }, {
    path: '/recharge',
    name: 'recharge',
    component: recharge
  }, {
    path: '/stationlist',
    name: 'stationlist',
    component: stationlist
  }, {
    path: '/consumelist',
    name: 'consumelist',
    component: consumelist
  }, {
    path: '/consumedetail',
    name: 'consumedetail',
    component: consumedetail
  }, {
    path: '/cashier',
    name: 'cashier',
    component: cashier
  }]
};

import Vue from 'vue';
import router from '@/router/router';
import App from './App.vue';
import store from './store';
import './assets/styles/style.scss';
import './assets/styles/variables.scss';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');

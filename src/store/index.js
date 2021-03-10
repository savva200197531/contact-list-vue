import Vue from 'vue';
import Vuex from 'vuex';

import storage from '@/store/modules/storage';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    storage,
  },
});

export default store;

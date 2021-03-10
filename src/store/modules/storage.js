import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  contacts: {}
};

const mutations = {
  addContact(state, payload) {
    const id = new Date().getTime();
    Vue.set(state.contacts, id, {
      name: payload.name,
      phone: payload.phone
    });
  },
  addField() {

  }
};

const actions = {
  createContact({ commit }, payload) {
    commit('addContact', payload);
    console.log(payload);
  }
};

const getters = {
  getCurrentContact: state => id => {
    let out = {};
    Object.keys(state.contacts).forEach(key => {
      if (key === id) out = state.contacts[key];
    });
    return out;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

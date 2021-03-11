import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router/router';

Vue.use(Vuex);

const state = {
  contacts: {
    234: {
      name: 'Anton',
      phone: '323232'
    }
  },
  popup: {
    show: false,
    text: '',
    id: ''
  }
};

const mutations = {
  addContact(state, payload) {
    const id = new Date().getTime();
    Vue.set(state.contacts, id, {
      name: payload.name,
      phone: payload.phone
    });
  },
  removeContact(state, id) {
    Vue.delete(state.contacts, id);
  },
  addField(state, payload) {
    Object.assign(state.contacts[payload.id], payload.data);
  },
  removeField(state, payload) {
    Vue.delete(state.contacts[payload.id], payload.key);
  },
  changePopupValues(state, payload) {
    state.popup = payload;
  },
};

const actions = {
  createContact({ commit }, payload) {
    commit('addContact', payload);
  },
  deleteContact({ commit }, id) {
    commit('removeContact', id);
  },
  createField({ commit }, payload) {
    commit('addField', payload);
  },
  deleteField({ commit }, payload) {
    commit('removeField', payload);
    if (!Object.keys(state.contacts[payload.id]).length) {
      commit('removeContact', payload.id);
      router.push('/');
    }
  },
  showPopup({ commit }, payload) {
    commit('changePopupValues', {
      show: true,
      ...payload
    });
  },
  hidePopup({ commit }) {
    commit('changePopupValues', {
      show: false,
      type: '',
      data: {}
    })
  },
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

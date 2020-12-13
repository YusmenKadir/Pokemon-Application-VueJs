import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    name: "",
  },

  getters: {
    returnUserName: (state) => {
      return  state.name;
    },
  },

  mutations: {
    setName: (state, thename) => {
      state.name = thename;
    },
  },

  actions: {
    setName: ({ commit }, thename) => {
      commit("setName", thename);
    },
  },
});

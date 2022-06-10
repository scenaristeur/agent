import Vue from 'vue'
import Vuex from 'vuex'
import core from './modules/core'
import graph3D from './modules/graph3D'
import soukai from './modules/soukai'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    core, graph3D, soukai
  }
})

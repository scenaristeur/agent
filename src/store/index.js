import Vue from 'vue'
import Vuex from 'vuex'
import core from './modules/core'
import solid from './modules/solid'
import terminal from './modules/terminal'
import gun from './modules/gun'
import yjs from './modules/yjs'
// import automerge from './modules/automerge'

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
    core, solid, terminal, gun, yjs /*automerge*/
  }
})

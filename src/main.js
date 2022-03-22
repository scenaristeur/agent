import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// import OsCorePlugin from './plugins/os-core-plugin';
// Vue.use(OsCorePlugin, {store: store});

import Graph3dPlugin from './plugins/graph3d-plugin';
Vue.use(Graph3dPlugin, {store: store});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

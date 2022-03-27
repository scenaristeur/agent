import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// import OsCorePlugin from './plugins/os-core-plugin';
// Vue.use(OsCorePlugin, {store: store});

import CorePlugin from './plugins/core-plugin';
Vue.use(CorePlugin, {store: store});

import Graph3dPlugin from './plugins/graph3d-plugin';
Vue.use(Graph3dPlugin, {store: store});
import ToolsPlugin from './plugins/tools-plugin';
Vue.use(ToolsPlugin, {store: store});
import SolidPlugin from './plugins/solid-plugin';
Vue.use(SolidPlugin, {store: store});
import SolidDataPlugin from './plugins/solid-data-plugin';
Vue.use(SolidDataPlugin, {store: store});
// import LevelgraphJsonLDPlugin from './plugins/levelgraphjsonld-plugin';
// Vue.use(LevelgraphJsonLDPlugin, {store: store});



import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

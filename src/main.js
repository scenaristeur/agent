import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// import OsCorePlugin from './plugins/os-core-plugin';
// Vue.use(OsCorePlugin, {store: store});
// import GalaxyPlugin from './plugins/galaxy-plugin';
// Vue.use(GalaxyPlugin, {store: store});

import VueSocialSharing from 'vue-social-sharing'
Vue.use(VueSocialSharing);

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

import SearchPlugin from './plugins/search-plugin';
Vue.use(SearchPlugin, {store: store});
// import BrainPlugin from './plugins/brain-plugin';
// Vue.use(BrainPlugin, {store: store});
// import LevelgraphJsonLDPlugin from './plugins/levelgraphjsonld-plugin';
// Vue.use(LevelgraphJsonLDPlugin, {store: store});
import VueFab from 'vue-float-action-button'

Vue.use(VueFab,  {
  // opitons Optional Alibaba iconfont icon or MaterialIcons
  iconType: 'MaterialDesign'
  // iconType: 'iconfont'
} )


// import { LayoutPlugin,
//   ModalPlugin,
//   IconsPlugin,
//   NavbarPlugin,
//   CollapsePlugin,
//   FormPlugin,
//   BInputGroup,
//
//
// } from 'bootstrap-vue'
//
// // Import Bootstrap an BootstrapVue CSS files (order is important)
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
//
//
//
// // Make BootstrapVue available throughout your project
// Vue.use(LayoutPlugin)
// Vue.use(ModalPlugin)
// Vue.use(NavbarPlugin)
// Vue.use(CollapsePlugin)
// Vue.use(FormPlugin)
// Vue.use(BInputGroup)
// // Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin)

// import GunPlugin from './plugins/gun-plugin';
// Vue.use(GunPlugin, {store: store});
//
// import VueGun from 'vue-gun';
// import('gun/lib/load.js')
// // import SEA from 'gun/sea'; // Required for SEA functions and user authentication
// // Vue.use(SEA)
// Vue.use(VueGun, {
//   //  gun: gun // must be passed in at `gun` key
//    peers: ['https://spogg.herokuapp.com/gun',/*'http://localhost:9090/gun',*/ 'https://gun-manhattan.herokuapp.com/gun'/*, 'http://gunjs.herokuapp.com/gun/'*/] // run gun-starter-app on port 9090
// });


import { BootstrapVue,
  // BIconLink,
  // BIconEye,
  // BIconShare,
  // BIconFileArrowUp,
  // BIconFileArrowDown,
  // BIconClipboardPlus,
  // BIconCloudUpload
  BootstrapVueIcons
 } from 'bootstrap-vue'

  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  Vue.use(BootstrapVue)
  // Vue.use(BIconLink)
  // Vue.use(BIconEye)
  // Vue.use(BIconShare)
  // Vue.use(BIconFileArrowUp)
  // Vue.use(BIconFileArrowDown)
  // Vue.use(BIconClipboardPlus)
  // Vue.use(BIconCloudUpload)
  Vue.use(BootstrapVueIcons)


  Vue.config.productionTip = false

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')

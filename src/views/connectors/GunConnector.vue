<template>
  <div>
    Gundb Collaborative Brain :
    <b-input
    placeholder="create or join a room"
    v-model="room"
    @keyup.enter="connectRoom"
    />

  </div>
</template>

<script>
import Vue from 'vue'
import GunPlugin from '@/plugins/gun-plugin';
import VueGun from 'vue-gun';
// import('gun/lib/load.js')
// import SEA from 'gun/sea'; // Required for SEA functions and user authentication
// Vue.use(SEA)

export default {
  name: "GunConnector",
  data(){
    return{
      room : ""
    }
  },
  created(){
    Vue.use(GunPlugin, {store: this.$store});
    Vue.use(VueGun, {
      //  gun: gun // must be passed in at `gun` key
      peers: ['https://spogg.herokuapp.com/gun',/*'http://localhost:9090/gun',*/ 'https://gun-manhattan.herokuapp.com/gun'/*, 'http://gunjs.herokuapp.com/gun/'*/] // run gun-starter-app on port 9090
    });
  },
  methods: {
    connectRoom(){
      console.log(this.room)
      this.$store.commit('gun/setRootNode', this.room)
    }
  }
}
</script>

<style>

</style>

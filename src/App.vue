<template>
  <div id="app">
    <NavBar />
    <!-- <hr>
    <hr>
    <hr>
    <hr> -->
    <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <div v-if="message != null"><b><hr><hr>{{message}}<hr><hr></b></div>
  <router-view/>
  <small><i>0.0.1 - ipfs share by mail |
  <a href="https://github.com/scenaristeur/agent" target="_blank">contribute</a> |
<a href="https://github.com/scenaristeur/agent/wiki" target ="_blank">help</a>
</i></small>
</div>
</template>


<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    'NavBar': ()=>import('@/views/NavBar'),
  },
  data(){
    return{
      message: null
    }
  },
  created(){
    this.$coreInit({name: "SuperCore"})
    if(this.$route.query.source){
      let source = this.$route.query.source
      console.log("source",source)
      this.$loadBrainFromSolid(source)
    }else if(this.$route.query.cid){
        this.loadBrainFromIpfs()
    }else{
      this.$checkSolidSession()
      this.$store.dispatch('core/getNodes')
    }
  },
  methods:{
    loadBrainFromIpfs(){
      if(this.$route.query.cid){
        if (this.ipfsNode != null){
            this.$loadBrainFromIpfs(this.$route.query.cid)
            this.message = null
        }else{
          this.message = "connecting to ipfs, could take 30s, please be patient (todo : fusion avec le graph existant)"
        }
      }
    }
  },
  watch:{
    ipfsNode(){
this.loadBrainFromIpfs()

    }
  },
  computed: {
    ipfsNode() {
      return this.$store.state.core.ipfsNode
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

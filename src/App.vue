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
  <router-view/>
  <small><i>0.0.1 - fab-fix-terminal |
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
  created(){
    this.$coreInit({name: "SuperCore"})
    if(this.$route.query.source){
      let source = this.$route.query.source
      console.log("source",source)
      this.$loadBrainFromSolid(source)
    }else{
      this.$checkSolidSession()
      this.$store.dispatch('core/getNodes')
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

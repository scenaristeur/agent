<template>
  <div>
    Improving Data Caching
    <b-table striped hover :items="worlds"></b-table>
  </div>
</template>


<script>
export default {
  name: "DataCaching",
  data(){
    return {
      worlds: [],
      // brains: [],
      // activeWorlds: []
    }
  },
  created(){
    this.worlds = this.$store.state.core.galaxy.worlds
    let app = this

    this.$store.state.core.galaxy.worlds.filter(s => s.active == true).forEach(function (s){
      s.onCreated != null? app['$'+s.onCreated.action](s.onCreated.params) : ""
    })
  },
  mounted(){
    let app = this
    this.$store.state.core.galaxy.worlds.filter(s => s.active == true).forEach(function (s){
      console.log(s)
      s.onMounted != null? app['$'+s.onMounted.action](s.onMounted.params) : ""
    })
  }

}
</script>

<style>

</style>

<template>
  <div>
    Improving Data Caching
    <!-- <b-button :pressed.sync="myToggle" variant="primary">Toggle Me</b-button>
    <p>Pressed State: <strong>{{ myToggle }}</strong></p> -->
    <b-table striped hover :items="worlds">

      <template #cell(active)="data">
        <b-button :pressed.sync="data.value" variant="primary" @click="toggle(data)">{{ data.value}}</b-button>
      </template>

    </b-table>
  </div>
</template>


<script>
export default {
  name: "DataCaching",
  data(){
    return {
      myToggle: false,
      //worlds: [],
      // brains: [],
      // activeWorlds: []
    }
  },
  created(){
    //  this.worlds = this.$store.state.core.galaxy.worlds
    let app = this

    this.$store.state.core.galaxy.worlds.filter(s => s.active == true).forEach(function (s){
      try{
        s.onCreated != null? app[s.onCreated.action](s.onCreated.params) : ""
      }catch(e){console.log(e)}
    })
  },
  mounted(){
    let app = this
    this.$store.state.core.galaxy.worlds.filter(s => s.active == true).forEach(function (s){
      try{
        s.onMounted != null? app[s.onMounted.action](s.onMounted.params) : ""
      }catch(e){console.log(e)}
    })
  },
  methods: {
    toggle(data){
      console.log(data.item.active)
      data.item.active = !data.item.active
    }
  },

  // watch:{
  //   worlds:{
  //     handler(newValue, oldValue) {
  //       console.log(newValue, oldValue)
  //       // Note: `newValue` will be equal to `oldValue` here
  //       // on nested mutations as long as the object itself
  //       // hasn't been replaced.
  //     },
  //     deep: true
  //
  //   }
  // },
  computed:{
    worlds(){
      return this.$store.state.core.galaxy.worlds
    }
  }

}
</script>

<style>

</style>

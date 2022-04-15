<template>
  <div>
    Gun Test / experimental !!! this module is not ready yet !!! Do not use
    <b-button @click="close" variant =" warning">Close</b-button>
    <b-input v-model="dataSend" placeholder="dataSend"/>
    <b-button @click="put">Put</b-button>
    <!-- <b-button @click="get">Get</b-button> -->


    <b-input v-model="idGet" placeholder="idGet"/>
    <b-button @click="testGet">Test Get</b-button>
    <b-button @click="testGetJSON">Test Get JSON</b-button>
    <b-button @click="remove">Delete</b-button>
    <b-button @click="clear" disabled>Clear</b-button>

    <div id="result" >Result </div>

  </div>
</template>

<script>

// gun JSON https://gist.github.com/rosko/57ab2083ee4adf2f078d4d76851d9dc6


export default {
  name: "GunTest",
  data(){
    return{
      dataSend: "",
      gunRoot: null,
      idGet: null
    }
  },
  created(){
    this.gunRoot = this.$gun.get('neurones');
    //  this.get()
    this.listen()
    console.log("TODO gun JSON https://gist.github.com/rosko/57ab2083ee4adf2f078d4d76851d9dc6")
  },
  methods:{
    async put(){
      let node = await this.$newNode({name: this.dataSend})
      console.log('put', node)
      this.gunRoot.get(node.id).set(node)
    //  this.$putJSON(node)
      // this.gunRoot.put(node)
    },
    listen(){
      let cpt = 0
      //let gunRoot = this.gunRoot
      this.gunRoot.map().on(function(gunNode, id){
        console.log(id, gunNode != null && gunNode.name,  gunNode)
        // gunRoot.get(id).get('name', function(name){
        //   console.log(name)
        // })
        cpt ++
        console.log(cpt)
        // var li = $('#' + id).get(0) || $('<li>').attr('id', id).appendTo('ul');
        // if(thought){
        //   $(li).text(thought);
        // } else {
        //   $(li).hide();
        // }
      });

    },
    // get(){
    //   console.log('get', this.gunRoot)
    //
    // },
    // async testGetJSON(){
    //   let json  = await this.$getJSON()
    //   console.log(json)
    // },
    close (){
      this.$store.commit('gun/toggleGun')
    },
    testGet(){
      console.log("test get", this.idGet)

      // this.gunRoot.get(this.idGet).on(function(gunNode, key){
      //   // {property: 'value'}, 'key'
      //   console.log(gunNode, key)
      // })
      let gunRoot = this.gunRoot
      // console.log("json", this.gunRoot.get(this.idGet).toJSON())
      this.gunRoot.get(this.idGet).once(function(node, id){

        console.log('Node!', gunRoot.get(id).get('name'), node);
      });
      this.gunRoot.get(this.idGet).get('name').once(function(value, key){
        console.log("Name?", value, key);
      });
    },
    remove(){
      console.log("remove", this.idGet)
      this.gunRoot.get(this.idGet).set(null)
    },
    clear(){
      if (confirm('Are you sure you want to delete all Neurones?')) {
        // Save it!
        console.log('Thing was saved to the database.');
        this.gunRoot.set(null)
      }

    }
  }
}
</script>

<style>

</style>

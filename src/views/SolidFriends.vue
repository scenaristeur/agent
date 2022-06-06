<template>
  <div>
    <b-list-group v-if="pod != null">
      <b-list-group-item v-for="f in friends" :key="f.webid" button>
        {{ f.webId }}
        <FriendDetail :friend="f" />
      </b-list-group-item>

    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "SolidFriends",
  data(){
    return {friends : []}
  },
  components: {
      'FriendDetail': ()=>import('@/components/FriendDetail'),
  },
  methods:{
    updateFriends(){
      if (this.pod != null && this.galaxy != undefined){
      let solid_friends_world = this.galaxy.worlds.find(w => w.name == "Solid Friends")
      console.log(solid_friends_world)
      if (solid_friends_world.active == true){
      this.friends = this.pod.friends
    }else{
      this.friends = []
    }
    }
  }
  },
  watch:{
    pod(){
      this.updateFriends()
    },
    galaxy(){
      this.updateFriends()
    }
  },
  computed: {
    pod() {
      return this.$store.state.solid.pod
    },
    galaxy(){
      return this.$store.state.core.galaxy
    }
  }
}
</script>

<style>

</style>

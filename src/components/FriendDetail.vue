<template>
  <div>
    <div v-if="friend != null" >
    <img v-if="friend.photo != null && friend.photo.length > 0" :src="friend.photo" width="50" />
<b v-if="friend.name">{{name}}</b>
    <fieldset>
      <legend>
        infos
      </legend>
      {{ infos}}
    </fieldset>
  </div>

  <h2>details :</h2> {{friend}}
  <hr>
  remotesUrl : {{ remotesUrl}}


</div>
</template>

<script>
export default {
  name: "FriendDetail",
  props: ["friend"],
  data(){
    return {
      name: "",
      storage: ".",
      neuroneStore: "..",
      friends: [],
      infos: null,
      remotesUrl : []
      //  podInfos: null
    }
  },
  methods: {
    async getPodInfos(){
      this.infos =  await this.$getPodInfos(this.friend)
      this.remotesUrl = await this.$brainsFromPod(this.friend)
    }
  },
  watch: {
    async podInfos(){
      console.log("friend", this.podInfos)
      this.name = await this.podInfos.name
      this.storage = await this.podInfos.storage
      this.friends = await this.podInfos.friends
    }
  },
  computed : {
    podInfos (){
      return  this.getPodInfos()
    }
  }
}
</script>

<style>

</style>

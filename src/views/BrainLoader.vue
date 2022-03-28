<template>
  <div v-if="showBrainLoader == true">
    <b-button @click="loadBrainFromSolid">Choose path for loading a brain</b-button>
    <b-button @click="hide">Hide BrainLoader</b-button>
    <b-list-group v-if="brains!=undefined">
      <b-list-group-item
      v-for="b in brains.brains"
      :key="b.id"
      @click="loadBrain(b)"
      button>
      <b>{{b.name}}</b>
      <small><i>{{b.id}}</i></small><br>
      created: {{b.created}} / updated: {{b.updated}}
    </b-list-group-item>
  </b-list-group>
</div>
</template>

<script>
export default {
  name: "BrainLoader",
  methods:{
    loadBrain(b){
      console.log("loading",b)
      this.$loadBrainFromSolid(b.id)
      this.hide()
    },
    loadBrainFromSolid(){
      this.$loadBrainFromSolid()
      this.hide()
    },
    hide(){
      this.$store.commit('core/setShowBrainLoader', false)
    }
  },
  computed: {
    brains() {
      return this.$store.state.core.brains
    },
    showBrainLoader() {
      return this.$store.state.core.showBrainLoader
    },
  },
}
</script>

<style>

</style>

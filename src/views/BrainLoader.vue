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
      <b><a :href="b.id" target="_blank">{{b.name}}</a></b>
      <small><i>created: {{b.created}} / updated: {{b.updated}}</i></small>

      <b-button @click.stop="share(b.id)"  size="sm" variant="success"><b-icon-share></b-icon-share></b-button>
      <!-- <b-icon-share @click="share(b.id)"></b-icon-share> -->
    </b-list-group-item>
  </b-list-group>
</div>
</template>

<script>
import ToastMixin from '@/mixins/ToastMixin'

export default {
  name: "BrainLoader",
  mixins: [ToastMixin],
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
    },
    share(id){
      let copyText = "https://scenaristeur.github.io/agent?source="+id //window.location.href
      let app = this
      //  !copyText.endsWith(".ttl") ?
      //copyText = copyText+this.file.url //: ""
      //  console.log(copyText)
      navigator.clipboard.writeText(copyText).then(function() {
        /* clipboard successfully set */
        //  console.log("clipok", copyText)
        app.makeToast("The url is in your clipboard ;-)", copyText+".               Use Ctrl+V to share it", "success")
      }, function() {
        /* clipboard write failed */
        //  console.log("clipERROR", copyText)
        app.makeToast("Houston, we've got a problem with the clipboard ;-(", copyText, "warning")
      })
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

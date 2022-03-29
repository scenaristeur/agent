<template>
  <b-container v-if="showBrainLoader == true">
    <b-button @click="loadBrainFromSolid">Choose path for loading a brain</b-button>
    <b-button @click="hide">Hide BrainLoader</b-button>
    <b-list-group v-if="brains!=undefined" class="scroll">
      <b-list-group-item
      v-for="b in items"
      :key="b.id"
      @click="loadBrain(b)"
      class="item list-group-item d-flex justify-content-between p-1"
      button>
      <p class="p-0 m-0 flex-grow-1">
        <b>{{b.name}}</b>
      </p>
      <small class="mr-2"><i>created: {{new Date(b.created).toLocaleString()}} <br> updated: {{new Date(b.updated).toLocaleString()}}</i></small>

      <!-- <a :href="b.id" target="_blank" button  size="sm mr-2" variant="outline-success"><b-icon-link></b-icon-link></a> -->
      <b-button @click.stop="open(b.id)" size="sm mr-2" variant="outline-success"><b-icon-eye></b-icon-eye></b-button>
      <b-button @click.stop="share(b.id)"  size="sm mr-2" variant="outline-success"><b-icon-share></b-icon-share></b-button>

      <!-- <b-icon-share @click="share(b.id)"></b-icon-share> -->
    </b-list-group-item>
  </b-list-group>
</b-container>
</template>

<script>
import ToastMixin from '@/mixins/ToastMixin'

export default {
  name: "BrainLoader",
  mixins: [ToastMixin],
  data(){
    return{
      items: []
    }
  },
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
    },
    open(id){
      window.open(id, '_blank').focus();
    }
  },
  watch:{
    brains(){
      this.items = this.brains.brains.sort((a,b) => b.updated - a.updated);
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
.item {
  text-align: left;
}
.scroll{
  max-height: 40vh;
  margin-bottom: 10px;
  overflow-y:scroll;
  -webkit-overflow-scrolling: touch;
}
</style>

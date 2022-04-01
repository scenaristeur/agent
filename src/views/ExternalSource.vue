<template>
  <span>

    <b-button v-b-modal.modal-external-source variant="outline-primary">External source</b-button>

    <b-modal id="modal-external-source" title="ExternalSource"
    @ok="runQueries">
    <p class="my-4">

      <!-- <b-form-checkbox-group
      switches
      v-model="selected"
      :options="sources"
      class="mb-3"
      value-field="url"
      text-field="name"
      disabled-field="notEnabled"
      ></b-form-checkbox-group>
    -->
    <!-- <b-input v-on:keyup.enter="onEnter" v-model="external" /> -->

    <vue-tags-input
    v-model="tag"
    placeholder="Search"
    autofocus
    :tags="tags"
    :autocomplete-items="autocompleteItems"
    @tags-changed="update"
    />

  </p>



  <!-- <div class="mt-3">Selected: <strong>{{ selected }}</strong></div> -->
</b-modal>


</span>
</template>

<script>
import _ from 'underscore'
const API_URL = 'https://www.wikidata.org/w/api.php?action=wbsearchentities&origin=*&format=json'

export default {
  name: "ExternalSource",
  components: {
    'VueTagsInput': () => import('@johmun/vue-tags-input'),
  },
  data(){
    return{
      tag: '',
      tags: [],
      autocompleteItems: [],
      debounce: null,
      // note: {title: "", text: "", url: "", tags: ""},
      // inputFocus: false,
      // cardActive: false,
      // text_placeholder: "Créer une note",
      // share: true,
      // checked1: true,
      // selected: [],
      // external: "",
      // sources: [
      //   {name: "wikidata", status: "active", url: "https://www.wikidata.org/w/api.php?action=wbsearchentities&origin*&format=json" },
      //   {name: "semapps-mega carte", status: "in progress", url: "data.semapps" },
      //   {name: "medecine", status: "hs", url: "data.medecin" },
      // ]
    }
  },
  created(){
    this.language = navigator.language.split("-")[0] || 'en'
    // this.sources[0].url += "&language="+this.language+"&search="
    // this.selected.length == 0 ? this.selected.push(this.sources[0].url) : ""
  },
  methods: {
    update(newTags) {
      this.autocompleteItems = [];
      this.tags = newTags;
    },
    runQueries(){
      console.log(this.tags)
      this.$loadBrainsFromWikidata(this.tags)
    },
    // onEnter(){
    //   if (this.selected.length == 0){
    //     alert("you must at least select one source")
    //     return
    //   }
    //   let term = this.external.trim()
    //   console.log(term)
    //   this.getItems(term)
    // },
    async getItems(query) {
      //  this.conceptUri = ""
      if(query.length>0){
        this.loading = true
        let search_url = API_URL+"&language="+this.language+"&search="+query
        console.log(search_url)
        try{
          const res = await fetch(search_url)
          const suggestions = await res.json()
          console.log(suggestions)
          this.items = suggestions.search
          console.log(this.items)
          this.autocompleteItems = suggestions.search.map(a => {
            return { text: a.match.text+" ("+a.description+")", url: a.concepturi, item: a };
          });
        }catch(e){
          alert(e)
        }
        this.loading = false
      }
    },
  },
  watch:{
    'tag': _.debounce(function(item) { this.getItems(item) }, 500),
    tags(){
      console.log(this.tags)
      //this.note.tags = this.tags//.map(t => t.text.trim())
    },
    // '$route' (to) {
    //   //  console.log("New Note, to",to)
    //   this.initForm(to.query)
    // },
    // inputFocus(){
    //   if (this.inputFocus == true){
    //     this.cardActive = true
    //     this.text_placeholder = "Note"
    //     this.$refs.text.focus()
    //   }
    // },
    // currentNote(){
    //   //console.log("currentNote",this.currentNote)
    //   this.note = this.currentNote
    //   this.tags = this.currentNote.tags//.map(t => {return {text:t}})
    //   this.cardActive = true
    //   this.$refs.text.focus()
    //   //  console.log(this.$refs.text)
    // }
  },
}
</script>

<style>

</style>

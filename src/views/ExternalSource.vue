<template>
  <b-modal id="modal-external-source" title="ExternalSource : Wikidata"
  @ok="runQueries">
  <p class="my-4">
  <vue-tags-input
  v-model="tag"
  placeholder="Search"
  autofocus
  :tags="tags"
  :autocomplete-items="autocompleteItems"
  @tags-changed="update"
  />

  <small><i><a href="https://www.wikidata.org" target="_blank">source wikidata</a></i></small>
</p>

</b-modal>

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
      // sources: [
      //   {name: "wikidata", status: "active", url: "https://www.wikidata.org/w/api.php?action=wbsearchentities&origin*&format=json" },
      //   {name: "semapps-mega carte", status: "in progress", url: "data.semapps" },
      //   {name: "medecine", status: "hs", url: "data.medecin" },
      // ]
    }
  },
  created(){
    this.language = navigator.language.split("-")[0] || 'en'
  },
  methods: {
    update(newTags) {
      this.autocompleteItems = [];
      this.tags = newTags;
    },
    async runQueries(){
      // console.log(this.tags)
      await this.$loadBrainsFromWikidata(this.tags)
      this.tags = []
    },
    async getItems(query) {
      if(query.length>0){
        this.loading = true
        let search_url = API_URL+"&language="+this.language+"&search="+query
        // console.log(search_url)
        try{
          const res = await fetch(search_url)
          const suggestions = await res.json()
          // console.log(suggestions)
          this.items = suggestions.search
          // console.log(this.items)
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
    // tags(){
    //   console.log(this.tags)
    //   //this.note.tags = this.tags//.map(t => t.text.trim())
    // },
  },
}
</script>

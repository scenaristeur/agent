<template>
  <div>
    <b-list-group class="scroll">
      <b-list-group-item
      href="#"
      class="item list-group-item d-flex justify-content-between p-1"
      v-for="i in items"
      :key="i.id"
      @click="selected(i)"
      @contextmenu.prevent="right(i)"
      >
      <p class="p-0 m-0 flex-grow-1">
        <!-- <b-button class="unstyled-button" variant="outline-warning">
        <b-icon-folder-fill></b-icon-folder-fill>
      </b-button> -->


      {{ i.name }} ({{i.id}})

      <!-- {{i}} -->
    </p>
    <b-button size="sm mr-2" variant="outline-primary">
      <b-icon-pen @click.stop="edit(i)" variant="primary"></b-icon-pen>
    </b-button>
    <b-button size="sm mr-2" variant="outline-primary">
      <b-icon-alt @click.stop="init_move(i)" variant="primary"></b-icon-alt>
    </b-button>

    <b-button size="sm" variant="outline-danger">
      <b-icon-trash @click.stop="init_trash(i)" variant="danger"></b-icon-trash>
    </b-button>

  </b-list-group-item>
</b-list-group>
<!-- items : {{items}} -->


<b-modal id="context-menu" :title="contextTitle">
  <b-list-group>

    <b-input-group prepend="Rename">
      <b-form-input v-model="newName"></b-form-input>
    </b-input-group>
  </b-list-group>
</b-modal>

<b-modal id="confirm-trash" title="Trash" @ok="trash">
  Are you sure you want to delete
  <b-icon-trash variant="danger"></b-icon-trash>
  <b>{{ currentItem.name }}</b> ({{ currentItem.type }})
  <b-icon-trash variant="danger"></b-icon-trash> and all its content ?
  <br>
  <small>
    {{ currentItem.url }}
  </small>
</b-modal>

<b-modal id="move" title="Are you sure you want to move or rename" @ok="move">
  name : {{ currentItem.name }}
  <br>
  <small>
    {{ currentItem.url }}
  </small>
  <b-input-group size="sm" prepend="New location">
    <b-form-input v-model="new_location"></b-form-input>
  </b-input-group>
</b-modal>
</div>
</template>

<script>
export default {
  name: "CrudList",
  props: ['items'],
  data(){
    return {
      contextTitle: "",
      currentItem: {},
      newName: "",
      //  deleteMessage: "",
      new_location:"",
      // new_folder:"",
      // files:[],
    }
  },
  methods: {
    edit(item){
      console.log("edit ",item)
    },
    selected(item){
      console.log(item)
    },
    right(item){
      console.log("right",item)
      this.contextTitle = item.name
      this.newName = item.name
      this.$bvModal.show("context-menu")
      this.currentItem = item
    },
    init_trash(item){
      //https://github.com/scenaristeur/solid-vue-panes/blob/b9b4446d7976242ba46a94c33f99f97079fc2401/src/components/explorer/Browser.vue
      console.log(item)
      this.$bvModal.show("confirm-trash")
      this.currentItem = item
    },
    init_move(item){
      console.log(item)
      this.$bvModal.show("move")
      this.currentItem = item
      this.new_location = item.url
    },
    async  move(){
      console.log("Move",this.currentItem)
      // try{
      //   this.currentItem.type == "folder" ? await fc.move( this.currentItem.url, this.new_location ) : await fc.move( this.currentItem.url, this.new_location )
      //   this.updateFolder(this.folder.url)
      // }
      // catch(e){
      //   this.makeToast("Error", e, "danger")
      // }
    },
    async  trash(){
      console.log("Trash",this.currentItem)
      this.$soukaiRemove(this.currentItem)
      // if (this.currentItem.type != "folder"){
      //   await deleteFile(
      //     this.currentItem.url
      //   );
      //   console.log("File deleted !");
      //   this.makeToast("success !", "File deleted !", "success")
      // }else{
      //   await  fc.deleteFolder(this.currentItem.url)
      // }
      // this.updateFolder(this.folder.url)
    },
    // updateFolder(folder){
    //   this.$store.dispatch('solid/updateFolder', folder)
    // }
  }
}
</script>

<style scoped>
.item {
  text-align: left;
}
.scroll{
  max-height: 80vh;
  margin-bottom: 10px;
  overflow-y:scroll;
  -webkit-overflow-scrolling: touch;
}
.unstyled-button {
  border: none;
  padding: 0;
  background: none;
}
</style>

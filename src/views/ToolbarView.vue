<template>
  <div>
    <b-button-toolbar key-nav aria-label="Toolbar with button groups">
      <b-button-group class="mx-1">
        <b-button @click="newNeurone">new</b-button>
        <b-button @click="newAutomerge">new automerge</b-button>
        <b-button @click="addItem">add item</b-button>
      </b-button-group>
      <b-button-group class="mx-1">
        <b-button>Edit</b-button>
        <b-button>Undo</b-button>
        <b-button>Redo</b-button>
      </b-button-group>
      <b-button-group class="mx-1">
        <b-button>&rsaquo;</b-button>
        <b-button>&raquo;</b-button>
      </b-button-group>
    </b-button-toolbar>
  </div>
</template>

<script>
export default {
  name: "ToolbarView",
  methods: {
    newNeurone(){
      this.$store.dispatch('core/newNode')
    },
    newAutomerge(){
      this.$store.dispatch('automerge/newDoc')
    },
    addItem(){
      let text = "blah"
      this.$store.dispatch('automerge/addItem', text)
    }
  }
}
</script>

<style scoped>

</style>

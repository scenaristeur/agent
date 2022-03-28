<template>
  <!-- <div> -->
  <!-- @keyup="onChange" -->
  <b-input-group>
    <b-form-input
    id="input"
    ref="input"
    autofocus
    v-model="main_input"
    v-on:keyup.enter="onEnter"
    title="type three words followed by a comma"
    placeholder="/h + Enter for help"></b-form-input>
    <template #append>
      <b-form-select
      v-if="nodes.length > 0"
      v-model="selected"
      value-field="id"
      text-field="name"
      :options="nodes"
      >
      <b-form-select-option :value="null">current nodes</b-form-select-option>

    </b-form-select>
    <b-button @click="clear" variant="outline-danger">X</b-button>
  </template>
</b-input-group>
</template>

<script>
import { Command } from '@/neurone-factory'
export default {
  name: "CommandInput",
  data() {
    return {
      main_input: "",
      commandHistory: [],
      selected: null,
    }
  },
  methods: {
    clear(){
      this.main_input = ""
    },
    // onChange(){
    //   console.log(this.main_input)
    //   // let s = this.$refs.input.value
    //   // this.$store.commit('app/setSearch', s)
    // },
    onEnter(){
      let inputValue = this.main_input.trim()
      if (inputValue.length > 0){
        let inputObject = new Command({inputValue: inputValue, selected: this.selected})
        this.$store.dispatch('core/pushCommandHistory', inputObject)
        this.main_input = inputObject.inputNew
      }
    },
  },
  watch:{
    currentNode(){
      if(this.currentNode != null){
        let val = this.currentNode.name || this.currentNode.id
        this.main_input = val+ " "
        this.$refs.input.focus()
      }
    },
    selected(){
      console.log("selected",this.selected)
      if(this.selected != null){
        let node = this.nodes.find(x => x.id == this.selected)
        console.log(node)
        let input = this.main_input.trim() + " "+node.name || node.id
        this.main_input = input + " ,"
        this.$refs.input.focus()
      }
    },
  },
  computed: {
    currentNode() {
      return this.$store.state.core.currentNode
    },
    nodes() {
      return this.$store.state.core.nodes
    }
  }
}
</script>

<template>
  <!-- <div> -->
  <!-- @keyup="onChange" -->
  <!--v-on:paste="onPaste"-->
  <!--v-on:input="onInput"-->
  <b-input-group>
    <b-form-input
    id="input"
    ref="input"
    autofocus
    v-model="main_input"
    v-on:keyup.enter="onEnter"
    v-on:paste="onPaste"
    v-on:input="onInput"
    title="type three words followed by a comma"
    placeholder="three words followed by a comma, or /h +Enter for help"></b-form-input>
    <template #append>
      <b-form-select
      v-if="orderedNodes.length > 0"
      v-model="selected"
      value-field="id"
      text-field="name"
      :options="orderedNodes"
      >
      <b-form-select-option :value="null" disabled>current nodes</b-form-select-option>

    </b-form-select>
    <b-button @click="clear" variant="outline-danger">X</b-button>
  </template>
</b-input-group>
</template>

<script>
import _ from 'lodash';
import { Command } from '@/neurone-factory'
export default {
  name: "CommandInput",
  data() {
    return {
      main_input: "",
      commandHistory: [],
      selected: null,
      'order' : 'asc',
    }
  },
  methods: {
    async onInput(){
      let params = {}
      params.text = this.main_input.trim()
      params.searchById = false
      this.$store.commit('core/setSearch', params)
      // if (params.text.length > 0){
      //   let results = await this.$search(params)
      //   console.log(results)
      //   this.$store.commit('core/setHighlightNodes', results)
      //   this.$store.commit('core/setSelectedNodes', results)
      // }else{
      //   console.log(params)
      // }

      //console.log(this.$refs.input.value)
    },
    onPaste(e){
      console.log(e)
      console.log(this.$refs.input.value)
    },
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
        let inputObject = new Command({inputValue: inputValue/*, selected: this.selected*/})
        this.$store.dispatch('core/pushCommandHistory', inputObject)
        this.main_input = inputObject.inputNew
        if(inputValue == "/h"){
          window.open("https://github.com/scenaristeur/agent/wiki", '_blank').focus();
        }
      }
    },
    byKey(key) {
      return function (o) {
        var v = parseInt(o[key], 10);
        return isNaN(v) ? o[key] : v;
      };
    }
  },
  watch:{
    currentNode(){
      if(this.currentNode != null){
        let val = this.currentNode.name || this.currentNode.id
        if (/\s/.test(val)) {
          // It has any kind of whitespace
          val = '"'+val+'"'
        }
        this.main_input = val+ " "
        this.$refs.input.focus()
      }
    },
    selected(){
      console.log("selected",this.selected)
      if(this.selected != null){
        let node = this.orderedNodes.find(x => x.id == this.selected)
        console.log(node)
        let val = node.name || node.id
        if (/\s/.test(val)) {
          // It has any kind of whitespace
          val = '"'+val+'"'
        }
        let input = this.main_input.trim() + " "+val
        this.main_input = input + " ,"
        this.$refs.input.focus()
      }
    },

  },
  computed: {
    currentNode() {
      return this.$store.state.core.currentNode
    },
    // nodes() {
    //   return this.$store.state.core.nodes
    // },
    orderedNodes: function () {
      return _.orderBy(this.$store.state.core.nodes, this.byKey('name'), this.order)
    },
  }
}
</script>

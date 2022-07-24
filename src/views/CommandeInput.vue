<template>
  <div>
    <input
    placeholder="test"
    v-on:keyup.enter="onEnter"
    tabindex="-1"



    />
  </div>
</template>

<script>
export default {
  name: "CommandeInput",
  data() {
    return {
      main_input: "",
    }
  },
  methods:{
    onEnter(){
      console.log("enter")
    }
  }
}
</script>

<style>

</style>

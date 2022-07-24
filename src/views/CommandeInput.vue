<template>
  <div>
    <input
    placeholder="test"
    v-on:keyup.enter="onEnter"



    />
  </div>
</template>

<script>
export default {
  name: "CommandeInput"
  methods:{
    onEnter(){
      console.log("enter")
    }
  }
}
</script>

<style>

</style>

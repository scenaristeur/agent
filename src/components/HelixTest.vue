<template>
  <div>
<b-button @click="test">Test</b-button>


  </div>
</template>

<script>
export default {
name: "HelixTest",
methods: {
  test(){
    this.$testHelix()
  }
}
}
</script>

<style>

</style>

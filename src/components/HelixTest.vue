<template>
  <div>
<b-button @click="test">Test Spiral</b-button>
<b-button @click="table">Table</b-button>
<b-button @click="sphere">Sphere</b-button>
<b-button @click="helix">Helix</b-button>
<b-button @click="grid">Grid</b-button>


  </div>
</template>

<script>
export default {
name: "HelixTest",
methods: {
  test(){
    this.$testHelix()
  },
  table(){
    this.$transformTable()
  },
  sphere(){
    this.$transformSphere()
  },
  helix(){
    this.$transformHelix()
  },
  grid(){
    this.$transformGrid()
  }
}
}
</script>

<style>

</style>

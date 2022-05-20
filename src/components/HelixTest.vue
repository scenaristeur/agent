<template>
  <div id="menu">
<button @click="test">Test Spiral</button>
<button @click="table">Table</button>
<button @click="sphere">Sphere</button>
<button @click="helix">Helix</button>
<button @click="grid">Grid</button>
<button @click="resetCam">reset cam</button>
<button @click="dynamic">dynamic</button>


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
  },
  resetCam(){
    this.$resetCam()
  },
  dynamic(){
    this.$dynamic()
  }
}
}
</script>

<style>
#menu {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
}
button {
  color: rgba(127,255,255,0.75);
  background: transparent;
  outline: 1px solid rgba(127,255,255,0.75);
  border: 0px;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: rgba(0,255,255,0.5);
}

button:active {
  color: #000000;
  background-color: rgba(0,255,255,0.75);
}
</style>

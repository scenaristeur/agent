<template>
  <div>
    <b-button @click="update">Update</b-button>
    <b-button @click="create">Create</b-button>
    command {{ soukaiNeurones }}
  </div>
</template>

<script>
export default {
  name: "SoukaiNeurones",
  created(){
    this.update()
  },
  methods: {
    create(){
      let n = { name: 'John',
      surname: 'Doe',
      birthDate: new Date(),
      interests : ["Solid", "dev"],
      contact : {email: "jhgj@ku.juyg", phone: "01234567890"},
      blop: "youhou"
    }
    this.$createNeurone(n)
  },
  update(){
    this.$loadSoukaiNeurones()
  }
},
computed: {
  soukaiNeurones() {
    return this.$store.state.soukai.neurones
  }
}
}
</script>

<style scoped>

</style>

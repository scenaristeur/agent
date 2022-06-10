<template>
  <div>
    <b-button @click="create">Create</b-button>
    command {{ soukaiNeurones }}
  </div>
</template>

<script>
export default {
  name: 'CommandInput',
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

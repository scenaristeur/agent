<template>
  <div>
    ComandInput
    <b-button @click="create">Create</b-button>
  </div>
</template>

<script>
export default {
  name: "CommandInput",
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
  }
}
}
</script>

<style scoped>

</style>

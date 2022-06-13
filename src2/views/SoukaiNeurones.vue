<template>
  <div>
    <!-- <b-button @click="findAll">Update</b-button> -->
    <b-input v-model="n.name" placeholder="name" />
    <b-button @click="create">Create</b-button>

    <CrudList :items="soukaiNeurones" />
  </div>
</template>

<script>
export default {
  name: "SoukaiNeurones",
  components: {
    'CrudList': ()=>import('@/components/crud/CrudList'),
  },
  data(){
    return {
      n :{ name: 'John',
      surname: 'Doe',
      interests : ["Solid", "dev"],
      contact : {email: "jhgj@ku.juyg", phone: "01234567890"},
      blop: "youhou"
    }
  }
},
created(){
  this.findAll()
},
methods: {
  create(){
    this.$soukai_create(this.n)
  },
  findAll(){
    this.$soukai_findAll()
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

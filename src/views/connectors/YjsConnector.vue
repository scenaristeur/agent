<template>
  <div class="yjs-connector">
    YjsConnector<br>
    <b-input v-model="room" />
    <b-button @click="createDoc">Create / Join a new collaborative brain</b-button>
  </div>
</template>

<script>
  export default {
    name: 'YjsConnector',
    data(){
      return {
        room: "drawing"
      }
    },
    methods: {
      createDoc(){
        this.$createDoc(this.room)
        this.room = ""
      }
    }


  }
</script>

<style lang="css" scoped>
  .yjs-connector {

  }
</style>

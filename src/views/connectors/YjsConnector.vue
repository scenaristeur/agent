<template>
  <div class="yjs-connector">
    YjsConnector<br>
    <b-input v-model="room" />
    <b-button @click="createDoc">Create / Join a new collaborative brain</b-button><br>
    <b-input v-model="server" /> <a href="https://github.com/ueberdosis/hocuspocus" target="_blank">server config</a>
    <b-button @click="testConnection">Test Connection</b-button>
    <div>connected : {{ connected }}</div>
  </div>
</template>

<script>
export default {
  name: 'YjsConnector',
  data() {
    return {
      room: "graphs",
      server: "ws://localhost:1234",
      connected: false
    }
  },
  methods: {
    createDoc() {
      this.$createDoc(this.room)
      this.room = ""
    },
    testConnection() {
      console.log("todo")
    }
  }


}
</script>

<style lang="css" scoped>
.yjs-connector {}
</style>

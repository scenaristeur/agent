<template>
  <div class="connector-list">
    <b-list-group>

      <b-list-group-item v-for="(c,i) in connectors" :key="i">
        <b-button @click="removeConnector(i)" variant="primary" size="sm" >X</b-button>
        {{c}}
      </b-list-group-item>
    </b-list-group>

  </div>
</template>

<script>
export default {
  name: 'ConnectorList',
  methods:{
    removeConnector(i){
      this.$store.commit('core/removeConnector',i)
    }
  },
  computed: {
    connectors() {
      return this.$store.state.core.connectors
    },
  }


}
</script>

<style lang="css" scoped>
.connector-list {

}
</style>

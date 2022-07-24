<template>
  <div>
    <div v-if="brain != undefined" >Brain: {{ brain }}</div>
    <!-- <GunGraph v-if="showGunGraph"/> -->
    <!-- <IpfsConnector /> -->
      <NodeEdition sm="6"/>
    <BrainLoader />

    <TerminalView v-if="showTerminal"/>
  </div>
</template>

<script>
export default {
  name: "SideView",
  components: {
    'NodeEdition': ()=>import('@/views/NodeEdition'),
    'BrainLoader': ()=>import('@/views/BrainLoader'),
    'TerminalView': ()=>import('@/views/TerminalView'),
    // 'GunGraph': ()=>import('@/views/experiments/GunGraph'),
    // 'IpfsConnector': ()=>import('@/views/connectors/IpfsConnector'),
  },
  computed: {
    showTerminal() {
      return this.$store.state.terminal.showTerminal
    },
    brain() {
      return this.$store.state.core.brain
    },
    showGunGraph(){
      return this.$store.state.core.galaxy.worlds.findIndex(w => w.type == "gundb" && w.active == true) > -1
    }
  }
}
</script>

<style scoped>

</style>

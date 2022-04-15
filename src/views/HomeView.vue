<template>
  <div class="home">
  <GunTest v-if="showGunTest"/>
    <BrainLoader />
    <NodeEdition />
    <CommandInput />
    <VisualisationView />
    <TerminalView v-if="showTerminal"/>
    <FabMenu />
    <ExternalSource />

  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
    'VisualisationView': ()=>import('@/views/VisualisationView'),
    'NodeEdition': ()=>import('@/views/NodeEdition'),
    'BrainLoader': ()=>import('@/views/BrainLoader'),
    'CommandInput': ()=>import('@/views/CommandInput'),
    'FabMenu': ()=>import('@/views/FabMenu'),
    'ExternalSource': ()=>import('@/views/ExternalSource'),
    'TerminalView': ()=>import('@/views/TerminalView'),
    'GunTest': ()=>import('@/views/GunTest'),
  },
  computed: {
    showTerminal() {
      return this.$store.state.terminal.showTerminal
    },
    showGunTest() {
      return this.$store.state.gun.showGunTest
    }
  }
}
</script>

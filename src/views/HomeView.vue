<template>
  <div>
    <CommandInput fluid="sm" />
    <b-row>
      <b-col md="6">
        <VisualisationView />
      </b-col>
      <b-col md="6">

        <BrainLoader />
        <NodeEdition sm="6"/>
        <TerminalView v-if="showTerminal"/>
      </b-col>
    </b-row>
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
  },
  computed: {
    showTerminal() {
      return this.$store.state.terminal.showTerminal
    }
  }
}
</script>

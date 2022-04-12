<template>
  <div class="home">

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
  },
  computed: {
    showTerminal() {
      return this.$store.state.core.showTerminal
    }
  }
}
</script>

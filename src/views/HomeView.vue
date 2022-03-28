<template>
  <div class="home">
    <BrainLoader />
    <NodeEdition />
    <CommandInput />
    <VisualisationView />
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
  },

}
</script>

<template>
  <div>

    <b-row>
      <b-col md="6">
        <VisualisationView />
      </b-col>
      <b-col md="6">
        <SideView />

      </b-col>
    </b-row>

        <CommandInput fluid="sm" />
    <FabMenu />
    <ExternalSource />
  </div>



</template>

<script>

export default {
  name: 'HomeView',
  components: {
    'VisualisationView': ()=>import('@/views/VisualisationView'),
    'CommandInput': ()=>import('@/views/CommandInput'),
    'FabMenu': ()=>import('@/views/FabMenu'),
    'ExternalSource': ()=>import('@/views/ExternalSource'),
    'SideView': ()=>import('@/views/SideView'),


  }
}
</script>

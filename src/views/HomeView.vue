<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <ToolbarView />
    <NodeEdition />
    <CommandInput />
    <VisualisationView />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    'VisualisationView': ()=>import('@/views/VisualisationView'),
    'NodeEdition': ()=>import('@/views/NodeEdition'),
    'ToolbarView': ()=>import('@/views/ToolbarView'),
    'CommandInput': ()=>import('@/views/CommandInput'),
  },
}
</script>

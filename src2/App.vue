<template>
  <div>
    <NavBar />
    <b-container fluid >
      <CommandInput />
      <b-row>
        <b-col md="6">
          <GraphView />
        </b-col>
        <b-col md="6">
          <SideView />

        </b-col>
      </b-row>
    </b-container>
    <FooTer />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    'NavBar': ()=>import('@/views/NavBar'),
    'CommandInput': ()=>import('@/views/CommandInput'),
    'GraphView': ()=>import('@/views/GraphView'),
    'SideView': ()=>import('@/views/SideView'),
    'FooTer': ()=>import('@/views/FooTer'),
    // 'DataCaching': ()=>import('@/views/experiments/DataCaching'),
  },
}
</script>

<style scoped>

</style>

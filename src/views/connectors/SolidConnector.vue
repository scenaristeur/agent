<template>
  <b-row  > Solid : <SolidLogin /> </b-row>
</template>

<script>
export default {
  name: "SolidConnector",
  components: {
    // 'ToolbarView': ()=>import('@/views/ToolbarView'),
    'SolidLogin': ()=>import('@/components/SolidLogin'),
  },
}
</script>

<style>

</style>

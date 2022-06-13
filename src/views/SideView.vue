<template>
  <div>
    side
    <SoukaiNeurones />
  </div>
</template>

<script>
export default {
  name: "SideView",
  components: {
    'SoukaiNeurones': ()=>import('@/views/SoukaiNeurones'),
  }
}
</script>

<style scoped>

</style>

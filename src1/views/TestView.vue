<template>
  <b-container>

    <SoukaiSolidTest />
    <!-- <SoukaiTest /> -->
    <!-- <DataCaching /> -->

    <SolidFriends />
    <SolidBrains />
    <IpfsBrains />
  </b-container>
</template>

<script>
export default {
  name: "TestView",
  components: {
    'SolidFriends': ()=>import('@/views/experiments/SolidFriends'),

    // 'DataCaching': ()=>import('@/views/experiments/DataCaching'),
    // 'SoukaiTest': ()=>import('@/views/experiments/SoukaiTest'),
    'SoukaiSolidTest': ()=>import('@/views/experiments/SoukaiSolidTest'),
    'SolidBrains': ()=>import('@/views/experiments/SolidBrains'),
    'IpfsBrains': ()=>import('@/views/experiments/IpfsBrains'),
  },
}
</script>

<style scoped>

</style>

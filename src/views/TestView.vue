<template>
  <b-container>
    <SoukaiSolidTest />
    <!-- <SoukaiTest /> -->
    <DataCaching />
    <GunGraph />
    <SolidFriends />
  </b-container>
</template>

<script>
export default {
  name: "TestView",
  components: {
    'SolidFriends': ()=>import('@/views/experiments/SolidFriends'),
    'GunGraph': ()=>import('@/views/experiments/GunGraph'),
    'DataCaching': ()=>import('@/views/experiments/DataCaching'),
    // 'SoukaiTest': ()=>import('@/views/experiments/SoukaiTest'),
    'SoukaiSolidTest': ()=>import('@/views/experiments/SoukaiSolidTest'),
  },
}
</script>

<style scoped>

</style>

<template>
  <div>
    <SoukaiTest />
    <DataCaching />
    <GunGraph />
    <SolidFriends />
  </div>
</template>

<script>
export default {
  name: "TestView",
  components: {
    'SolidFriends': ()=>import('@/views/SolidFriends'),
    'GunGraph': ()=>import('@/views/GunGraph'),
    'DataCaching': ()=>import('@/views/DataCaching'),
    'SoukaiTest': ()=>import('@/views/SoukaiTest'),
  },
}
</script>

<style scoped>

</style>

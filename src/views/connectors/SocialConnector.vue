<template>
  <div> Social connector   <ShareBrain style="float:right"/>
  </div>
</template>

<script>
export default {
  name: "SocialConnector",  components: {
    'ShareBrain': ()=>import('@/components/ShareBrain'),
  }
}
</script>

<style>

</style>

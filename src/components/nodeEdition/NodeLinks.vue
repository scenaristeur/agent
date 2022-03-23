<template>
  <div>
    Links
    {{ nodeLinks }}
  </div>
</template>

<script>
export default {
  name: "NodeLinks",
  computed: {
    nodeLinks() {
      return this.$store.state.core.nodeLinks
    }
  },
}
</script>

<style scoped>

</style>

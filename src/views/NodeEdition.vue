<template>
  <div>
    Niode {{ currentNode }}
  </div>
</template>

<script>
export default {
  name: "NodeEdition",

  computed: {
    currentNode() {
      return this.$store.state.core.currentNode
    }
  },


}
</script>

<style scoped>

</style>

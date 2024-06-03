<template>
  <div v-if="starts">
    Starts :
    <b-button size="sm"  v-for="s in starts" :key="s.id" @click="focus(s)" variant="outline-info">{{
      s.name
    }}</b-button>
  </div>
</template>

<script>
export default {
  name: "StartsView",
  methods: {
    focus(s) {
      let gData = this.$store.state.core.graph.graphData();
      //  console.log(nodes, links)
      let n = gData.nodes.filter((n) => n.id == s.id);
      this.$nodeFocus(n[0]);
    },
  },
  computed: {
    starts() {
      return this.$store.state.core.starts || null;
    },
  },
};
</script>

<style scoped></style>

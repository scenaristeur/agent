<template>
  <div>
    <div v-if="brain != undefined">Brain: {{ brain }}</div>
    <!-- <GunGraph v-if="showGunGraph"/> -->
    <!-- <IpfsConnector /> -->
    <!-- <YjsConnector /> -->
    <StartsView />
    <ConnectorList />
    <NodeEdition sm="6" />
    <TerminalView v-if="showTerminal" />
    <BrainLoader />
    <hr />
    <a href="https://www.youtube.com/watch?v=YT61BcjGfwc" target="_blank">DEMO video</a
    ><br />

    <a
      href="https://scenaristeur.github.io/agent?source=https://spoggy-test2.solidcommunity.net/public/brains/Chateau_des_Robots/"
      >First Brain</a
    >
  </div>
</template>

<script>
export default {
  name: "SideView",
  components: {
    NodeEdition: () => import("@/views/NodeEdition"),
    BrainLoader: () => import("@/views/BrainLoader"),
    TerminalView: () => import("@/views/TerminalView"),
    // 'GunGraph': ()=>import('@/views/experiments/GunGraph'),
    // 'IpfsConnector': ()=>import('@/views/connectors/IpfsConnector'),
    // 'YjsConnector': ()=>import('@/views/connectors/YjsConnector'),
    ConnectorList: () => import("@/views/connectors/ConnectorList"),
    StartsView: () => import("@/views/StartsView"),
  },
  computed: {
    showTerminal() {
      return this.$store.state.terminal.showTerminal;
    },
    brain() {
      return this.$store.state.core.brain;
    },
    showGunGraph() {
      return (
        this.$store.state.core.galaxy.worlds.findIndex(
          (w) => w.type == "gundb" && w.active == true
        ) > -1
      );
    },
  },
};
</script>

<style scoped></style>

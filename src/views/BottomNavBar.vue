<template>
  <div>
    <CurvedBottomNavigation :options="options" v-model="selected" />
    <input
      type="file"
      ref="uploader"
      style="display: none"
      multiple="multiple"
      @change="inputChanged"
    />
  </div>
</template>

<script>
import { CurvedBottomNavigation } from "bottom-navigation-vue";

export default {
  components: { CurvedBottomNavigation },
  data: () => ({
    selected: 1,
    files: [],
    options: [
      {
        id: 1,
        icon: "fas fa-home",
        title: "Home",
        // childs: [{ id: 101, icon: "fas fa-gifts", title: "Gifts", badge: 7 }],
      },
      //   { id: 2, icon: "fas fa-wallet", title: "Wallet" },
      {
        id: 3,
        icon: "fas fa-plus",
        title: "Add",
        childs: [
          {
            id: 31,
            icon: "fas fa-brain",
            title: "Neurone",
          },
          { id: 32, icon: "fas fa-photo-film", title: "Media" },
          { id: 33, icon: "fa-solid fa-square-up-right", title: "External source" },
          { id: 34, icon: "fa-solid fa-terminal", title: "Terminal" },
          //   { id: 301, icon: "fas fa-ticket-alt", title: "Tickets" },
        ],
      },
      { id: 4, icon: "fas fa-bell", title: "Notification", badge: 15 },
    ],
  }),
  watch: {
    selected(id) {
      console.log(id);
      switch (id) {
        case 31:
          this.$store.dispatch("core/newNode");
          break;
        case 32:
          this.$refs.uploader.click();
          break;
        case 33:
          this.$bvModal.show("modal-external-source");
          break;
        case 34:
          this.$store.commit("terminal/toggleTerminal");
          break;
        default:
          window.alert(id);
      }
    },
    files() {
      if (this.files.length > 0) {
        this.processFiles();
      }
    },
  },
  methods: {
    async processFiles() {
      console.log(this.files);
      let app = this;
      const filePromises = Array.from(this.files).map(async function (f) {
        console.log(f);
        // Return a promise per file
        app.$spinnerAdd({ id: "loading " + f.name });
        return new Promise(function (resolve, reject) {
          const reader = new FileReader();
          reader.readAsDataURL(f);
          reader.onload = async function () {
            //let base64 = reader.result
            f.base64 = await reader.result;
            console.log(f);
            let node = await app.$newNode(f);
            //  console.log(reader.result);//base64encoded string

            await app.$store.dispatch("core/saveNode", node);
            app.$spinnerRemove({ id: "loading " + f.name });

            resolve(node);
          };
          reader.onerror = function (error) {
            console.log("Error: ", error);
            reject(error);
          };
        });
      });

      // Wait for all promises to be resolved
      let medias = await Promise.all(filePromises);
      console.log(medias);
      this.files = [];
      await this.$store.dispatch("core/getNodes");
      console.log(medias[0].id);
      let id = medias[0].id;

      let n = await this.$store.state.core.nodes.find((n) => n.id == id);
      this.$store.commit("core/setCurrentNode", n);

      // let node = await this.$store.state.core.graph.graphData().nodes.find(n => n.id == id)
      // console.log(n, node)
      //       const distance = 40;
      //       let pos = {x: distance, y: distance, z: distance}
      //       // if(node.x != 0 && node.y != 0 && node.z != 0){
      //       //   console.log(pos, node.x, node.y, node.z)
      //       //   const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
      //       //   console.log(distRatio)
      //       //   pos = { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
      //       //   console.log(pos)
      //       // }
      //       console.log(pos)
      //       this.$store.state.core.graph.cameraPosition(
      //         pos, // new position
      //         node, // lookAt ({ x, y, z })
      //         3000  // ms transition duration
      //       );
      // console.log(store.state.core.graph)
      //  let n = store.state.core.nodes.find(n => n.id == node.id)

      // console.log(n)
      // this.$store.commit('core/setCurrentNode', n)
      // console.log(this.$store.state.core.graph)//.onNodeClick(n)
      //  this.$store.state.core.graph.zoomToFit(0,10,n => n.id = id)
    },
    inputChanged() {
      // console.log(e)
      // console.log(this.$refs.uploader)
      this.files = this.$refs.uploader.files;
    },
  },
};
</script>

<style scoped></style>

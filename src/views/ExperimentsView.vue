<template>
    <div>
        <button @click="add">Add</button>
        <div id="3d-graph"></div>
    </div>
</template>

<script>
import ForceGraph3D from '3d-force-graph';
// import { v4 as uuidv4 } from 'uuid';
// import { HocuspocusProvider } from '@hocuspocus/provider'
// import * as Y from "yjs";

export default {
    name: 'ExperimentsView',
    components: {
    },
    data() {
        return {
            room: "graphs",
            server: "ws://localhost:1234",
            connected: false,
            graph: null
        }
    },
    mounted() {
        const initData = {
            nodes: [{ id: 0 }],
            links: []
        }

        const elem = document.getElementById("3d-graph");

        this.graph = ForceGraph3D()(elem)
            .enableNodeDrag(false)
            .onNodeHover(node => elem.style.cursor = node ? 'pointer' : null)
            .onNodeClick(this.removeNode)
            .graphData(initData);

        // setInterval(() => {
        //     const { nodes, links } = Graph.graphData();
        //     const id = nodes.length;
        //     Graph.graphData({
        //         nodes: [...nodes, { id }],
        //         links: [...links, { source: id, target: Math.round(Math.random() * (id - 1)) }]
        //     });
        // }, 1000);

        //

    },
    methods: {
        add() {
            console.log("add")
            const { nodes, links } = this.graph.graphData();
            const id = nodes.length;
            this.graph.graphData({
                nodes: [...nodes, { id }],
                links: [...links, { source: id, target: Math.round(Math.random() * (id - 1)) }]
            });
        },

        removeNode(node) {
            let { nodes, links } = this.graph.graphData();
            links = links.filter(l => l.source !== node && l.target !== node); // Remove links attached to node
            nodes.splice(node.id, 1); // Remove node
            nodes.forEach((n, idx) => { n.id = idx; }); // Reset node ids to array index
            this.graph.graphData({ nodes, links });
        }
    }
}
</script>

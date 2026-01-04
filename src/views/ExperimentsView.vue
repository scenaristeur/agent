<template>
    <div>
        <button @click="init">Init</button> <button @click="add">Add</button>
        <div id="3d-graph"></div>
    </div>
</template>

<script>
import ForceGraph3D from '3d-force-graph';
// import { v4 as uuidv4 } from 'uuid';
import * as Y from "yjs";
import { HocuspocusProvider } from '@hocuspocus/provider'


export default {
    name: 'ExperimentsView',
    components: {
    },
    data() {
        return {
            room: "graphs",
            server: "ws://localhost:1234",
            connected: false,
            graph: null,
            ydoc: null,
            provider: null
        }
    },
    mounted() {
        this.init()

    },
    methods: {
        init() {
            // graph from https://gist.github.com/vasturiano/2f602ea6c51c664c29ec56cbe2d6a5f6
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

            // yjs from https://tiptap.dev/docs/hocuspocus/provider/install#introduction
            this.ydoc = new Y.Doc()
            this.provider = new HocuspocusProvider({
                url: 'ws://127.0.0.1:1234',
                name: 'example-document',
                document: this.ydoc,
            })


        },
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

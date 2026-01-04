<template>
    <div>
        Graph:
        <button @click="init">Init</button>
        <!-- <button @click="add">Add</button> -->
        <button @click="addNode">Add node</button>
        <button @click="logNodes">Log Nodes</button>
        YJS :
        <!-- <button @click="addNested">Add
            Nested</button>
        <button @click="setProp">Set Prop</button>
        <button @click="getProp">Get Prop</button>
        <button @click="deleteProp">Delete Prop</button> -->

        <div id="3d-graph"></div>
    </div>
</template>

<script>
import ForceGraph3D from '3d-force-graph';
import { v4 as uuidv4 } from 'uuid';
import * as Y from "yjs";
import { HocuspocusProvider } from '@hocuspocus/provider'

export default {
    name: 'ExperimentsView',
    components: {
    },
    data() {
        return {
            graph: null,
            nodes: [],
            links: [],
            // node0: { id: 0, name: "Origin", "val": 10, color: "red" },
            ydoc: null,
            provider: null,
            // ymap_brain: null,
            room: "example-room",
            server: "ws://127.0.0.1:1234",
            connected: false,
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        // GRAPH
        init() {
            this.initGraph()
            this.initYJS()
        },
        initGraph() {
            // graph from https://gist.github.com/vasturiano/2f602ea6c51c664c29ec56cbe2d6a5f6
            // const initData = {
            //     nodes: [{ id: 0 }],
            //     links: []
            // }
            this.nodes = []
            this.links = []
            // this.nodes = [...this.nodes, this.node0]
            const elem = document.getElementById("3d-graph");
            this.graph = ForceGraph3D()(elem)
                .enableNodeDrag(false)
                .onNodeHover(node => elem.style.cursor = node ? 'pointer' : null)
                .onNodeClick(this.removeNode)
                .graphData({ nodes: this.nodes, links: this.links });
        },

        addNode() {
            let id = uuidv4()
            let node = { id: id, name: "name of " + id, }
            this.nodes = [...this.nodes, node]
            let fake_id = this.nodes[0].id
            let link = { source: node.id, target: fake_id }
            console.log("link", link)
            this.links = [...this.links, link]
            this.updateGraph()
            this.yNodes.set(id, node)
            this.yLinks.push([link])
            // this.updateYjs()
        },
        add1() {
            console.log("ExperimentsView: Ajout d'un nouveau noeud");
            //const { nodes, links } = this.graph.graphData();
            const id = this.nodes.length;
            this.nodes = [...this.nodes, { id: id }]
            let link = { source: id, target: Math.round(Math.random() * (id - 1)) }
            console.log("link", link)
            this.links = [...this.links, link]
            this.updateGraph()
            this.updateYjs()
        },
        removeNode(node) {
            console.log("ExperimentsView: Suppression d'un noeud");
            // let { nodes, links } = this.graph.graphData();
            // console.log("remove ", node.id)
            this.links = this.links.filter(l => l.source.id !== node.id && l.target.id !== node.id); // Remove links attached to node
            this.nodes = this.nodes.filter(n => n.id !== node.id); // Remove node
            this.nodes.forEach((n, idx) => { n.id = idx; }); // Reset node ids to array index
            this.updateGraph()
            this.updateYjs()
            // console.log(this.nodes)
            // console.log(this.links)
        },
        updateGraph() {
            this.graph.graphData({ nodes: this.nodes, links: this.links });

        },

        logNodes() {
            console.info(this.nodes)
            console.info(this.links)
        },

        //YJS

        initYJS() {
            // yjs from https://tiptap.dev/docs/hocuspocus/provider/install#introduction
            this.ydoc = new Y.Doc()
            this.provider = new HocuspocusProvider({
                url: this.server,
                name: this.room,
                document: this.ydoc,
                // onOpen: this.onOpen,
                // onConnect: this.onConnect,
                // onAuthenticated: this.onAuthenticated,
                // onAuthenticationFailed: this.onAuthenticationFailed,
                // onStatus: this.onStatus,
                // onMessage: this.onMessage,
                // onOutgoingMessage: this.onOutgoingMessage,
                // onSynced: this.onSynced,
                // onClose: this.onClose,
                // onDisconnect: this.onDisconnect,
                // onDestroy: this.onDestroy,
                // onAwarenessUpdate: this.onAwarenessUpdate,
                // onAwarenessChange: this.onAwarenessChange,
                // onStateless: this.onStateless
            })





            // this.ymap_brain = this.ydoc.getMap('test')
            this.yNodes = this.ydoc.getMap('nodes')
            this.yLinks = this.ydoc.getArray('links')
            // this.yNodes.push([this.node0])

            this.yNodes.observe(event => {
                // event.target === yarray // => true

                // Find out what changed: 
                // Log the Array-Delta Format to calculate the difference to the last observe-event
                console.log("nodes changes", event.changes.delta)
                console.log(event.changes)
                event.changes.keys.forEach((change, key) => {
                    if (change.action === 'add') {
                        console.log(`Property "${key}" was added. Initial value: "${JSON.stringify(this.yNodes.get(key))}".`)
                        let node = this.yNodes.get(key)
                        this.addOrUpdateNode(node)
                    } else if (change.action === 'update') {
                        console.log(`Property "${key}" was updated. New value: "${JSON.stringify(this.yNodes.get(key))}". Previous value: "${JSON.stringify(change.oldValue)}".`)
                        let node = this.yNodes.get(key)
                        this.addOrUpdateNode(node)
                    } else if (change.action === 'delete') {
                        console.log(`Property "${key}" was deleted. New value: undefined. Previous value: "${JSON.stringify(change.oldValue)}".`)
                        // let node = this.yNodes.get(key)[0]
                        // this.deleteLinks(node)
                        // this.deleteNode(node)
                    }
                })
            })
            // this.updateYjs()
        },
        addOrUpdateNode(node) {
            console.log("add or update", node)
            let exist = this.nodes.find(x => x.id == node.id || x.name == node.name)
            console.log("exist?", node.id, exist)
            if (exist == undefined) {
                this.nodes = [...this.nodes, node]
            }
            this.graph.graphData({ nodes: this.nodes, links: this.links });
            // exist == undefined ? objectNode = await Vue.prototype.$newNode({ name: c.value.object }) : ""

        },
        updateYjs() {
            // let graph = { nodes: this.nodes, links: this.links }
            // console.log(graph)
            // this.ymap_brain.set('nodes', this.nodes)
            // this.ymap_brain.set('links', this.links)
        },

        // addNested() {
        //     const ymapNested = new Y.Map()

        //     // Nested types can be included as content into any other shared type
        //     this.ymap_brain.set('my nested map', ymapNested)
        // },
        // setProp() {
        //     // Common methods
        //     let date = Date.now()
        //     this.ymap_brain.set('prop-name', date) // value can be anything json-encodable
        //     console.log("added date ", date)
        // },
        // getProp() {
        //     // Common methods
        //     let d = this.ymap_brain.get('prop-name') // => 'value'
        //     console.log("date stored is", d, "but date is ", Date.now())
        //     console.log(this.ymap_brain.toJSON())
        // },
        // deleteProp() {
        //     // Common methods

        //     this.ymap_brain.delete('prop-name')
        //     console.log("deleted")
        // },
        onOpen() {
            console.info("ExperimentsView: Ouverture de la connexion");
        },
        onConnect() {
            console.info("ExperimentsView: Connexion établie");
        },
        onAuthenticated() {
            console.info("ExperimentsView: Authentification réussie");
        },
        onAuthenticationFailed({ reason }) {
            console.info(`ExperimentsView: Échec d'authentification, raison : ${JSON.stringify(reason)}`);
        },
        onStatus({ status }) {
            console.info(`ExperimentsView: Nouveau statut : ${JSON.stringify(status)}`);
        },
        onMessage({ event, message }) {
            // Gérer le message reçu
            console.info(`ExperimentsView: Message reçu, événement : ${JSON.stringify(event)}, message : ${JSON.stringify(message)}`);
        },
        onOutgoingMessage({ message }) {
            // Gérer le message sortant
            console.info(`ExperimentsView: Message sortant : ${JSON.stringify(message)}`);
        },
        onSynced({ state }) {
            // Gérer la synchronisation
            console.info(`ExperimentsView: Synchronisation réussie, état : ${JSON.stringify(state)}`);
        },
        onClose({ event }) {
            // Gérer la fermeture de la connexion
            console.info(`ExperimentsView: Fermeture de la connexion, événement : ${JSON.stringify(event)}`);
        },
        onDisconnect({ event }) {
            // Gérer la déconnexion
            console.info(`ExperimentsView: Déconnexion, événement : ${JSON.stringify(event)}`);
        },
        onDestroy() {
            // Nettoyer avant la destruction
            console.info("ExperimentsView: Destruction du composant");
        },
        onAwarenessUpdate({ added, updated, removed }) {
            // Gérer la mise à jour de la conscience
            console.info(`ExperimentsView: Mise à jour de la conscience, ajouté : ${JSON.stringify(added)}, mis à jour : ${JSON.stringify(updated)}, supprimé : ${JSON.stringify(removed)}`);
        },
        onAwarenessChange({ states }) {
            // Gérer le changement de la conscience
            console.info(`ExperimentsView: Changement de la conscience, états : ${JSON.stringify(states)}`);
        },
        onStateless({ payload }) {
            // Gérer le message stateless
            console.info(`ExperimentsView: Message stateless reçu, payload : ${JSON.stringify(payload)}`);
            // Le fournisseur peut également envoyer un message personnalisé au serveur : provider.sendStateless('n\'importe quelle chaîne de payload')
        }
    }
}
</script>
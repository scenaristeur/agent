<template>
    <div>
        <button @click="init">Init</button> <button @click="add">Add</button> <button @click="addNested">Add
            Nested</button>
        <button @click="setProp">Set Prop</button>
        <button @click="getProp">Get Prop</button>
        <button @click="deleteProp">Delete Prop</button>
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
            provider: null,
            ymap_brain: null
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

            this.ymap_brain = this.ydoc.getMap('test')
        },
        addNested() {
            const ymapNested = new Y.Map()

            // Nested types can be included as content into any other shared type
            this.ymap_brain.set('my nested map', ymapNested)
        },
        setProp() {
            // Common methods
            let date = Date.now()
            this.ymap_brain.set('prop-name', date) // value can be anything json-encodable
            console.log("added date ", date)
        },
        getProp() {
            // Common methods
            let d = this.ymap_brain.get('prop-name') // => 'value'
            console.log("date stored is", d, "but date is ", Date.now())
        },
        deleteProp() {
            // Common methods

            this.ymap_brain.delete('prop-name')
            console.log("deleted")
        },
        add() {
            console.log("ExperimentsView: Ajout d'un nouveau noeud");
            const { nodes, links } = this.graph.graphData();
            const id = nodes.length;
            this.graph.graphData({
                nodes: [...nodes, { id }],
                links: [...links, { source: id, target: Math.round(Math.random() * (id - 1)) }]
            });
        },
        removeNode(node) {
            console.log("ExperimentsView: Suppression d'un noeud");
            let { nodes, links } = this.graph.graphData();
            links = links.filter(l => l.source !== node.id && l.target !== node.id); // Remove links attached to node
            nodes = nodes.filter(n => n.id !== node.id); // Remove node
            nodes.forEach((n, idx) => { n.id = idx; }); // Reset node ids to array index
            this.graph.graphData({ nodes, links });
        },
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
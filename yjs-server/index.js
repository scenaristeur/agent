import { Server } from '@hocuspocus/server'
import { SQLite } from '@hocuspocus/extension-sqlite'

const server = new Server({
    port: 1234,

    async onConnect() {
        console.log('connect 🔮')
    },

    onOpen() {
        console.log("open")
        // …
    },

    onAuthenticated() {
        console.log("auth")
        // …
    },
    onAuthenticationFailed: ({ reason }) => {
        console.log("auth failed:", reason)
        // …
    },
    onStatus: ({ status }) => {
        console.log("status:", status)
        // …
    },
    onMessage: ({ event, message }) => {
        console.log("event, mess", event, message)
        // …
    },
    onOutgoingMessage: ({ message }) => {
        console.log("outgoing mess:", message)
        // …
    },
    onSynced: ({ state }) => {
        console.log("synced state", state)
        // …
    },
    onClose: ({ event }) => {
        console.log("close event", event)
        // …
    },
    onDisconnect: ({ event }) => {
        console.log("disconnect", event)
        // …
    },
    onDestroy() {
        console.log("destroy")
        // …
    },
    onAwarenessUpdate: ({ added, updated, removed }) => {
        // …
        console.log("awareness", added, updated, removed)
    },
    onAwarenessChange: ({ states }) => {
        console.log("ax=wareness change", states)
        // …
    },
    onStateless: ({ payload }) => {
        console.log("stateless change", payload)
        // ...
        // the provider can also send a custom message to the server: provider.sendStateless('any string payload')
    },

    extensions: [
        new SQLite({
            database: 'db.sqlite',
        }),
    ],
});

server.listen();
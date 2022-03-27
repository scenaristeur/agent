(function(){"use strict";var e={7661:function(e,t,o){var n=o(8935),r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"app"}},[o("nav",[o("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" | "),o("router-link",{attrs:{to:"/about"}},[e._v("About")])],1),o("router-view")],1)},s=[],i={name:"App",created(){this.$coreInit({name:"SuperCore"}),this.$store.dispatch("core/getNodes")}},a=i,l=o(1001),c=(0,l.Z)(a,r,s,!1,null,null,null),d=c.exports,u=o(563);(0,u.z)("/agent/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh."),alert("This app has been updated, please, close and reopen.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var p=o(2809),f=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"home"},[o("ToolbarView"),o("NodeEdition"),o("CommandInput"),o("VisualisationView")],1)},h=[],g={name:"HomeView",components:{VisualisationView:()=>o.e(649).then(o.bind(o,3649)),NodeEdition:()=>o.e(181).then(o.bind(o,1181)),ToolbarView:()=>o.e(779).then(o.bind(o,9779)),CommandInput:()=>o.e(135).then(o.bind(o,3135))}},m=g,v=(0,l.Z)(m,f,h,!1,null,null,null),y=v.exports;n["default"].use(p.Z);const w=[{path:"/",name:"home",component:y},{path:"/about",name:"about",component:()=>o.e(443).then(o.bind(o,5830))}],b=new p.Z({mode:"history",base:"/agent/",routes:w});var k=b,j=o(4665);const N="nodedb",O=1;let x;var S={async getDb(){return new Promise(((e,t)=>{if(x)return e(x);console.log("OPENING DB",x);let o=window.indexedDB.open(N,O);o.onerror=e=>{console.log("Error opening db",e),t("Error")},o.onsuccess=t=>{x=t.target.result,e(x)},o.onupgradeneeded=e=>{console.log("onupgradeneeded");let t=e.target.result;t.createObjectStore("nodes",{keyPath:"id"})}}))},async deleteNode(e){let t=await this.getDb();return new Promise((o=>{let n=t.transaction(["nodes"],"readwrite");n.oncomplete=()=>{o()};let r=n.objectStore("nodes");r.delete(e.id)}))},async clearStore(){console.log("clear store");try{let n=await this.getDb();var e=n.transaction(["nodes"],"readwrite"),t=e.objectStore("nodes"),o=t.clear();o.onsuccess=function(e){console.log(e)}}catch(n){alert(n)}await this.getNodes()},async getNodes(){let e=await this.getDb();return new Promise((t=>{let o=e.transaction(["nodes"],"readonly");o.oncomplete=()=>{t(r)};let n=o.objectStore("nodes"),r=[];n.openCursor().onsuccess=e=>{let t=e.target.result;t&&(r.push(t.value),t.continue())}}))},async saveNode(e){let t=await this.getDb();return new Promise((o=>{let n=t.transaction(["nodes"],"readwrite");n.oncomplete=()=>{o()};let r=n.objectStore("nodes");r.put(e)}))}},P=o(1519);const C=()=>({core:void 0,currentNode:void 0,brain:void 0,graph:void 0,db:void 0,commandHistory:[],command:null,nodes:[],links:[],jsonldProps:["@context","id","reverse","type"],graphProps:["__ob__","__threeObj","index","vx","vy","vz","x","y","z"]}),_={setCore(e,t){e.c=t},setCurrentNode(e,t){e.currentNode=t},setBrain(e,t){e.brain=t},setGraph(e,t){e.graph=t},setDb(e,t){e.db=t},setCommand(e,t){e.command=t},pushHistory(e,t){e.commandHistory.push(t)},setLinks(e,t){e.links=t}},A={async pushCommandHistory(e,t){if(e.commit("setCommand",t),e.commit("pushHistory",t),"triplet"==t.type){let o=e.state.nodes.find((e=>e.name==t.value.subject));if(void 0==o&&(o=n["default"].prototype.$newNode({name:t.value.subject})),t.value.predicate.startsWith(".")){let r=t.value.predicate.slice(1);console.log("add prop",r);let s=n["default"].prototype.$addProp({node:o,propertie:r,value:t.value.object});console.log(s),await e.dispatch("saveNode",s),await e.dispatch("getNodes")}else{let r=e.state.nodes.find((e=>e.name==t.value.object));void 0==r&&(r=n["default"].prototype.$newNode({name:t.value.object}));let s=n["default"].prototype.$addLink({subject:o,predicate:t.value.predicate,object:r});s.forEach((async function(t){await e.dispatch("saveNode",t)})),await e.dispatch("getNodes")}}},async newNode(e){let t=n["default"].prototype.$newNode();e.commit("setCurrentNode",t)},async saveNode(e,t){try{await S.saveNode(t)}catch(o){alert(o)}},async removeNode(e,t){if(console.log("removing",t),console.log("todo remove backlinks/reverse"),t.reverse){console.log(t.reverse);for(const[e,o]of Object.entries(t.reverse)){let n=Array.isArray(o)?o:[o];console.log(n),console.log("must remove",t.id,"in",n,e),console.log("get each node from id ")}}try{await S.deleteNode(t),e.state.links=e.state.links.filter((e=>e.source!=t.id&&e.target!=t.id)),e.state.nodes=e.state.nodes.filter((e=>e.id!=t.id)),await e.dispatch("getNodes")}catch(o){alert(o)}},async getNodes(e){let t=await S.getNodes(),o=[];console.log("nodes in db",t),t.forEach((t=>{void 0==t.type&&(t.type="neurone");var n=e.state.nodes.findIndex((e=>e.id==t.id));-1===n?e.state.nodes.push(t):Object.assign(e.state.nodes[n],t);for(let[r,s]of Object.entries(t))if(!e.state.jsonldProps.includes(r)&&!e.state.graphProps.includes(r))if(Array.isArray(s))for(let e of s)o.push({source:t.id,target:e.id,label:r});else"object"==typeof s&&void 0!=s.id&&o.push({source:t.id,target:s.id,label:r})}));let n=o.filter((t=>e.state.nodes.findIndex((e=>e.id==t.target))>-1)),r=o.filter((t=>-1===e.state.nodes.findIndex((e=>e.id==t.target))));console.log("validlinks, otherlinks",n,r),e.commit("setLinks",n)},async saveBrain(e){let{nodes:t,links:o}=e.state.graph.graphData();console.log(t,o);let n=[];for(let s of t)console.log(s),delete s.__ob__,delete s.__threeObj,void 0==s.id&&(s.id=(0,P.Z)()),void 0==s.created&&(s.created=Date.now()),s.updated=Date.now(),n.push(s.id),console.log(s),await S.saveNode(s);let r={id:(0,P.Z)(),nodes:n,type:"brain",color:"#fffff"};await S.saveNode(r)},switchTo(e,t){let o=e.state.nodes.find((e=>e.id==t));e.commit("setCurrentNode",o)}};var E={namespaced:!0,state:C,actions:A,mutations:_};const I=()=>({session:null,pod:null}),$={setSession(e,t){console.log("session",t),e.session=t},setPod(e,t){console.log("pod",t),e.pod=t}},T={};var D={namespaced:!0,state:I,actions:T,mutations:$};n["default"].use(j.ZP);var V=new j.ZP.Store({state:{},getters:{},mutations:{},actions:{},modules:{core:E,solid:D}}),L=o(5359);const H={install(e,t={}){let o=t.store;console.log(o),e.prototype.$coreInit=async function(e={}){console.log(e);let t=new L.QY(e);o.commit("core/setCore",t)}}};"undefined"!==typeof window&&window.Vue&&window.Vue.use(H);var F=H,Z=o(225),z=o(3971),B=o(9953);let G=new Set,M=null;const Y={install(e,t={}){let o=t.store;function n(e){console.log(e)}function r(e){const t=document.createElement("div");return t.textContent=e.name,t.style.color=e.color||"#ffffff",t.className="node-label",new z.j(t)}async function s(e){console.log(o.state.core.nodes[1]);const t=160,n=1+t/Math.hypot(e.x,e.y,e.z);o.state.core.graph.cameraPosition({x:e.x*n,y:e.y*n,z:e.z*n},e,3e3);let r=o.state.core.nodes.find((t=>t.id==e.id));o.commit("core/setCurrentNode",r)}console.log(o),e.prototype.$graphInit=async function(e){let t={nodes:[],links:[]},i=(0,Z.Z)({extraRenderers:[new z.M]})(e.domElement).graphData(t);i.nodeLabel("name").nodeColor((e=>G.has(e)?e===M?"rgb(255,0,0,1)":"rgba(255,160,0,0.8)":e.color)).onNodeClick((e=>s(e))).onLinkClick((e=>n(e))).nodeThreeObjectExtend(!0).nodeThreeObject((e=>r(e))).linkThreeObjectExtend(!0).linkThreeObject((e=>{if(void 0!=e.label){const t=new B.Z(`${e.label}`);return t.color="lightgrey",t.textHeight=1.5,t}})).linkDirectionalArrowLength(3.5).linkDirectionalArrowRelPos(1).linkPositionUpdate(((e,{start:t,end:o})=>{if(void 0!=e){const n=Object.assign(...["x","y","z"].map((e=>({[e]:t[e]+(o[e]-t[e])/2}))));Object.assign(e.position,n)}})),o.commit("core/setGraph",i)}}};"undefined"!==typeof window&&window.Vue&&window.Vue.use(Y);var U=Y;const W={install(e,t={}){let o=t.store;function n(e,t,o){if(void 0==e.reverse&&(e.reverse={}),void 0==e.reverse[t])e.reverse[t]={id:o.id,name:o.name};else switch(typeof e.reverse[t]){case"string":console.log("TODO string",e.reverse[t]);break;default:if(Array.isArray(e.reverse[t]))e.reverse[t].push({id:o.id,name:o.name});else{let n=e.reverse[t];e.reverse[t]=[],e.reverse[t].push(n),e.reverse[t].push({id:o.id,name:o.name})}}return console.log(e),e}function r(e,t,o){if(console.log(typeof e[t],e[t],o),void 0==e[t])e[t]={id:o.id,name:o.name};else switch(typeof e[t]){case"string":console.log("TODO string",e[t]);break;default:if(Array.isArray(e[t]))e[t].push({id:o.id,name:o.name});else{let n=e[t];e[t]=[],e[t].push(n),e[t].push({id:o.id,name:o.name})}}return console.log(e),e}console.log(o),e.prototype.$newNode=function(e={}){let t={"@context":{name:"http://xmlns.com/foaf/0.1/name",knows:"http://xmlns.com/foaf/0.1/knows","@base":"http://local/","@vocab":"https://scenaristeur.github.io/agent/",id:"@id",type:"@type",reverse:"@reverse",homepage:{"@id":"http://xmlns.com/foaf/0.1/homepage","@type":"@id"}},id:(0,P.Z)(),name:e.name||"",type:"neurone",homepage:"http://manu.sporny.org/"};return t},e.prototype.$addProp=function(e){let t=e.node,o=e.propertie,n=e.value,r=t[o];return console.log(typeof r,r),void 0==r?t[o]=n:Array.isArray(r)?t[o].push(n):t[o]=[r,n],t},e.prototype.$addLink=function(e){console.log(e);let t=e.subject,o=e.predicate,s=e.object;return t=r(t,o,s),s=n(s,o,t),[t,s]}}};"undefined"!==typeof window&&window.Vue&&window.Vue.use(W);var Q=W,R=o(3870),q=o(6732),X=o(5641),J=o(1071),K=o(2413),ee=o(3754);const te={install(e,t={}){let o=t.store;e.prototype.$checkSolidSession=async function(){await ee.handleIncomingRedirect({restorePreviousSession:!0}).then((e=>{if(1==e.isLoggedIn){console.log(`Logged in with WebID [${e.webId}]`),o.commit("solid/setSession",e);let t=ee.getDefaultSession();this.$getPodInfosFromSession(t)}}))},e.prototype.$login=async function(e){console.log("login",e),ee.getDefaultSession().info.isLoggedIn||await ee.login({oidcIssuer:e,redirectUrl:window.location.href,clientName:"Verse"})},e.prototype.$logout=async function(){let e=ee.getDefaultSession();await e.logout(),o.commit("solid/setSession",null),o.commit("solid/setPod",null),o.dispatch("nodes/clearStore")},e.prototype.$getPodInfosFromSession=async function(e){let t={};t.logged=e.info.isLoggedIn,t.logged?(t.webId=e.info.webId,t=await this.$getPodInfos(t),void 0==t.neuroneStore&&(t.neuroneStore=t.storage+"public/neurones/"),void 0==t.workspaces&&(t.workspaces=[]),o.commit("solid/setPod",t),t.storage):o.commit("solid/setPod",null)},e.prototype.$getPodInfos=async function(e){try{const t=await(0,R.OE)(e.webId,{fetch:ee.fetch});let o=await(0,q.YY)(t,e.webId);e.name=await(0,X.oX)(o,J.xY.name),e.friends=await(0,X.MQ)(o,J.xY.knows).map((e=>({webId:e}))),e.storage=await(0,X.Gr)(o,K.WS.storage),e.photo=await(0,X.Gr)(o,J.Fv.hasPhoto),void 0==e.neuroneStore&&(e.neuroneStore=e.storage+"public/neurones/"),e.workspaces=[];let n=e.storage+"settings/publicTypeIndex.ttl";const r=await(0,R.OE)(n,{fetch:ee.fetch});let s=await(0,q.oY)(r);for await(const i of s){let t=await(0,X.MQ)(i,"http://www.w3.org/ns/solid/terms#forClass");if(t.includes("https://scenaristeur.github.io/verse#Workspace")){console.log(i);let t={};t.name=await(0,X.oX)(i,J.AS.name),t.url=await(0,X.Gr)(i,K.UG.instance),e.workspaces.push(t)}}}catch(t){console.log("erreur",t,e)}return await e}}};"undefined"!==typeof window&&window.Vue&&window.Vue.use(te);var oe=te,ne=o(2510),re=o(5663);const se={install(e,t={}){let o=t.store;function n(e){var t=e.lastIndexOf("/"),o=e.substring(t+1);return console.log(o),o}console.log(o),e.prototype.$saveBrainToSolid=async function(){console.log(o.state.core.nodes);let e=o.state.solid.pod.storage+"agenttest/";console.log(e);let t=prompt("Please confirm the path where to store the nodes",e);if(console.log(t),null!=t)for await(const r of o.state.core.nodes){console.log(r.id,r),r["@context"]["@base"]=t;const e=await(0,ne._u)(t+n(r.id),new Blob([JSON.stringify(r)],{type:"application/ld+json"}),{contentType:"application/ld+json",fetch:ee.fetch});console.log(`File saved at ${(0,re.LH)(e)}`)}else alert("saving to Solid Pod aborted")}}};"undefined"!==typeof window&&window.Vue&&window.Vue.use(se);var ie=se,ae=o(8262),le=o(3266);o(44);n["default"].use(F,{store:V}),n["default"].use(U,{store:V}),n["default"].use(Q,{store:V}),n["default"].use(oe,{store:V}),n["default"].use(ie,{store:V}),n["default"].use(ae.XG7),n["default"].use(le.A7),n["default"].config.productionTip=!1,new n["default"]({router:k,store:V,render:e=>e(d)}).$mount("#app")},5359:function(e,t,o){o.d(t,{mY:function(){return a},QY:function(){return i}});var n=o(1519),r={"@context":{as:"https://www.w3.org/ns/activitystreams#",ve:"https://scenaristeur.github.io/verse#",id:"@id",type:"@type",name:"ve:name",age:"ve:age",url:"ve:url",privacy:"ve:privacy",properties:"ve:properties",links:"ve:links",synapses:"ve:synapses",created:"ve:created",updated:"ve:updated",synchronized:"ve:synchronized",previous:"ve:previous",next:"ve:next"},id:null,name:"",age:0,url:"",privacy:"private",type:null,properties:[],links:[],synapses:[],created:null,updated:null,synchronized:null,previous:null,next:null};class s{constructor(e={}){Object.assign(this,r),this.id=(0,n.Z)(),this.type="base",this.created=Date.now(),Object.assign(this,e)}debug(){console.log(this)}}class i extends s{constructor(e={}){super(e),void 0==e.type&&(this.type="core")}}class a extends s{constructor(e={}){super(e),void 0==e["type"]&&(this["type"]="command"),this.init(e.inputValue)}init(e){if(this.isValidUrl(e))this.type="url",this.value=e,this.isFile=this.isFile(e);else{let t=e.charAt(0),o="";switch(t){case"/":this.type="commande",this.value=e,this.inputNew="";break;case".":o=this.commandHistory[this.commandHistory.length-1],this.inputNew=o.s+" "+o.p+" "+o.o;break;case";":o=this.commandHistory[this.commandHistory.length-1],this.inputNew=o.s+" "+o.p+" ";break;case",":o=this.commandHistory[this.commandHistory.length-1],this.inputNew=o.s+" ";break;default:this.traiteTriplet(e)}}return this}traiteTriplet(e){var t={},o="";let n=e.slice(-1),r=e.slice(0,-1).split(" "),s=!0,i="",a=[];switch(r.forEach((function(e){e=e.trim(),e.startsWith('"')?(i="debut",a.push(e.substr(1))):e.endsWith('"')?(i="fin",a.push(a.pop()+" "+e.slice(0,-1))):"debut"==i?a.push(a.pop()+" "+e):a.push(e)})),a.length>0&&(r=a),n){case".":o="";break;case";":o=r[0].indexOf(" ")>-1?'"'+r[0]+'" ':r[0]+" ";break;case",":o=r[0].indexOf(" ")>-1?'"'+r[0]+'" ':r[0]+" ",r[1].indexOf(" ")>-1?o+='"'+r[1]+'" ':o+=r[1]+" ";break;case"-":o=r[2].indexOf(" ")>-1?'"'+r[2]+'" ':r[2]+" ";break;default:console.log("message to chat "+e),o="",s=!1}if(s){t.type="triplet";var l={};l.subject=r[0],l.predicate=r[1],l.object=r[2],t.value=l,t.inputNew=o}else t.type="message",t.value=e,t.inputNew=o;Object.assign(this,t)}isValidUrl(e){try{return new URL(e),!0}catch(t){return!1}}isFile(e){return e.split("/").pop().indexOf(".")>-1}}}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,o),s.exports}o.m=e,function(){var e=[];o.O=function(t,n,r,s){if(!n){var i=1/0;for(d=0;d<e.length;d++){n=e[d][0],r=e[d][1],s=e[d][2];for(var a=!0,l=0;l<n.length;l++)(!1&s||i>=s)&&Object.keys(o.O).every((function(e){return o.O[e](n[l])}))?n.splice(l--,1):(a=!1,s<i&&(i=s));if(a){e.splice(d--,1);var c=r();void 0!==c&&(t=c)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[n,r,s]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};o.t=function(n,r){if(1&r&&(n=this(n)),8&r)return n;if("object"===typeof n&&n){if(4&r&&n.__esModule)return n;if(16&r&&"function"===typeof n.then)return n}var s=Object.create(null);o.r(s);var i={};e=e||[null,t({}),t([]),t(t)];for(var a=2&r&&n;"object"==typeof a&&!~e.indexOf(a);a=t(a))Object.getOwnPropertyNames(a).forEach((function(e){i[e]=function(){return n[e]}}));return i["default"]=function(){return n},o.d(s,i),s}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.f={},o.e=function(e){return Promise.all(Object.keys(o.f).reduce((function(t,n){return o.f[n](e,t),t}),[]))}}(),function(){o.u=function(e){return"js/"+(443===e?"about":e)+"."+{135:"136ea871",181:"4d0fdfb5",221:"a0cf186c",443:"3d59b4d7",649:"ed8353d5",778:"bc203d4b",779:"25318e3c"}[e]+".js"}}(),function(){o.miniCssF=function(e){return"css/"+e+"."+{221:"389bce8c",649:"9af57d6c"}[e]+".css"}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="agent:";o.l=function(n,r,s,i){if(e[n])e[n].push(r);else{var a,l;if(void 0!==s)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==n||u.getAttribute("data-webpack")==t+s){a=u;break}}a||(l=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,o.nc&&a.setAttribute("nonce",o.nc),a.setAttribute("data-webpack",t+s),a.src=n),e[n]=[r];var p=function(t,o){a.onerror=a.onload=null,clearTimeout(f);var r=e[n];if(delete e[n],a.parentNode&&a.parentNode.removeChild(a),r&&r.forEach((function(e){return e(o)})),t)return t(o)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=p.bind(null,a.onerror),a.onload=p.bind(null,a.onload),l&&document.head.appendChild(a)}}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){o.p="/agent/"}(),function(){var e=function(e,t,o,n){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css";var s=function(s){if(r.onerror=r.onload=null,"load"===s.type)o();else{var i=s&&("load"===s.type?"missing":s.type),a=s&&s.target&&s.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=a,r.parentNode.removeChild(r),n(l)}};return r.onerror=r.onload=s,r.href=t,document.head.appendChild(r),r},t=function(e,t){for(var o=document.getElementsByTagName("link"),n=0;n<o.length;n++){var r=o[n],s=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(s===e||s===t))return r}var i=document.getElementsByTagName("style");for(n=0;n<i.length;n++){r=i[n],s=r.getAttribute("data-href");if(s===e||s===t)return r}},n=function(n){return new Promise((function(r,s){var i=o.miniCssF(n),a=o.p+i;if(t(i,a))return r();e(n,a,r,s)}))},r={143:0};o.f.miniCss=function(e,t){var o={221:1,649:1};r[e]?t.push(r[e]):0!==r[e]&&o[e]&&t.push(r[e]=n(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))}}(),function(){var e={143:0};o.f.j=function(t,n){var r=o.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var s=new Promise((function(o,n){r=e[t]=[o,n]}));n.push(r[2]=s);var i=o.p+o.u(t),a=new Error,l=function(n){if(o.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var s=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;a.message="Loading chunk "+t+" failed.\n("+s+": "+i+")",a.name="ChunkLoadError",a.type=s,a.request=i,r[1](a)}};o.l(i,l,"chunk-"+t,t)}},o.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,s,i=n[0],a=n[1],l=n[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(r in a)o.o(a,r)&&(o.m[r]=a[r]);if(l)var d=l(o)}for(t&&t(n);c<i.length;c++)s=i[c],o.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return o.O(d)},n=self["webpackChunkagent"]=self["webpackChunkagent"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[998],(function(){return o(7661)}));n=o.O(n)})();
//# sourceMappingURL=app.26af5dac.js.map
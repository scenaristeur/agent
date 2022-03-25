(function(){"use strict";var e={6395:function(e,t,n){n(6992),n(8674),n(9601),n(7727);var r=n(8935),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("nav",[n("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" | "),n("router-link",{attrs:{to:"/about"}},[e._v("About")])],1),n("router-view")],1)},i=[],a={name:"App",created:function(){this.$coreInit({name:"SuperCore"}),this.$store.dispatch("core/getNodes")}},s=a,u=n(1001),c=(0,u.Z)(s,o,i,!1,null,null,null),d=c.exports,l=n(563);(0,l.z)("".concat("/agent/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh."),alert("This app has been updated, please, close and reopen.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});n(1539),n(8783),n(3948);var f=n(2809),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("ToolbarView"),n("NodeEdition"),n("CommandInput"),n("VisualisationView")],1)},v=[],h={name:"HomeView",components:{VisualisationView:function(){return n.e(598).then(n.bind(n,3598))},NodeEdition:function(){return n.e(181).then(n.bind(n,1181))},ToolbarView:function(){return n.e(779).then(n.bind(n,9779))},CommandInput:function(){return n.e(135).then(n.bind(n,3135))}}},m=h,g=(0,u.Z)(m,p,v,!1,null,null,null),b=g.exports;r["default"].use(f.Z);var w,y=[{path:"/",name:"home",component:b},{path:"/about",name:"about",component:function(){return n.e(443).then(n.bind(n,5830))}}],k=new f.Z({mode:"history",base:"/agent/",routes:y}),x=k,N=n(4665),j=n(9726),Z=n(2032),O=n(5200),R=n(6198),C=(n(8975),n(9826),n(8309),n(6755),n(7042),n(4747),n(7327),n(4553),n(9720),n(6699),n(2023),"nodedb"),A=1,E={getDb:function(){return(0,R.Z)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,t){if(w)return e(w);console.log("OPENING DB",w);var n=window.indexedDB.open(C,A);n.onerror=function(e){console.log("Error opening db",e),t("Error")},n.onsuccess=function(t){w=t.target.result,e(w)},n.onupgradeneeded=function(e){console.log("onupgradeneeded");var t=e.target.result;t.createObjectStore("nodes",{keyPath:"id"})}})));case 1:case"end":return e.stop()}}),e)})))()},deleteNode:function(e){var t=this;return(0,R.Z)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.getDb();case 2:return r=n.sent,n.abrupt("return",new Promise((function(t){var n=r.transaction(["nodes"],"readwrite");n.oncomplete=function(){t()};var o=n.objectStore("nodes");o.delete(e.id)})));case 4:case"end":return n.stop()}}),n)})))()},clearStore:function(){var e=this;return(0,R.Z)(regeneratorRuntime.mark((function t(){var n,r,o,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("clear store"),t.prev=1,t.next=4,e.getDb();case 4:n=t.sent,r=n.transaction(["nodes"],"readwrite"),o=r.objectStore("nodes"),i=o.clear(),i.onsuccess=function(e){console.log(e)},t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](1),alert(t.t0);case 14:return t.next=16,e.getNodes();case 16:case"end":return t.stop()}}),t,null,[[1,11]])})))()},getNodes:function(){var e=this;return(0,R.Z)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getDb();case 2:return n=t.sent,t.abrupt("return",new Promise((function(e){var t=n.transaction(["nodes"],"readonly");t.oncomplete=function(){e(o)};var r=t.objectStore("nodes"),o=[];r.openCursor().onsuccess=function(e){var t=e.target.result;t&&(o.push(t.value),t.continue())}})));case 4:case"end":return t.stop()}}),t)})))()},saveNode:function(e){var t=this;return(0,R.Z)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.getDb();case 2:return r=n.sent,n.abrupt("return",new Promise((function(t){var n=r.transaction(["nodes"],"readwrite");n.oncomplete=function(){t()};var o=n.objectStore("nodes");o.put(e)})));case 4:case"end":return n.stop()}}),n)})))()}},_=n(905),P=function(){return{core:void 0,currentNode:void 0,brain:void 0,graph:void 0,db:void 0,commandHistory:[],command:null,nodes:[],links:[],jsonldProps:["@context","id","reverse","type"],graphProps:["__ob__","__threeObj","index","vx","vy","vz","x","y","z"]}},T={setCore:function(e,t){e.c=t},setCurrentNode:function(e,t){e.currentNode=t},setBrain:function(e,t){e.brain=t},setGraph:function(e,t){e.graph=t},setDb:function(e,t){e.db=t},setCommand:function(e,t){e.command=t},pushHistory:function(e,t){e.commandHistory.push(t)},setLinks:function(e,t){e.links=t}},D={pushCommandHistory:function(e,t){return(0,R.Z)(regeneratorRuntime.mark((function n(){var o,i,a,s,u;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e.commit("setCommand",t),e.commit("pushHistory",t),"triplet"!=t.type){n.next=22;break}if(o=e.state.nodes.find((function(e){return e.name==t.value.subject})),void 0==o&&(o=r["default"].prototype.$newNode({name:t.value.subject})),!t.value.predicate.startsWith(".")){n.next=16;break}return i=t.value.predicate.slice(1),console.log("add prop",i),a=r["default"].prototype.$addProp({node:o,propertie:i,value:t.value.object}),console.log(a),n.next=12,e.dispatch("saveNode",a);case 12:return n.next=14,e.dispatch("getNodes");case 14:n.next=22;break;case 16:return s=e.state.nodes.find((function(e){return e.name==t.value.object})),void 0==s&&(s=r["default"].prototype.$newNode({name:t.value.object})),u=r["default"].prototype.$addLink({subject:o,predicate:t.value.predicate,object:s}),u.forEach(function(){var t=(0,R.Z)(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.dispatch("saveNode",n);case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),n.next=22,e.dispatch("getNodes");case 22:case"end":return n.stop()}}),n)})))()},newNode:function(e){return(0,R.Z)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=r["default"].prototype.$newNode(),e.commit("setCurrentNode",n);case 2:case"end":return t.stop()}}),t)})))()},saveNode:function(e,t){return(0,R.Z)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E.saveNode(t);case 3:e.next=8;break;case 5:e.prev=5,e.t0=e["catch"](0),alert(e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})))()},removeNode:function(e,t){return(0,R.Z)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log("removing",t),console.log("todo remove backlinks/reverse"),n.prev=2,n.next=5,E.deleteNode(t);case 5:return e.state.links=e.state.links.filter((function(e){return e.source!=t.id&&e.target!=t.id})),e.state.nodes=e.state.nodes.filter((function(e){return e.id!=t.id})),n.next=9,e.dispatch("getNodes");case 9:n.next=14;break;case 11:n.prev=11,n.t0=n["catch"](2),alert(n.t0);case 14:case"end":return n.stop()}}),n,null,[[2,11]])})))()},getNodes:function(e){return(0,R.Z)(regeneratorRuntime.mark((function t(){var n,r,o,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,E.getNodes();case 2:n=t.sent,r=[],console.log("nodes in db",n),n.forEach((function(t){void 0==t.type&&(t.type="neurone");var n=e.state.nodes.findIndex((function(e){return e.id==t.id}));-1===n?e.state.nodes.push(t):Object.assign(e.state.nodes[n],t);for(var o=0,i=Object.entries(t);o<i.length;o++){var a=(0,O.Z)(i[o],2),s=a[0],u=a[1];if(!e.state.jsonldProps.includes(s)&&!e.state.graphProps.includes(s))if(Array.isArray(u)){var c,d=(0,Z.Z)(u);try{for(d.s();!(c=d.n()).done;){var l=c.value;r.push({source:t.id,target:l.id,label:s})}}catch(f){d.e(f)}finally{d.f()}}else"object"==(0,j.Z)(u)&&void 0!=u.id&&r.push({source:t.id,target:u.id,label:s})}})),o=r.filter((function(t){return e.state.nodes.findIndex((function(e){return e.id==t.target}))>-1})),i=r.filter((function(t){return-1===e.state.nodes.findIndex((function(e){return e.id==t.target}))})),console.log("validlinks, otherlinks",o,i),e.commit("setLinks",o);case 10:case"end":return t.stop()}}),t)})))()},saveBrain:function(e){return(0,R.Z)(regeneratorRuntime.mark((function t(){var n,r,o,i,a,s,u,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.state.graph.graphData(),r=n.nodes,o=n.links,console.log(r,o),i=[],a=(0,Z.Z)(r),t.prev=4,a.s();case 6:if((s=a.n()).done){t.next=20;break}return u=s.value,console.log(u),delete u.__ob__,delete u.__threeObj,void 0==u.id&&(u.id=(0,_.Z)()),void 0==u.created&&(u.created=Date.now()),u.updated=Date.now(),i.push(u.id),console.log(u),t.next=18,E.saveNode(u);case 18:t.next=6;break;case 20:t.next=25;break;case 22:t.prev=22,t.t0=t["catch"](4),a.e(t.t0);case 25:return t.prev=25,a.f(),t.finish(25);case 28:return c={id:(0,_.Z)(),nodes:i,type:"brain",color:"#fffff"},t.next=31,E.saveNode(c);case 31:case"end":return t.stop()}}),t,null,[[4,22,25,28]])})))()},switchTo:function(e,t){var n=e.state.nodes.find((function(e){return e.id==t}));e.commit("setCurrentNode",n)}},S={namespaced:!0,state:P,actions:D,mutations:T};r["default"].use(N.ZP);var V=new N.ZP.Store({state:{},getters:{},mutations:{},actions:{},modules:{core:S}}),H=n(5359),$={install:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.store;console.log(n),e.prototype.$coreInit=(0,R.Z)(regeneratorRuntime.mark((function e(){var t,r,o=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t=o.length>0&&void 0!==o[0]?o[0]:{},console.log(t),r=new H.QY(t),n.commit("core/setCore",r);case 4:case"end":return e.stop()}}),e)})))}};"undefined"!==typeof window&&window.Vue&&window.Vue.use($);var L=$,z=n(3796),I=n(8932),F=(n(189),n(1249),n(5438),n(956)),B=n(3971),M=n(9953),U=new Set,G=null,q={install:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.store;function r(e){console.log(e)}function o(e){var t=document.createElement("div");return t.textContent=e.name,t.style.color=e.color||"#ffffff",t.className="node-label",new B.j(t)}function i(e){return a.apply(this,arguments)}function a(){return a=(0,R.Z)(regeneratorRuntime.mark((function e(t){var r,o,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log(n.state.core.nodes[1]),r=160,o=1+r/Math.hypot(t.x,t.y,t.z),n.state.core.graph.cameraPosition({x:t.x*o,y:t.y*o,z:t.z*o},t,3e3),i=n.state.core.nodes.find((function(e){return e.id==t.id})),n.commit("core/setCurrentNode",i);case 6:case"end":return e.stop()}}),e)}))),a.apply(this,arguments)}console.log(n),e.prototype.$graphInit=function(){var e=(0,R.Z)(regeneratorRuntime.mark((function e(t){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a={nodes:[],links:[]},s=(0,F.Z)({extraRenderers:[new B.M]})(t.domElement).graphData(a),s.nodeLabel("name").nodeColor((function(e){return U.has(e)?e===G?"rgb(255,0,0,1)":"rgba(255,160,0,0.8)":e.color})).onNodeClick((function(e){return i(e)})).onLinkClick((function(e){return r(e)})).nodeThreeObjectExtend(!0).nodeThreeObject((function(e){return o(e)})).linkThreeObjectExtend(!0).linkThreeObject((function(e){if(void 0!=e.label){var t=new M.Z("".concat(e.label));return t.color="lightgrey",t.textHeight=1.5,t}})).linkDirectionalArrowLength(3.5).linkDirectionalArrowRelPos(1).linkPositionUpdate((function(e,t){var n=t.start,r=t.end;if(void 0!=e){var o=Object.assign.apply(Object,(0,I.Z)(["x","y","z"].map((function(e){return(0,z.Z)({},e,n[e]+(r[e]-n[e])/2)}))));Object.assign(e.position,o)}})),n.commit("core/setGraph",s);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}};"undefined"!==typeof window&&window.Vue&&window.Vue.use(q);var W=q,Y={install:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.store;function r(e,t,n){if(void 0==e.reverse&&(e.reverse={}),void 0==e.reverse[t])e.reverse[t]={id:n.id,name:n.name};else switch((0,j.Z)(e.reverse[t])){case"string":console.log("TODO string",e.reverse[t]);break;default:if(Array.isArray(e.reverse[t]))e.reverse[t].push({id:n.id,name:n.name});else{var r=e.reverse[t];e.reverse[t]=[],e.reverse[t].push(r),e.reverse[t].push({id:n.id,name:n.name})}}return console.log(e),e}function o(e,t,n){if(console.log((0,j.Z)(e[t]),e[t],n),void 0==e[t])e[t]={id:n.id,name:n.name};else switch((0,j.Z)(e[t])){case"string":console.log("TODO string",e[t]);break;default:if(Array.isArray(e[t]))e[t].push({id:n.id,name:n.name});else{var r=e[t];e[t]=[],e[t].push(r),e[t].push({id:n.id,name:n.name})}}return console.log(e),e}console.log(n),e.prototype.$newNode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={"@context":{name:"http://xmlns.com/foaf/0.1/name",knows:"http://xmlns.com/foaf/0.1/knows",id:"@id",type:"@type",reverse:"@reverse",homepage:{"@id":"http://xmlns.com/foaf/0.1/homepage","@type":"@id"}},id:"http://local/"+(0,_.Z)(),name:e.name||"",type:"neurone",homepage:"http://manu.sporny.org/"};return t},e.prototype.$addProp=function(e){var t=e.node,n=e.propertie,r=e.value,o=t[n];return console.log((0,j.Z)(o),o),void 0==o?t[n]=r:Array.isArray(o)?t[n].push(r):t[n]=[o,r],t},e.prototype.$addLink=function(e){console.log(e);var t=e.subject,n=e.predicate,i=e.object;return t=o(t,n,i),i=r(i,n,t),[t,i]}}};"undefined"!==typeof window&&window.Vue&&window.Vue.use(Y);var Q=Y,K=n(8262),X=n(3266);n(44);r["default"].use(L,{store:V}),r["default"].use(W,{store:V}),r["default"].use(Q,{store:V}),r["default"].use(K.XG7),r["default"].use(X.A7),r["default"].config.productionTip=!1,new r["default"]({router:x,store:V,render:function(e){return e(d)}}).$mount("#app")},5359:function(e,t,n){n.d(t,{mY:function(){return l},QY:function(){return d}});var r=n(2751),o=n(6133),i=n(9418),a=n(9161),s=n(905),u={"@context":{as:"https://www.w3.org/ns/activitystreams#",ve:"https://scenaristeur.github.io/verse#",id:"@id",type:"@type",name:"ve:name",age:"ve:age",url:"ve:url",privacy:"ve:privacy",properties:"ve:properties",links:"ve:links",synapses:"ve:synapses",created:"ve:created",updated:"ve:updated",synchronized:"ve:synchronized",previous:"ve:previous",next:"ve:next"},id:null,name:"",age:0,url:"",privacy:"private",type:null,properties:[],links:[],synapses:[],created:null,updated:null,synchronized:null,previous:null,next:null},c=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,o.Z)(this,e),Object.assign(this,u),this.id=(0,s.Z)(),this.type="base",this.created=Date.now(),Object.assign(this,t)}return(0,r.Z)(e,[{key:"debug",value:function(){console.log(this)}}]),e}(),d=function(e){(0,i.Z)(n,e);var t=(0,a.Z)(n);function n(){var e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,o.Z)(this,n),e=t.call(this,r),void 0==r.type&&(e.type="core"),e}return(0,r.Z)(n)}(c),l=(n(7042),n(4916),n(3123),n(1539),n(4747),n(3210),n(6755),n(7852),n(8783),n(3948),n(285),n(1637),function(e){(0,i.Z)(n,e);var t=(0,a.Z)(n);function n(){var e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,o.Z)(this,n),e=t.call(this,r),void 0==r["type"]&&(e["type"]="command"),e.init(r.inputValue),e}return(0,r.Z)(n,[{key:"init",value:function(e){if(this.isValidUrl(e))this.type="url",this.value=e,this.isFile=this.isFile(e);else{var t=e.charAt(0),n="";switch(t){case"/":this.type="commande",this.value=e,this.inputNew="";break;case".":n=this.commandHistory[this.commandHistory.length-1],this.inputNew=n.s+" "+n.p+" "+n.o;break;case";":n=this.commandHistory[this.commandHistory.length-1],this.inputNew=n.s+" "+n.p+" ";break;case",":n=this.commandHistory[this.commandHistory.length-1],this.inputNew=n.s+" ";break;default:this.traiteTriplet(e)}}return this}},{key:"traiteTriplet",value:function(e){var t={},n="",r=e.slice(-1),o=e.slice(0,-1).split(" "),i=!0,a="",s=[];switch(o.forEach((function(e){e=e.trim(),e.startsWith('"')?(a="debut",s.push(e.substr(1))):e.endsWith('"')?(a="fin",s.push(s.pop()+" "+e.slice(0,-1))):"debut"==a?s.push(s.pop()+" "+e):s.push(e)})),s.length>0&&(o=s),r){case".":n="";break;case";":n=o[0].indexOf(" ")>-1?'"'+o[0]+'" ':o[0]+" ";break;case",":n=o[0].indexOf(" ")>-1?'"'+o[0]+'" ':o[0]+" ",o[1].indexOf(" ")>-1?n+='"'+o[1]+'" ':n+=o[1]+" ";break;case"-":n=o[2].indexOf(" ")>-1?'"'+o[2]+'" ':o[2]+" ";break;default:console.log("message to chat "+e),n="",i=!1}if(i){t.type="triplet";var u={};u.subject=o[0],u.predicate=o[1],u.object=o[2],t.value=u,t.inputNew=n}else t.type="message",t.value=e,t.inputNew=n;Object.assign(this,t)}},{key:"isValidUrl",value:function(e){try{return new URL(e),!0}catch(t){return!1}}},{key:"isFile",value:function(e){return e.split("/").pop().indexOf(".")>-1}}]),n}(c))}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={id:r,loaded:!1,exports:{}};return e[r](i,i.exports,n),i.loaded=!0,i.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,i){if(!r){var a=1/0;for(d=0;d<e.length;d++){r=e[d][0],o=e[d][1],i=e[d][2];for(var s=!0,u=0;u<r.length;u++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](r[u])}))?r.splice(u--,1):(s=!1,i<a&&(a=i));if(s){e.splice(d--,1);var c=o();void 0!==c&&(t=c)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[r,o,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+(443===e?"about":e)+"-legacy."+{135:"d90c90a7",181:"3d3aca3c",443:"3d59b4d7",598:"59f4c71d",778:"61671649",779:"7291e8c4"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+".9af57d6c.css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="agent:";n.l=function(r,o,i,a){if(e[r])e[r].push(o);else{var s,u;if(void 0!==i)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var l=c[d];if(l.getAttribute("src")==r||l.getAttribute("data-webpack")==t+i){s=l;break}}s||(u=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+i),s.src=r),e[r]=[o];var f=function(t,n){s.onerror=s.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),u&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p="/agent/"}(),function(){var e=function(e,t,n,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var i=function(i){if(o.onerror=o.onload=null,"load"===i.type)n();else{var a=i&&("load"===i.type?"missing":i.type),s=i&&i.target&&i.target.href||t,u=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");u.code="CSS_CHUNK_LOAD_FAILED",u.type=a,u.request=s,o.parentNode.removeChild(o),r(u)}};return o.onerror=o.onload=i,o.href=t,document.head.appendChild(o),o},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],i=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(i===e||i===t))return o}var a=document.getElementsByTagName("style");for(r=0;r<a.length;r++){o=a[r],i=o.getAttribute("data-href");if(i===e||i===t)return o}},r=function(r){return new Promise((function(o,i){var a=n.miniCssF(r),s=n.p+a;if(t(a,s))return o();e(r,s,o,i)}))},o={143:0};n.f.miniCss=function(e,t){var n={598:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var i=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=i);var a=n.p+n.u(t),s=new Error,u=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var i=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",s.name="ChunkLoadError",s.type=i,s.request=a,o[1](s)}};n.l(a,u,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,i,a=r[0],s=r[1],u=r[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(u)var d=u(n)}for(t&&t(r);c<a.length;c++)i=a[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(d)},r=self["webpackChunkagent"]=self["webpackChunkagent"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(6395)}));r=n.O(r)})();
//# sourceMappingURL=app-legacy.6d3114df.js.map
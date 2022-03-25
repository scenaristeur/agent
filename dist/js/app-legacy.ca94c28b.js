(function(){"use strict";var e={6395:function(e,n,t){t(6992),t(8674),t(9601),t(7727);var r=t(8935),o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("nav",[t("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" | "),t("router-link",{attrs:{to:"/about"}},[e._v("About")])],1),t("router-view")],1)},i=[],a={name:"App",created:function(){this.$coreInit({name:"SuperCore"}),this.$store.dispatch("core/getNodes")}},s=a,u=t(1001),c=(0,u.Z)(s,o,i,!1,null,null,null),d=c.exports,l=t(563);(0,l.z)("".concat("/agent/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh."),alert("This app has been updated, please, close and reopen.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});t(1539),t(8783),t(3948);var f=t(2809),p=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"home"},[t("ToolbarView"),t("NodeEdition"),t("CommandInput"),t("VisualisationView")],1)},v=[],h={name:"HomeView",components:{VisualisationView:function(){return t.e(673).then(t.bind(t,5673))},NodeEdition:function(){return t.e(407).then(t.bind(t,9407))},ToolbarView:function(){return t.e(779).then(t.bind(t,9779))},CommandInput:function(){return t.e(135).then(t.bind(t,3135))}}},m=h,g=(0,u.Z)(m,p,v,!1,null,null,null),w=g.exports;r["default"].use(f.Z);var b,y=[{path:"/",name:"home",component:w},{path:"/about",name:"about",component:function(){return t.e(443).then(t.bind(t,5830))}}],k=new f.Z({mode:"history",base:"/agent/",routes:y}),x=k,j=t(4665),N=t(9726),Z=t(2032),O=t(5200),C=t(6198),R=(t(8975),t(9826),t(8309),t(4747),t(4553),t(9720),t(6699),t(2023),t(7327),"nodedb"),E=1,_={getDb:function(){return(0,C.Z)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){if(b)return e(b);console.log("OPENING DB",b);var t=window.indexedDB.open(R,E);t.onerror=function(e){console.log("Error opening db",e),n("Error")},t.onsuccess=function(n){b=n.target.result,e(b)},t.onupgradeneeded=function(e){console.log("onupgradeneeded");var n=e.target.result;n.createObjectStore("nodes",{keyPath:"id"})}})));case 1:case"end":return e.stop()}}),e)})))()},deleteNode:function(e){var n=this;return(0,C.Z)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.getDb();case 2:return r=t.sent,t.abrupt("return",new Promise((function(n){var t=r.transaction(["nodes"],"readwrite");t.oncomplete=function(){n()};var o=t.objectStore("nodes");o.delete(e.id)})));case 4:case"end":return t.stop()}}),t)})))()},clearStore:function(){var e=this;return(0,C.Z)(regeneratorRuntime.mark((function n(){var t,r,o,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log("clear store"),n.prev=1,n.next=4,e.getDb();case 4:t=n.sent,r=t.transaction(["nodes"],"readwrite"),o=r.objectStore("nodes"),i=o.clear(),i.onsuccess=function(e){console.log(e)},n.next=14;break;case 11:n.prev=11,n.t0=n["catch"](1),alert(n.t0);case 14:return n.next=16,e.getNodes();case 16:case"end":return n.stop()}}),n,null,[[1,11]])})))()},getNodes:function(){var e=this;return(0,C.Z)(regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.getDb();case 2:return t=n.sent,n.abrupt("return",new Promise((function(e){var n=t.transaction(["nodes"],"readonly");n.oncomplete=function(){e(o)};var r=n.objectStore("nodes"),o=[];r.openCursor().onsuccess=function(e){var n=e.target.result;n&&(o.push(n.value),n.continue())}})));case 4:case"end":return n.stop()}}),n)})))()},saveNode:function(e){var n=this;return(0,C.Z)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.getDb();case 2:return r=t.sent,t.abrupt("return",new Promise((function(n){var t=r.transaction(["nodes"],"readwrite");t.oncomplete=function(){n()};var o=t.objectStore("nodes");o.put(e)})));case 4:case"end":return t.stop()}}),t)})))()}},A=t(905),P=function(){return{core:void 0,currentNode:void 0,brain:void 0,graph:void 0,db:void 0,commandHistory:[],command:null,nodes:[],links:[],jsonldProps:["@context","id","reverse","type"],graphProps:["__ob__","__threeObj","index","vx","vy","vz","x","y","z"]}},T={setCore:function(e,n){e.c=n},setCurrentNode:function(e,n){e.currentNode=n},setBrain:function(e,n){e.brain=n},setGraph:function(e,n){e.graph=n},setDb:function(e,n){e.db=n},setCommand:function(e,n){e.command=n},pushHistory:function(e,n){e.commandHistory.push(n)},setLinks:function(e,n){e.links=n}},D={pushCommandHistory:function(e,n){return(0,C.Z)(regeneratorRuntime.mark((function t(){var o,i,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.commit("setCommand",n),e.commit("pushHistory",n),"triplet"!=n.type){t.next=11;break}return o=e.state.nodes.find((function(e){return e.name==n.value.subject})),i=e.state.nodes.find((function(e){return e.name==n.value.object})),void 0==o&&(o=r["default"].prototype.$newNode({name:n.value.subject})),void 0==i&&(i=r["default"].prototype.$newNode({name:n.value.object})),a=r["default"].prototype.$addProp({subject:o,predicate:n.value.predicate,object:i}),a.forEach(function(){var n=(0,C.Z)(regeneratorRuntime.mark((function n(t){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.dispatch("saveNode",t);case 2:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()),t.next=11,e.dispatch("getNodes");case 11:case"end":return t.stop()}}),t)})))()},newNode:function(e){return(0,C.Z)(regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t=r["default"].prototype.$newNode(),e.commit("setCurrentNode",t);case 2:case"end":return n.stop()}}),n)})))()},saveNode:function(e,n){return(0,C.Z)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,_.saveNode(n);case 3:e.next=8;break;case 5:e.prev=5,e.t0=e["catch"](0),alert(e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})))()},getNodes:function(e){return(0,C.Z)(regeneratorRuntime.mark((function n(){var t,r,o,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,_.getNodes();case 2:t=n.sent,r=[],console.log("nodes in db",t),t.forEach((function(n){void 0==n.type&&(n.type="neurone");var t=e.state.nodes.findIndex((function(e){return e.id==n.id}));-1===t?e.state.nodes.push(n):Object.assign(e.state.nodes[t],n);for(var o=0,i=Object.entries(n);o<i.length;o++){var a=(0,O.Z)(i[o],2),s=a[0],u=a[1];if(!e.state.jsonldProps.includes(s)&&!e.state.graphProps.includes(s))if(Array.isArray(u)){var c,d=(0,Z.Z)(u);try{for(d.s();!(c=d.n()).done;){var l=c.value;r.push({source:n.id,target:l.id,label:s})}}catch(f){d.e(f)}finally{d.f()}}else"object"==(0,N.Z)(u)&&void 0!=u.id&&r.push({source:n.id,target:u.id,label:s})}})),o=r.filter((function(n){return e.state.nodes.findIndex((function(e){return e.id==n.target}))>-1})),i=r.filter((function(n){return-1===e.state.nodes.findIndex((function(e){return e.id==n.target}))})),console.log("validlinks, otherlinks",o,i),e.commit("setLinks",o);case 10:case"end":return n.stop()}}),n)})))()},saveBrain:function(e){return(0,C.Z)(regeneratorRuntime.mark((function n(){var t,r,o,i,a,s,u,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t=e.state.graph.graphData(),r=t.nodes,o=t.links,console.log(r,o),i=[],a=(0,Z.Z)(r),n.prev=4,a.s();case 6:if((s=a.n()).done){n.next=20;break}return u=s.value,console.log(u),delete u.__ob__,delete u.__threeObj,void 0==u.id&&(u.id=(0,A.Z)()),void 0==u.created&&(u.created=Date.now()),u.updated=Date.now(),i.push(u.id),console.log(u),n.next=18,_.saveNode(u);case 18:n.next=6;break;case 20:n.next=25;break;case 22:n.prev=22,n.t0=n["catch"](4),a.e(n.t0);case 25:return n.prev=25,a.f(),n.finish(25);case 28:return c={id:(0,A.Z)(),nodes:i,type:"brain",color:"#fffff"},n.next=31,_.saveNode(c);case 31:case"end":return n.stop()}}),n,null,[[4,22,25,28]])})))()},switchTo:function(e,n){var t=e.state.nodes.find((function(e){return e.id==n}));e.commit("setCurrentNode",t)}},S={namespaced:!0,state:P,actions:D,mutations:T};r["default"].use(j.ZP);var V=new j.ZP.Store({state:{},getters:{},mutations:{},actions:{},modules:{core:S}}),H=t(5359),$={install:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=n.store;console.log(t),e.prototype.$coreInit=(0,C.Z)(regeneratorRuntime.mark((function e(){var n,r,o=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=o.length>0&&void 0!==o[0]?o[0]:{},console.log(n),r=new H.QY(n),t.commit("core/setCore",r);case 4:case"end":return e.stop()}}),e)})))}};"undefined"!==typeof window&&window.Vue&&window.Vue.use($);var L=$,z=t(3796),I=t(8932),F=(t(189),t(1249),t(5438),t(956)),B=t(3971),M=t(9953),U=new Set,G=null,q={install:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=n.store;function r(e){console.log(e)}function o(e){var n=document.createElement("div");return n.textContent=e.name,n.style.color=e.color||"#ffffff",n.className="node-label",new B.j(n)}function i(e){return a.apply(this,arguments)}function a(){return a=(0,C.Z)(regeneratorRuntime.mark((function e(n){var r,o,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:r=160,o=1+r/Math.hypot(n.x,n.y,n.z),t.state.core.graph.cameraPosition({x:n.x*o,y:n.y*o,z:n.z*o},n,3e3),i=t.state.core.nodes.find((function(e){return e.id==n.id})),t.commit("core/setCurrentNode",i);case 5:case"end":return e.stop()}}),e)}))),a.apply(this,arguments)}console.log(t),e.prototype.$graphInit=function(){var e=(0,C.Z)(regeneratorRuntime.mark((function e(n){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a={nodes:[],links:[]},s=(0,F.Z)({extraRenderers:[new B.M]})(n.domElement).graphData(a),s.nodeLabel("name").nodeColor((function(e){return U.has(e)?e===G?"rgb(255,0,0,1)":"rgba(255,160,0,0.8)":e.color})).onNodeClick((function(e){return i(e)})).onLinkClick((function(e){return r(e)})).nodeThreeObjectExtend(!0).nodeThreeObject((function(e){return o(e)})).linkThreeObjectExtend(!0).linkThreeObject((function(e){if(void 0!=e.label){var n=new M.Z("".concat(e.label));return n.color="lightgrey",n.textHeight=1.5,n}})).linkDirectionalArrowLength(3.5).linkDirectionalArrowRelPos(1).linkPositionUpdate((function(e,n){var t=n.start,r=n.end;if(void 0!=e){var o=Object.assign.apply(Object,(0,I.Z)(["x","y","z"].map((function(e){return(0,z.Z)({},e,t[e]+(r[e]-t[e])/2)}))));Object.assign(e.position,o)}})),t.commit("core/setGraph",s);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()}};"undefined"!==typeof window&&window.Vue&&window.Vue.use(q);var Y=q,Q={install:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=n.store;function r(e,n,t){if(void 0==e.reverse&&(e.reverse={}),void 0==e.reverse[n])e.reverse[n]={id:t.id,name:t.name};else switch((0,N.Z)(e.reverse[n])){case"string":console.log("TODO string",e.reverse[n]);break;default:if(Array.isArray(e.reverse[n]))e.reverse[n].push({id:t.id,name:t.name});else{var r=e.reverse[n];e.reverse[n]=[],e.reverse[n].push(r),e.reverse[n].push({id:t.id,name:t.name})}}return console.log(e),e}function o(e,n,t){if(console.log((0,N.Z)(e[n]),e[n],t),void 0==e[n])e[n]={id:t.id,name:t.name};else switch((0,N.Z)(e[n])){case"string":console.log("TODO string",e[n]);break;default:if(Array.isArray(e[n]))e[n].push({id:t.id,name:t.name});else{var r=e[n];e[n]=[],e[n].push(r),e[n].push({id:t.id,name:t.name})}}return console.log(e),e}console.log(t),e.prototype.$newNode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n={"@context":{name:"http://xmlns.com/foaf/0.1/name",knows:"http://xmlns.com/foaf/0.1/knows",id:"@id",type:"@type",reverse:"@reverse",homepage:{"@id":"http://xmlns.com/foaf/0.1/homepage","@type":"@id"}},id:"http://local/"+(0,A.Z)(),name:e.name||"",type:"neurone",homepage:"http://manu.sporny.org/"};return n},e.prototype.$addProp=function(e){console.log(e);var n=e.subject,t=e.predicate,i=e.object;return n=o(n,t,i),i=r(i,t,n),[n,i]}}};"undefined"!==typeof window&&window.Vue&&window.Vue.use(Q);var W=Q,K=t(8262),X=t(3266);t(44);r["default"].use(L,{store:V}),r["default"].use(Y,{store:V}),r["default"].use(W,{store:V}),r["default"].use(K.XG7),r["default"].use(X.A7),r["default"].config.productionTip=!1,new r["default"]({router:x,store:V,render:function(e){return e(d)}}).$mount("#app")},5359:function(e,n,t){t.d(n,{mY:function(){return l},QY:function(){return d}});var r=t(2751),o=t(6133),i=t(9418),a=t(9161),s=t(905),u={"@context":{as:"https://www.w3.org/ns/activitystreams#",ve:"https://scenaristeur.github.io/verse#",id:"@id",type:"@type",name:"ve:name",age:"ve:age",url:"ve:url",privacy:"ve:privacy",properties:"ve:properties",links:"ve:links",synapses:"ve:synapses",created:"ve:created",updated:"ve:updated",synchronized:"ve:synchronized",previous:"ve:previous",next:"ve:next"},id:null,name:"",age:0,url:"",privacy:"private",type:null,properties:[],links:[],synapses:[],created:null,updated:null,synchronized:null,previous:null,next:null},c=function(){function e(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,o.Z)(this,e),Object.assign(this,u),this.id=(0,s.Z)(),this.type="base",this.created=Date.now(),Object.assign(this,n)}return(0,r.Z)(e,[{key:"debug",value:function(){console.log(this)}}]),e}(),d=function(e){(0,i.Z)(t,e);var n=(0,a.Z)(t);function t(){var e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,o.Z)(this,t),e=n.call(this,r),void 0==r.type&&(e.type="core"),e}return(0,r.Z)(t)}(c),l=(t(7042),t(4916),t(3123),t(1539),t(4747),t(3210),t(6755),t(7852),t(8783),t(3948),t(285),t(1637),function(e){(0,i.Z)(t,e);var n=(0,a.Z)(t);function t(){var e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,o.Z)(this,t),e=n.call(this,r),void 0==r["type"]&&(e["type"]="command"),e.init(r.inputValue),e}return(0,r.Z)(t,[{key:"init",value:function(e){if(this.isValidUrl(e))this.type="url",this.value=e,this.isFile=this.isFile(e);else{var n=e.charAt(0),t="";switch(n){case"/":this.type="commande",this.value=e,this.inputNew="";break;case".":t=this.commandHistory[this.commandHistory.length-1],this.inputNew=t.s+" "+t.p+" "+t.o;break;case";":t=this.commandHistory[this.commandHistory.length-1],this.inputNew=t.s+" "+t.p+" ";break;case",":t=this.commandHistory[this.commandHistory.length-1],this.inputNew=t.s+" ";break;default:this.traiteTriplet(e)}}return this}},{key:"traiteTriplet",value:function(e){var n={},t="",r=e.slice(-1),o=e.slice(0,-1).split(" "),i=!0,a="",s=[];switch(o.forEach((function(e){e=e.trim(),e.startsWith('"')?(a="debut",s.push(e.substr(1))):e.endsWith('"')?(a="fin",s.push(s.pop()+" "+e.slice(0,-1))):"debut"==a?s.push(s.pop()+" "+e):s.push(e)})),s.length>0&&(o=s),r){case".":t="";break;case";":t=o[0].indexOf(" ")>-1?'"'+o[0]+'" ':o[0]+" ";break;case",":t=o[0].indexOf(" ")>-1?'"'+o[0]+'" ':o[0]+" ",o[1].indexOf(" ")>-1?t+='"'+o[1]+'" ':t+=o[1]+" ";break;case"-":t=o[2].indexOf(" ")>-1?'"'+o[2]+'" ':o[2]+" ";break;default:console.log("message to chat "+e),t="",i=!1}if(i){n.type="triplet";var u={};u.subject=o[0],u.predicate=o[1],u.object=o[2],n.value=u,n.inputNew=t}else n.type="message",n.value=e,n.inputNew=t;Object.assign(this,n)}},{key:"isValidUrl",value:function(e){try{return new URL(e),!0}catch(n){return!1}}},{key:"isFile",value:function(e){return e.split("/").pop().indexOf(".")>-1}}]),t}(c))}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var i=n[r]={id:r,loaded:!1,exports:{}};return e[r](i,i.exports,t),i.loaded=!0,i.exports}t.m=e,function(){var e=[];t.O=function(n,r,o,i){if(!r){var a=1/0;for(d=0;d<e.length;d++){r=e[d][0],o=e[d][1],i=e[d][2];for(var s=!0,u=0;u<r.length;u++)(!1&i||a>=i)&&Object.keys(t.O).every((function(e){return t.O[e](r[u])}))?r.splice(u--,1):(s=!1,i<a&&(a=i));if(s){e.splice(d--,1);var c=o();void 0!==c&&(n=c)}}return n}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[r,o,i]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})}}(),function(){t.f={},t.e=function(e){return Promise.all(Object.keys(t.f).reduce((function(n,r){return t.f[r](e,n),n}),[]))}}(),function(){t.u=function(e){return"js/"+(443===e?"about":e)+"-legacy."+{135:"d90c90a7",407:"c04d45dc",443:"3d59b4d7",673:"5f4e2728",779:"7291e8c4"}[e]+".js"}}(),function(){t.miniCssF=function(e){return"css/"+e+".9af57d6c.css"}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={},n="agent:";t.l=function(r,o,i,a){if(e[r])e[r].push(o);else{var s,u;if(void 0!==i)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var l=c[d];if(l.getAttribute("src")==r||l.getAttribute("data-webpack")==n+i){s=l;break}}s||(u=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,t.nc&&s.setAttribute("nonce",t.nc),s.setAttribute("data-webpack",n+i),s.src=r),e[r]=[o];var f=function(n,t){s.onerror=s.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((function(e){return e(t)})),n)return n(t)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),u&&document.head.appendChild(s)}}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){t.p="/agent/"}(),function(){var e=function(e,n,t,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var i=function(i){if(o.onerror=o.onload=null,"load"===i.type)t();else{var a=i&&("load"===i.type?"missing":i.type),s=i&&i.target&&i.target.href||n,u=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");u.code="CSS_CHUNK_LOAD_FAILED",u.type=a,u.request=s,o.parentNode.removeChild(o),r(u)}};return o.onerror=o.onload=i,o.href=n,document.head.appendChild(o),o},n=function(e,n){for(var t=document.getElementsByTagName("link"),r=0;r<t.length;r++){var o=t[r],i=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(i===e||i===n))return o}var a=document.getElementsByTagName("style");for(r=0;r<a.length;r++){o=a[r],i=o.getAttribute("data-href");if(i===e||i===n)return o}},r=function(r){return new Promise((function(o,i){var a=t.miniCssF(r),s=t.p+a;if(n(a,s))return o();e(r,s,o,i)}))},o={143:0};t.f.miniCss=function(e,n){var t={673:1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=r(e).then((function(){o[e]=0}),(function(n){throw delete o[e],n})))}}(),function(){var e={143:0};t.f.j=function(n,r){var o=t.o(e,n)?e[n]:void 0;if(0!==o)if(o)r.push(o[2]);else{var i=new Promise((function(t,r){o=e[n]=[t,r]}));r.push(o[2]=i);var a=t.p+t.u(n),s=new Error,u=function(r){if(t.o(e,n)&&(o=e[n],0!==o&&(e[n]=void 0),o)){var i=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;s.message="Loading chunk "+n+" failed.\n("+i+": "+a+")",s.name="ChunkLoadError",s.type=i,s.request=a,o[1](s)}};t.l(a,u,"chunk-"+n,n)}},t.O.j=function(n){return 0===e[n]};var n=function(n,r){var o,i,a=r[0],s=r[1],u=r[2],c=0;if(a.some((function(n){return 0!==e[n]}))){for(o in s)t.o(s,o)&&(t.m[o]=s[o]);if(u)var d=u(t)}for(n&&n(r);c<a.length;c++)i=a[c],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(d)},r=self["webpackChunkagent"]=self["webpackChunkagent"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=t.O(void 0,[998],(function(){return t(6395)}));r=t.O(r)})();
//# sourceMappingURL=app-legacy.ca94c28b.js.map
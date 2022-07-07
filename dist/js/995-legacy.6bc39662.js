"use strict";(self["webpackChunkagent"]=self["webpackChunkagent"]||[]).push([[995],{26995:function(e,n,t){t.r(n),t.d(n,{default:function(){return x}});var o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("b-button",{attrs:{variant:"primary"},on:{click:e.download}},[t("b-icon-file-arrow-down")],1),t("b-button",{attrs:{variant:"primary"},on:{click:function(n){return e.openFileUpload()}}},[t("b-icon-file-arrow-up")],1),t("input",{ref:"fileUpload",attrs:{type:"file",multiple:"",hidden:""},on:{change:e.loadFiles}})],1)},r=[],a=t(62032),i=t(16198),s=t(29927),c=(t(68309),t(78975),t(9726)),l=t(76133),u=t(92751),d=t(99418),f=t(49161),p=(t(74916),t(23123),t(38862),t(41539),t(78783),t(33948),t(60285),t(41637),t(61519)),v=function(){function e(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,l.Z)(this,e),this.id=(0,p.Z)(),this.type="baseConnector",this.created=Date.now(),Object.assign(this,n)}return(0,u.Z)(e,[{key:"debug",value:function(){console.log(this)}}]),e}(),h=t(25297),w=function(e){(0,d.Z)(t,e);var n=(0,f.Z)(t);function t(){var e,o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,l.Z)(this,t),e=n.call(this,o),void 0==o["type"]&&(e["type"]="LocalConnector"),e}return(0,u.Z)(t,[{key:"upload",value:function(){var e=(0,i.Z)(regeneratorRuntime.mark((function e(n,t){var o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return o=new FileReader,e.next=3,o.addEventListener("load",(function(){t(o.result)}));case 3:o.readAsText(n,"UTF-8");case 4:case"end":return e.stop()}}),e)})));function n(n,t){return e.apply(this,arguments)}return n}()},{key:"upload1",value:function(){var e=(0,i.Z)(regeneratorRuntime.mark((function e(n){var t,o,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(t=function(){var e=n[o],t=e.name;r=e.name.split(".").pop();var a=new FileReader;a.addEventListener("load",(function(){var e=a.result;switch(console.log((0,c.Z)(e),e),r){case"json":var n=JSON.parse(e);console.log(n),void 0!=n.nodes&&(console.log(n),h.Z.commit("soukai/setNeurones",n.nodes));break;default:alert("your file must be a .json file",t)}})),a.readAsText(e)},o=0;o<n.length;o++)t();case 2:case"end":return e.stop()}}),e)})));function n(n){return e.apply(this,arguments)}return n}()},{key:"downloadFile",value:function(e){var n=JSON.stringify(e.content,null,2);console.log("todo: poser la question compresser",n);var t=e.format||"json",o="",r="",a="Brain_"+Date.now(),i=prompt("Choose a name for the exported file :",a);if(null!=i&&""!=i){switch(t){case"json":o="application/json",r=i+".json";break;case"ttl":o="text/turtle",r=i+".ttl";break;case"jsonld":o="application/ld+json",r=i+".jsonld";break;default:alert("Format de fichier non reconnu",t)}var s=new Blob([n],{type:o}),c=document.createElement("a");c.download=r,c.innerHTML="Download File",-1!=navigator.userAgent.indexOf("Chrome")?c.href=window.URL.createObjectURL(s):(c.href=window.URL.createObjectURL(s),c.target="_blank",c.style.display="none",document.body.appendChild(c));var l=document.createEvent("MouseEvents");l.initMouseEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null),c.dispatchEvent(l),setTimeout((function(){document.body.removeChild(c),window.URL.revokeObjectURL(c)}),1e3)}}}]),t}(v),m={name:"LocalConnectorConnector",data:function(){return{connector:new w}},mounted:function(){console.log(this.connector)},methods:{loadFiles:function(e){var n=this;return(0,i.Z)(regeneratorRuntime.mark((function t(){var o,r,i,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:o=e.target.files,r=(0,a.Z)(o);try{for(r.s();!(i=r.n()).done;)s=i.value,n.connector.upload(s,n.processFile)}catch(c){r.e(c)}finally{r.f()}case 3:case"end":return t.stop()}}),t)})))()},processFile:function(e){var n=this;return(0,i.Z)(regeneratorRuntime.mark((function t(){var o,r,a,i,c,l,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:console.log(e),console.log(e.name),o=JSON.parse(e),console.log(),r=!1,a=!1,t.prev=6,c=(0,s.Z)(o.nodes);case 8:return t.next=10,c.next();case 10:if(!(r=!(l=t.sent).done)){t.next=20;break}return u=l.value,console.log(u),t.next=15,n.$newNode(u);case 15:return t.next=17,n.$store.dispatch("core/saveNode",u);case 17:r=!1,t.next=8;break;case 20:t.next=26;break;case 22:t.prev=22,t.t0=t["catch"](6),a=!0,i=t.t0;case 26:if(t.prev=26,t.prev=27,!r||null==c.return){t.next=31;break}return t.next=31,c.return();case 31:if(t.prev=31,!a){t.next=34;break}throw i;case 34:return t.finish(31);case 35:return t.finish(26);case 36:return console.log("end"),t.next=39,n.$store.dispatch("core/getNodes");case 39:case"end":return t.stop()}}),t,null,[[6,22,26,36],[27,,31,35]])})))()},openFileUpload:function(){this.$refs.fileUpload.click()},download:function(){console.log("download");var e={format:"json",content:{nodes:this.$store.state.core.nodes,links:this.$store.state.core.links}};this.connector.downloadFile(e)}}},g=m,k=t(1001),b=(0,k.Z)(g,o,r,!1,null,null,null),x=b.exports}}]);
//# sourceMappingURL=995-legacy.6bc39662.js.map
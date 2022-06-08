"use strict";(self["webpackChunkagent"]=self["webpackChunkagent"]||[]).push([[118],{11118:function(e,t,n){n.r(t),n.d(t,{default:function(){return d}});var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("vue-fab",{attrs:{mainBtnColor:e.mainBtnColor}},e._l(e.menu,(function(t,r){return n("fab-item",{key:r,attrs:{idx:r,title:t.title,color:t.color,icon:t.icon},on:{clickItem:e.clickItem}})})),1),n("input",{ref:"uploader",staticStyle:{display:"none"},attrs:{type:"file",multiple:"multiple"},on:{change:e.inputChanged}})],1)},o=[],i=n(16198),a=(n(78975),n(21249),n(91038),n(78783),n(68309),n(41539),n(33948),n(69826),n(50476)),s={name:"FabMenu",components:{},data:function(){return{files:[],menu:[{icon:"psychology",title:"Add a neurone",color:"#9900ff"},{icon:"add_photo_alternate",title:"Add a media",color:"#ff9900"},{icon:"toc",title:"External source",color:"#ff0099"},{icon:"terminal",title:"Terminal",color:"#999999"}],mainBtnColor:"#3eaf7c"}},methods:{clickItem:function(e){switch(e.idx){case 0:this.$store.dispatch("core/newNode");break;case 1:this.$refs.uploader.click();break;case 2:this.$bvModal.show("modal-external-source");break;case 3:this.$store.commit("terminal/toggleTerminal");break;default:window.alert(e.idx)}},processFiles:function(){var e=this;return(0,i.Z)(regeneratorRuntime.mark((function t(){var n,r,o,s,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a.log(e.files),n=e,r=Array.from(e.files).map(function(){var e=(0,i.Z)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a.log(t),n.$spinnerAdd({id:"loading "+t.name}),e.abrupt("return",new Promise((function(e,r){var o=new FileReader;o.readAsDataURL(t),o.onload=(0,i.Z)(regeneratorRuntime.mark((function r(){var i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,o.result;case 2:return t.base64=r.sent,a.log(t),r.next=6,n.$newNode(t);case 6:return i=r.sent,r.next=9,n.$store.dispatch("core/saveNode",i);case 9:n.$spinnerRemove({id:"loading "+t.name}),e(i);case 11:case"end":return r.stop()}}),r)}))),o.onerror=function(e){a.log("Error: ",e),r(e)}})));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),t.next=5,Promise.all(r);case 5:return o=t.sent,a.log(o),e.files=[],t.next=10,e.$store.dispatch("core/getNodes");case 10:return a.log(o[0].id),s=o[0].id,t.next=14,e.$store.state.core.nodes.find((function(e){return e.id==s}));case 14:c=t.sent,e.$store.commit("core/setCurrentNode",c);case 16:case"end":return t.stop()}}),t)})))()},inputChanged:function(){this.files=this.$refs.uploader.files}},watch:{files:function(){this.files.length>0&&this.processFiles()}}},c=s,l=n(1001),u=(0,l.Z)(c,r,o,!1,null,null,null),d=u.exports}}]);
//# sourceMappingURL=118-legacy.6f0cabcd.js.map
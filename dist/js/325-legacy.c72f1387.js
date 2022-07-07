"use strict";(self["webpackChunkagent"]=self["webpackChunkagent"]||[]).push([[325],{38325:function(e,t,o){o.r(t),o.d(t,{default:function(){return d}});var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[null!=e.tempNode?o("b-container",[o("b-row",[o("b-col",[o("b-button",{directives:[{name:"b-toggle",rawName:"v-b-toggle.collapse-1",modifiers:{"collapse-1":!0}}],attrs:{variant:"primary"}},[e._v("Edit "+e._s(e.tempNode.name||e.tempNode.id))]),o("b-button",{attrs:{size:"sm mr-2",variant:"outline-success"},on:{click:function(t){return t.stopPropagation(),e.copy.apply(null,arguments)}}},[o("b-icon-clipboard-plus")],1)],1),o("b-col",[o("b-button",{attrs:{variant:"danger"},on:{click:e.remove}},[e._v("Remove "+e._s(e.tempNode.name||e.tempNode.id))])],1)],1),o("b-collapse",{staticClass:"mt-2",attrs:{id:"collapse-1",visible:""}},[o("b-row",[o("b-col",{attrs:{md:"10"}},[o("b-row",[o("b-col",{attrs:{cols:"10"}},[o("b-form-input",{attrs:{placeholder:"name"},model:{value:e.tempNode.name,callback:function(t){e.$set(e.tempNode,"name",t)},expression:"tempNode.name"}})],1),o("b-col",{attrs:{cols:"6",md:"2"}},[o("b-form-input",{attrs:{type:"color",size:"sm"},model:{value:e.tempNode.color,callback:function(t){e.$set(e.tempNode,"color",t)},expression:"tempNode.color"}})],1)],1),o("b-row",[o("b-col",{attrs:{cols:"10"}},[o("b-form-input",{attrs:{placeholder:"type"},model:{value:e.tempNode.type,callback:function(t){e.$set(e.tempNode,"type",t)},expression:"tempNode.type"}})],1),o("b-col",{attrs:{cols:"6",md:"2"}},[o("b-form-select",{attrs:{options:e.options,size:"sm"},model:{value:e.tempNode.shape,callback:function(t){e.$set(e.tempNode,"shape",t)},expression:"tempNode.shape"}})],1)],1),e._l(Object.keys(e.currentNode),(function(t){return o("div",{key:t},[e.jsonldProps.includes(t)||e.graphProps.includes(t)||"reverse"==t?e._e():o("div",[o("PropertieView",{attrs:{p:t,v:e.currentNode[t]}})],1)])}))],2),o("b-col",[void 0!=e.currentNode.reverse?o("div",[o("b-button",{directives:[{name:"b-toggle",rawName:"v-b-toggle.collapse-backlinks",modifiers:{"collapse-backlinks":!0}}],attrs:{size:"sm",variant:"light"}},[e._v("Backlinks")]),o("b-collapse",{staticClass:"mt-2",attrs:{id:"collapse-backlinks"}},e._l(Object.keys(e.currentNode.reverse),(function(t,r){return o("div",{key:r},[o("PropertieView",{attrs:{p:t,v:e.currentNode.reverse[t]}})],1)})),0)],1):e._e()])],1),o("hr"),o("b-button",{on:{click:e.cancel}},[e._v("Cancel")]),o("b-button",{attrs:{variant:"success"},on:{click:e.save}},[e._v("Save")])],1)],1):e._e()],1)},n=[],s=o(16198),a=(o(78975),o(41539),o(78783),o(33948),o(23157),o(61845)),c={name:"NodeEdition",mixins:[a.Z],components:{PropertieView:function(){return o.e(250).then(o.bind(o,38250))}},data:function(){return{tempNode:null,graphProps:["__threeObj","__obj__","index","x","y","z","vx","vy","vz"],jsonldProps:["@context","id"],options:[{value:void 0,text:"shape"},{value:"sphere",text:"sphere"},{value:"box",text:"box"},{value:"cone",text:"cone"},{value:"cylinder",text:"cylinder"},{value:"dodecahedron",text:"dodecahedron"},{value:"torus",text:"torus"},{value:"torusKnot",text:"torus Knot"}]}},methods:{save:function(){var e=this;return(0,s.Z)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(e.tempNode),t.next=3,e.$store.dispatch("core/saveNode",e.tempNode);case 3:return t.next=5,e.$store.dispatch("core/getNodes");case 5:e.$store.commit("core/setCurrentNode",null);case 6:case"end":return t.stop()}}),t)})))()},cancel:function(){this.$store.commit("core/setCurrentNode",null)},remove:function(){var e=this;return(0,s.Z)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!confirm("Are you sure you want to remove this node?")){t.next=5;break}return console.log("ok to remove.",e.tempNode),t.next=4,e.$store.dispatch("core/removeNode",e.tempNode);case 4:e.$store.commit("core/setCurrentNode",null);case 5:case"end":return t.stop()}}),t)})))()},copy:function(){console.log(this.tempNode);var e=this.tempNode.id.startsWith("http")?this.tempNode.id:this.tempNode["@context"]["@base"]+this.tempNode.id;console.log("id",e);var t=e,o=this;navigator.clipboard.writeText(t).then((function(){o.makeToast("The id is in your clipboard ;-)",t+". Use Ctrl+V to use it","success")}),(function(){o.makeToast("Houston, we've got a problem with the clipboard ;-(",t,"warning")}))}},watch:{currentNode:function(){this.tempNode=this.currentNode,console.log(this.tempNode)},files:function(){this.processFiles()}},computed:{currentNode:function(){return this.$store.state.core.currentNode},graph:function(){return this.$store.state.core.graph}}},i=c,l=o(1001),u=(0,l.Z)(i,r,n,!1,null,"e84630cc",null),d=u.exports},61845:function(e,t){t["Z"]={methods:{makeToast:function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.$bvToast.toast(t,{title:e,variant:o,solid:!0})}}}}}]);
//# sourceMappingURL=325-legacy.c72f1387.js.map
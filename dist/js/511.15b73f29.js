"use strict";(self["webpackChunkagent"]=self["webpackChunkagent"]||[]).push([[511],{8511:function(e,t,o){o.r(t),o.d(t,{default:function(){return d}});var s=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[null!=e.tempNode?o("b-container",[o("b-row",[o("b-col",[o("b-button",{directives:[{name:"b-toggle",rawName:"v-b-toggle.collapse-1",modifiers:{"collapse-1":!0}}],attrs:{variant:"primary"}},[e._v("Edit "+e._s(e.tempNode.name||e.tempNode.id))]),o("b-button",{attrs:{size:"sm mr-2",variant:"outline-success"},on:{click:function(t){return t.stopPropagation(),e.copy.apply(null,arguments)}}},[o("b-icon-clipboard-plus")],1)],1),o("b-col",[o("b-button",{attrs:{variant:"danger"},on:{click:e.remove}},[e._v("Remove "+e._s(e.tempNode.name||e.tempNode.id))])],1)],1),o("b-collapse",{staticClass:"mt-2",attrs:{id:"collapse-1"}},[o("b-row",[o("b-col",{attrs:{md:"6"}},[o("b-row",[o("b-col",{attrs:{cols:"10"}},[o("b-form-input",{attrs:{placeholder:"name"},model:{value:e.tempNode.name,callback:function(t){e.$set(e.tempNode,"name",t)},expression:"tempNode.name"}})],1),o("b-col",{attrs:{cols:"6",md:"2"}},[o("b-form-input",{attrs:{type:"color",size:"sm"},model:{value:e.tempNode.color,callback:function(t){e.$set(e.tempNode,"color",t)},expression:"tempNode.color"}})],1)],1),o("b-row",[o("b-col",{attrs:{cols:"10"}},[o("b-form-input",{attrs:{placeholder:"type"},model:{value:e.tempNode.type,callback:function(t){e.$set(e.tempNode,"type",t)},expression:"tempNode.type"}})],1),o("b-col",{attrs:{cols:"6",md:"2"}},[o("b-form-select",{attrs:{options:e.options,size:"sm"},model:{value:e.tempNode.shape,callback:function(t){e.$set(e.tempNode,"shape",t)},expression:"tempNode.shape"}})],1)],1),e._l(Object.keys(e.currentNode),(function(t){return o("div",{key:t},[e.jsonldProps.includes(t)||e.graphProps.includes(t)||"reverse"==t?e._e():o("div",[o("PropertieView",{attrs:{p:t,v:e.currentNode[t]}})],1)])}))],2),o("b-col",[void 0!=e.currentNode.reverse?o("div",[o("b-button",{directives:[{name:"b-toggle",rawName:"v-b-toggle.collapse-backlinks",modifiers:{"collapse-backlinks":!0}}],attrs:{size:"sm",variant:"light"}},[e._v("Backlinks")]),o("b-collapse",{staticClass:"mt-2",attrs:{id:"collapse-backlinks"}},e._l(Object.keys(e.currentNode.reverse),(function(t,s){return o("div",{key:s},[o("PropertieView",{attrs:{p:t,v:e.currentNode.reverse[t]}})],1)})),0)],1):e._e()])],1),o("hr"),o("b-button",{on:{click:function(t){e.tempNode=null}}},[e._v("Cancel")]),o("b-button",{attrs:{variant:"success"},on:{click:e.save}},[e._v("Save")])],1)],1):e._e()],1)},r=[],a=o(1845),n={name:"NodeEdition",mixins:[a.Z],components:{PropertieView:()=>o.e(778).then(o.bind(o,7778))},data(){return{tempNode:null,graphProps:["__threeObj","__obj__","index","x","y","z","vx","vy","vz"],jsonldProps:["@context","id"],options:[{value:void 0,text:"shape"},{value:"sphere",text:"sphere"},{value:"box",text:"box"},{value:"cone",text:"cone"},{value:"cylinder",text:"cylinder"},{value:"dodecahedron",text:"dodecahedron"},{value:"torus",text:"torus"},{value:"torusKnot",text:"torus Knot"}]}},methods:{async save(){console.log(this.tempNode),await this.$store.dispatch("core/saveNode",this.tempNode),await this.$store.dispatch("core/getNodes"),this.$store.commit("core/setCurrentNode",null)},async remove(){confirm("Are you sure you want to remove this node?")&&(console.log("ok to remove.",this.tempNode),await this.$store.dispatch("core/removeNode",this.tempNode),this.$store.commit("core/setCurrentNode",null))},copy(){console.log(this.tempNode);let e=this.tempNode.id.startsWith("http")?this.tempNode.id:this.tempNode["@context"]["@base"]+this.tempNode.id;console.log("id",e);let t=e,o=this;navigator.clipboard.writeText(t).then((function(){o.makeToast("The id is in your clipboard ;-)",t+". Use Ctrl+V to use it","success")}),(function(){o.makeToast("Houston, we've got a problem with the clipboard ;-(",t,"warning")}))}},watch:{currentNode(){this.tempNode=this.currentNode,console.log(this.tempNode)}},computed:{currentNode(){return this.$store.state.core.currentNode},graph(){return this.$store.state.core.graph}}},i=n,l=o(1001),c=(0,l.Z)(i,s,r,!1,null,"d74ab214",null),d=c.exports},1845:function(e,t){t["Z"]={methods:{makeToast(e,t,o=null){this.$bvToast.toast(t,{title:e,variant:o,solid:!0})}}}}}]);
//# sourceMappingURL=511.15b73f29.js.map
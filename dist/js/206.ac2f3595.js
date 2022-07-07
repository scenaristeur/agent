"use strict";(self["webpackChunkagent"]=self["webpackChunkagent"]||[]).push([[206],{2206:function(t,e,o){o.r(e),o.d(e,{default:function(){return u}});var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return 1==t.showBrainLoader?o("b-container",[o("b-button",{on:{click:t.loadBrainFromSolid}},[t._v("Choose path for loading a brain")]),o("b-button",{on:{click:t.hide}},[t._v("Hide BrainLoader")]),void 0!=t.brains?o("b-list-group",{staticClass:"scroll"},t._l(t.items,(function(e){return o("b-list-group-item",{key:e.id,staticClass:"item list-group-item d-flex justify-content-between p-1",attrs:{button:""},on:{click:function(o){return t.loadBrain(e)}}},[o("p",{staticClass:"p-0 m-0 flex-grow-1"},[o("b",[t._v(t._s(e.name))])]),o("small",{staticClass:"mr-2"},[o("i",[t._v("created: "+t._s(new Date(e.created).toLocaleString())+" "),o("br"),t._v(" updated: "+t._s(new Date(e.updated).toLocaleString()))])]),o("b-button",{attrs:{size:"sm mr-2",variant:"outline-success"},on:{click:function(o){return o.stopPropagation(),t.open(e.id)}}},[o("b-icon-eye")],1),o("b-button",{attrs:{size:"sm mr-2",variant:"outline-success"},on:{click:function(o){return o.stopPropagation(),t.share(e.id)}}},[o("b-icon-share")],1)],1)})),1):t._e(),o("PodBrowser")],1):t._e()},n=[],a=o(1845),r={name:"BrainLoader",components:{PodBrowser:()=>o.e(793).then(o.bind(o,5793))},mixins:[a.Z],data(){return{items:[]}},methods:{loadBrain(t){console.log("loading",t),this.$loadBrainFromSolid(t.id),this.hide()},loadBrainFromSolid(){this.$loadBrainFromSolid(),this.hide()},hide(){this.$store.commit("core/setShowBrainLoader",!1)},share(t){let e="https://scenaristeur.github.io/agent?source="+t,o=this;navigator.clipboard.writeText(e).then((function(){o.makeToast("The url is in your clipboard ;-)",e+".               Use Ctrl+V to share it","success")}),(function(){o.makeToast("Houston, we've got a problem with the clipboard ;-(",e,"warning")}))},open(t){window.open(t,"_blank").focus()}},watch:{brains(){this.items=this.brains.brains.sort(((t,e)=>e.updated-t.updated))}},computed:{brains(){return this.$store.state.core.brains},showBrainLoader(){return this.$store.state.core.showBrainLoader}}},s=r,l=o(1001),c=(0,l.Z)(s,i,n,!1,null,null,null),u=c.exports},1845:function(t,e){e["Z"]={methods:{makeToast(t,e,o=null){this.$bvToast.toast(e,{title:t,variant:o,solid:!0})}}}}}]);
//# sourceMappingURL=206.ac2f3595.js.map
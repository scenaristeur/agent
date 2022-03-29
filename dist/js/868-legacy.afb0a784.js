"use strict";(self["webpackChunkagent"]=self["webpackChunkagent"]||[]).push([[868],{64868:function(t,n,i){i.r(n),i.d(n,{default:function(){return l}});var o=function(){var t=this,n=t.$createElement,i=t._self._c||n;return 1==t.showBrainLoader?i("b-container",[i("b-button",{on:{click:t.loadBrainFromSolid}},[t._v("Choose path for loading a brain")]),i("b-button",{on:{click:t.hide}},[t._v("Hide BrainLoader")]),void 0!=t.brains?i("b-list-group",t._l(t.brains.brains,(function(n){return i("b-list-group-item",{key:n.id,attrs:{button:""},on:{click:function(i){return t.loadBrain(n)}}},[i("b",[i("a",{attrs:{href:n.id,target:"_blank"}},[t._v(t._s(n.name))])]),i("small",[i("i",[t._v("created: "+t._s(n.created)+" / updated: "+t._s(n.updated))])]),i("b-button",{attrs:{size:"sm",variant:"success"},on:{click:function(i){return i.stopPropagation(),t.share(n.id)}}},[i("b-icon-share")],1)],1)})),1):t._e()],1):t._e()},a=[],r={methods:{makeToast:function(t,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.$bvToast.toast(n,{title:t,variant:i,solid:!0})}}},e={name:"BrainLoader",mixins:[r],methods:{loadBrain:function(t){console.log("loading",t),this.$loadBrainFromSolid(t.id),this.hide()},loadBrainFromSolid:function(){this.$loadBrainFromSolid(),this.hide()},hide:function(){this.$store.commit("core/setShowBrainLoader",!1)},share:function(t){var n="https://scenaristeur.github.io/agent?source="+t,i=this;navigator.clipboard.writeText(n).then((function(){i.makeToast("The url is in your clipboard ;-)",n+".               Use Ctrl+V to share it","success")}),(function(){i.makeToast("Houston, we've got a problem with the clipboard ;-(",n,"warning")}))}},computed:{brains:function(){return this.$store.state.core.brains},showBrainLoader:function(){return this.$store.state.core.showBrainLoader}}},s=e,u=i(1001),c=(0,u.Z)(s,o,a,!1,null,null,null),l=c.exports}}]);
//# sourceMappingURL=868-legacy.afb0a784.js.map
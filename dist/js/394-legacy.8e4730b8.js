"use strict";(self["webpackChunkagent"]=self["webpackChunkagent"]||[]).push([[394],{46394:function(t,n,e){e.r(n),e.d(n,{default:function(){return h}});var s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{ref:"graph",attrs:{id:"graph"}},[t._v("Loading graph...")])},i=[],r={name:"VisualisationView",mounted:function(){this.$graphInit({domElement:this.$refs.graph})},methods:{update:function(){void 0!=this.graph&&this.graph.graphData({nodes:this.nodes,links:this.links})}},watch:{nodes:function(){this.update()},links:function(){this.update()},graph:function(){this.update()}},computed:{nodes:function(){return this.$store.state.core.nodes},links:function(){return this.$store.state.core.links},graph:function(){return this.$store.state.core.graph}}},a=r,u=e(1001),o=(0,u.Z)(a,s,i,!1,null,null,null),h=o.exports}}]);
//# sourceMappingURL=394-legacy.8e4730b8.js.map
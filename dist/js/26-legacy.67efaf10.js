"use strict";(self["webpackChunkagent"]=self["webpackChunkagent"]||[]).push([[26],{1026:function(t,n,e){e.r(n),e.d(n,{default:function(){return c}});var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{ref:"graph",attrs:{id:"graph",width:"100px"}},[t._v("Loading graph...")])},r=[],s=e(4367),a=(e(21249),e(50476)),u={name:"VisualisationView",mounted:function(){this.$graphInit({domElement:this.$refs.graph})},methods:{update:function(){if(void 0!=this.graph){var t=this.nodes.map((function(t){return(0,s.Z)({},t)})),n=this.links.map((function(t){return(0,s.Z)({},t)}));this.graph.graphData({nodes:t,links:n}),a.log(this.graph.graphData())}}},watch:{nodes:function(){this.update()},links:function(){this.update()},graph:function(){this.update()}},computed:{nodes:function(){return this.$store.state.core.nodes},links:function(){return this.$store.state.core.links},graph:function(){return this.$store.state.core.graph}}},h=u,o=e(1001),p=(0,o.Z)(h,i,r,!1,null,null,null),c=p.exports}}]);
//# sourceMappingURL=26-legacy.67efaf10.js.map
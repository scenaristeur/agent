"use strict";(self["webpackChunkagent"]=self["webpackChunkagent"]||[]).push([[165],{8165:function(t,e,s){s.r(e),s.d(e,{default:function(){return o}});var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{ref:"graph",attrs:{id:"graph"}},[t._v("Loading graph...")])},r=[],n={name:"VisualisationView",mounted(){this.$graphInit({domElement:this.$refs.graph})},methods:{update(){if(void 0!=this.graph){let t=this.nodes.map((t=>({...t}))),e=this.links.map((t=>({...t})));this.graph.graphData({nodes:t,links:e})}}},watch:{nodes(){this.update()},links(){this.update()},graph(){this.update()}},computed:{nodes(){return this.$store.state.core.nodes},links(){return this.$store.state.core.links},graph(){return this.$store.state.core.graph}}},i=n,h=s(1001),u=(0,h.Z)(i,a,r,!1,null,null,null),o=u.exports}}]);
//# sourceMappingURL=165.57b28fc8.js.map
"use strict";(self["webpackChunkagent"]=self["webpackChunkagent"]||[]).push([[843],{1843:function(e,n,a){a.r(n),a.d(n,{default:function(){return d}});var o=function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("b-navbar",{attrs:{id:"navbar",toggleable:"lg",type:"dark",variant:"info"}},[a("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),a("SpinnerComp"),a("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[a("b-navbar-nav",[a("b-nav-item",{on:{click:e.newNeurone}},[e._v("new")]),a("b-nav-item",{on:{click:e.showBrainLoader}},[e._v("brains")]),a("b-nav-item",{on:{click:e.saveBrainToSolid}},[e._v("save")])],1),a("b-navbar-nav",{staticClass:"ml-auto"},[a("b-nav-item-dropdown",{attrs:{text:"graph",right:""}},[a("b-dropdown-item",{on:{click:e.clear}},[e._v("clear")]),a("b-dropdown-item",{attrs:{disabled:""}},[e._v("Reset camera")]),a("b-dropdown-item",{attrs:{disabled:""},on:{click:function(n){e.show_node_name=!e.show_node_name}}},[e._v("show node name "+e._s(e.show_node_name))]),a("b-dropdown-item",{attrs:{disabled:""},on:{click:function(n){e.show_link_label=!e.show_link_label}}},[e._v("show link label "+e._s(e.show_link_label))])],1),a("SolidLogin")],1)],1)],1)},t=[],r={name:"NavBar",components:{SolidLogin:()=>a.e(600).then(a.bind(a,600)),SpinnerComp:()=>a.e(214).then(a.bind(a,1214))},data(){return{show_node_name:!0,show_link_label:!0}},methods:{newNeurone(){this.$store.dispatch("core/newNode")},saveBrainToSolid(){this.$saveBrainToSolid()},showBrainLoader(){this.$store.commit("core/setShowBrainLoader",!0)},clear(){confirm("Are you sure you want to remove all nodes?")&&(this.$store.dispatch("core/removeAllNodes"),this.$store.commit("core/setCurrentNode",null))}}},i=r,s=a(1001),l=(0,s.Z)(i,o,t,!1,null,null,null),d=l.exports}}]);
//# sourceMappingURL=843.a3c85c89.js.map
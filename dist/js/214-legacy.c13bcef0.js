"use strict";(self["webpackChunkagent"]=self["webpackChunkagent"]||[]).push([[214],{51214:function(n,t,e){e.r(t),e.d(t,{default:function(){return u}});var s=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("span",[n.spinner.length>0?e("span",[e("b-button",{attrs:{variant:"warning",disabled:""}},[e("b-spinner",{attrs:{small:"",type:"grow"}}),e("b-badge",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-tasks",modifiers:{"modal-tasks":!0}}],attrs:{variant:"primary"}},[n._v(n._s(n.spinner.length))])],1)],1):n._e(),e("b-modal",{attrs:{id:"modal-tasks",title:"Tasks"}},[n._v(" "+n._s(n.spinner.length)+" tasks pending "),e("b-button",{attrs:{variant:"outline-warning",size:"sm"},on:{click:n.reset}},[n._v("reset")]),e("ul",n._l(n.spinner,(function(t){return e("li",{key:t.id},[n._v(" "+n._s(t.id))])})),0)],1)],1)},r=[],a={name:"SpinnerComp",methods:{reset:function(){this.$store.commit("core/resetSpinner")}},computed:{spinner:function(){return this.$store.state.core.spinner}}},i=a,l=e(1001),o=(0,l.Z)(i,s,r,!1,null,null,null),u=o.exports}}]);
//# sourceMappingURL=214-legacy.c13bcef0.js.map
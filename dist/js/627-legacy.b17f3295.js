"use strict";(self["webpackChunkagent"]=self["webpackChunkagent"]||[]).push([[627],{1627:function(t,n,e){e.r(n),e.d(n,{default:function(){return l}});var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[null!=t.pod?e("b-list-group",t._l(t.friends,(function(n){return e("b-list-group-item",{key:n.webid,attrs:{button:""}},[t._v(" "+t._s(n.webId)+" "),e("FriendDetail",{attrs:{friend:n}})],1)})),1):t._e()],1)},r=[],s=(e(41539),e(78783),e(33948),e(69826),e(68309),e(50476)),d={name:"SolidFriends",data:function(){return{friends:[]}},components:{FriendDetail:function(){return e.e(536).then(e.bind(e,7536))}},methods:{updateFriends:function(){if(null!=this.pod&&void 0!=this.galaxy){var t=this.galaxy.worlds.find((function(t){return"Solid Friends"==t.name}));s.log(t),1==t.active?this.friends=this.pod.friends:this.friends=[]}}},watch:{pod:function(){this.updateFriends()},galaxy:function(){this.updateFriends()}},computed:{pod:function(){return this.$store.state.solid.pod},galaxy:function(){return this.$store.state.core.galaxy}}},u=d,o=e(1001),a=(0,o.Z)(u,i,r,!1,null,null,null),l=a.exports}}]);
//# sourceMappingURL=627-legacy.b17f3295.js.map
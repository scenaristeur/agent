"use strict";(self["webpackChunkagent"]=self["webpackChunkagent"]||[]).push([[536],{7536:function(e,n,t){t.r(n),t.d(n,{default:function(){return h}});var s=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[null!=e.friend?t("div",[null!=e.friend.photo&&e.friend.photo.length>0?t("img",{attrs:{src:e.friend.photo,width:"50"}}):e._e(),e.friend.name?t("b",[e._v(e._s(e.name))]):e._e(),t("fieldset",[t("legend",[e._v(" infos ")]),e._v(" "+e._s(e.infos)+" ")])]):e._e(),t("h2",[e._v("details :")]),e._v(" "+e._s(e.friend)+" "),t("hr"),e._v(" remotesUrl : "+e._s(e.remotesUrl)+" ")])},i=[],o=t(476),r={name:"FriendDetail",props:["friend"],data(){return{name:"",storage:".",neuroneStore:"..",friends:[],infos:null,remotesUrl:[]}},methods:{async getPodInfos(){this.infos=await this.$getPodInfos(this.friend),this.remotesUrl=await this.$brainsFromPod(this.friend)}},watch:{async podInfos(){o.log("friend",this.podInfos),this.name=await this.podInfos.name,this.storage=await this.podInfos.storage,this.friends=await this.podInfos.friends}},computed:{podInfos(){return this.getPodInfos()}}},a=r,d=t(1001),f=(0,d.Z)(a,s,i,!1,null,null,null),h=f.exports}}]);
//# sourceMappingURL=536.846a7c5d.js.map
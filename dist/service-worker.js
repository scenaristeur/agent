if(!self.define){let e,s={};const n=(n,l)=>(n=new URL(n+".js",l).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(l,r)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const t=e=>n(e,i),u={module:{uri:i},exports:c,require:t};s[i]=Promise.all(l.map((e=>u[e]||t(e)))).then((e=>(r(...e),c)))}}define(["./workbox-f3ddde50"],(function(e){"use strict";e.setCacheNameDetails({prefix:"agent"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/agent/css/155.b4904072.css",revision:null},{url:"/agent/css/165.9af57d6c.css",revision:null},{url:"/agent/css/600.cc4d8120.css",revision:null},{url:"/agent/css/843.3dd4c5f9.css",revision:null},{url:"/agent/css/app.53a9e9c7.css",revision:null},{url:"/agent/css/chunk-vendors.339c5200.css",revision:null},{url:"/agent/index.html",revision:"3d40ae0e0dca51b5ccb19a674ecadae1"},{url:"/agent/js/155.00b66a3a.js",revision:null},{url:"/agent/js/165.57b28fc8.js",revision:null},{url:"/agent/js/214.11430a68.js",revision:null},{url:"/agent/js/419.b1ca789f.js",revision:null},{url:"/agent/js/58.fec50ff6.js",revision:null},{url:"/agent/js/600.8db2b9cf.js",revision:null},{url:"/agent/js/778.bc203d4b.js",revision:null},{url:"/agent/js/843.a3c85c89.js",revision:null},{url:"/agent/js/app.2d764ac8.js",revision:null},{url:"/agent/manifest.json",revision:"b7c324c9d792aac96df56e51ee506dbf"},{url:"/agent/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map

if(!self.define){let s,e={};const n=(n,l)=>(n=new URL(n+".js",l).href,e[n]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=e,document.head.appendChild(s)}else s=n,importScripts(n),e()})).then((()=>{let s=e[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(l,r)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let u={};const a=s=>n(s,i),t={module:{uri:i},exports:u,require:a};e[i]=Promise.all(l.map((s=>t[s]||a(s)))).then((s=>(r(...s),u)))}}define(["./workbox-2d118ab0"],(function(s){"use strict";s.setCacheNameDetails({prefix:"agent"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/agent/css/17.2bf21112.css",revision:null},{url:"/agent/css/236.3dd4c5f9.css",revision:null},{url:"/agent/css/26.9af57d6c.css",revision:null},{url:"/agent/css/444.cc4d8120.css",revision:null},{url:"/agent/css/578.aa5514ea.css",revision:null},{url:"/agent/css/995.728fbe8d.css",revision:null},{url:"/agent/css/app.53a9e9c7.css",revision:null},{url:"/agent/css/chunk-vendors.6516fab7.css",revision:null},{url:"/agent/index.html",revision:"5aaadfe5885b987ea76d14ab0d06e5f9"},{url:"/agent/js/118.c23d282c.js",revision:null},{url:"/agent/js/17.abcebc4f.js",revision:null},{url:"/agent/js/182.d61baae9.js",revision:null},{url:"/agent/js/214.02dfcd0c.js",revision:null},{url:"/agent/js/236.6d4dcf0f.js",revision:null},{url:"/agent/js/250.145f525d.js",revision:null},{url:"/agent/js/26.d40334d3.js",revision:null},{url:"/agent/js/267.a9e164ed.js",revision:null},{url:"/agent/js/325.1df8eec0.js",revision:null},{url:"/agent/js/34.f29bbf12.js",revision:null},{url:"/agent/js/444.93b855f6.js",revision:null},{url:"/agent/js/578.a8a0cda3.js",revision:null},{url:"/agent/js/601.955f0abd.js",revision:null},{url:"/agent/js/915.7ae161c8.js",revision:null},{url:"/agent/js/97.3801adab.js",revision:null},{url:"/agent/js/995.c4b220f3.js",revision:null},{url:"/agent/js/app.9d7e253a.js",revision:null},{url:"/agent/manifest.json",revision:"b7c324c9d792aac96df56e51ee506dbf"},{url:"/agent/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map

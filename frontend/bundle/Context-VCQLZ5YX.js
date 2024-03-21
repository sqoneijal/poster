import{a as Y,b as g,c as S,d as P,e as O,j as c,k as C,l as E,m as I}from"./chunk-NPAHAIHH.js";var _=Y((w,j)=>{var N=g(S());(function(h,s){typeof w=="object"&&typeof j=="object"?j.exports=s(P()):typeof define=="function"&&define.amd?define(["react"],s):typeof w=="object"?w.Switch=s(P()):h.Switch=s(h.react)})(w,function(h){return function(s){var a={};function t(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return s[e].call(n.exports,n,n.exports,t),n.l=!0,n.exports}return t.m=s,t.c=a,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n||4&n&&typeof e=="object"&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&typeof e!="string")for(var f in e)t.d(r,f,function(v){return e[v]}.bind(null,f));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s=1)}([function(s,a){s.exports=h},function(s,a,t){"use strict";t.r(a),t.d(a,"Case",function(){return f}),t.d(a,"Default",function(){return v});var e=t(0);function n(p,u,y){return u in p?Object.defineProperty(p,u,{value:y,enumerable:!0,configurable:!0,writable:!0}):p[u]=y,p}class r extends e.Component{getChildren(){let u=[],y=[];return e.Children.forEach(this.props.children,d=>{switch(d.type.componentName){case"case":typeof this.props.condition=="function"?this.props.condition(d.props.value)&&u.push(d):this.props.condition===d.props.value&&u.push(d);break;case"default":y.push(d)}}),u.length>0?u:y}render(){let u=this.getChildren();return u.length===0?null:u}}class f extends e.Component{render(){return this.props.children}}n(f,"componentName","case");class v extends e.Component{render(){return this.props.children}}n(v,"componentName","default"),a.default=r}])})});var W=g(S()),o=g(P());var b=g(_());var x=1,m,D,M=({apiUrl:h})=>{let{module:s}=O(l=>l.redux),{listContent:a}=s,t=(0,o.useRef)(null),[e,n]=(0,o.useState)([]),[r,f]=(0,o.useState)({});(0,o.useLayoutEffect)(()=>(E(r)&&(c("caption",r)==="youtube"&&p(r),c("caption",r)==="video"&&v(r),c("caption",r)==="images"&&(D=setInterval(()=>{d(e,x++)},3e3))),()=>{}),[r]);let v=l=>{let i=t.current;i.play(),i.addEventListener("play",()=>{i.muted=!1}),i.addEventListener("ended",()=>{d(e,x++),i.pause(),i.src="",i.load()})},p=l=>{m=new YT.Player("youtube-player",{height:"100%",width:"100%",videoId:I(c("value",l)),playerVars:{mute:1,controls:0,autoPlay:1},events:{onReady:y,onStateChange:u}})},u=l=>{l.data==YT.PlayerState.PLAYING?m.unMute():l.data===YT.PlayerState.ENDED&&(m.stopVideo(),m.destroy(),m=null,d(e,x++))},y=()=>{m&&m.playVideo()},d=(l,i)=>{typeof l[i]>"u"?window.location.reload():f(l[i]),clearInterval(D)};return(0,o.useLayoutEffect)(()=>{if(C(a)){let l=["images","video","youtube"],i=[];a.forEach(L=>{l.includes(c("caption",L))&&i.push(L)}),C(i)&&(n(i),f(i[0]))}return()=>{}},[a]),o.default.createElement(b.default,{condition:c("caption",r)},o.default.createElement(b.Case,{value:"youtube"},o.default.createElement("div",{id:"youtube-player",style:{height:window.innerHeight,width:window.innerWidth}})),o.default.createElement(b.Case,{value:"video"},o.default.createElement("video",{ref:t,src:`${h}/video/${c("value",r)}`,muted:!0,style:{height:window.innerHeight,width:window.innerWidth}})),o.default.createElement(b.Case,{value:"images"},o.default.createElement("img",{src:`${h}/getfile/images/${c("value",r)}`,alt:c("value",r),style:{height:window.innerHeight,width:window.innerWidth}})))},$=M;export{$ as default};
/*! Bundled license information:

react-switch-case/dist/index.js:
  (*! For license information please see index.js.LICENSE.txt *)
  (*!
   * banner:
   * react-switch-case: 1.5.1
   * Aleksandrov Sergey <gooddev.sergey@gmail.com> (https://github.com/AlexSergey/react-switch-case)
   * Little switch-case React component to render nested components.
   * MIT
   *)
*/
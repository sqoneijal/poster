import{b as L}from"./chunk-2ZKIS3S6.js";var O=L((k,y)=>{(function(f,u){typeof k=="object"&&typeof y<"u"?y.exports=u():typeof define=="function"&&define.amd?define(u):f.lozad=u()})(k,function(){"use strict";var f=typeof document<"u"&&document.documentMode,u={rootMargin:"0px",threshold:0,load:function(t){if(t.nodeName.toLowerCase()==="picture"){var r=t.querySelector("img"),s=!1;r===null&&(r=document.createElement("img"),s=!0),f&&t.getAttribute("data-iesrc")&&(r.src=t.getAttribute("data-iesrc")),t.getAttribute("data-alt")&&(r.alt=t.getAttribute("data-alt")),s&&t.append(r)}if(t.nodeName.toLowerCase()==="video"&&!t.getAttribute("data-src")&&t.children){for(var c=t.children,o=void 0,i=0;i<=c.length-1;i++)(o=c[i].getAttribute("data-src"))&&(c[i].src=o);t.load()}t.getAttribute("data-poster")&&(t.poster=t.getAttribute("data-poster")),t.getAttribute("data-src")&&(t.src=t.getAttribute("data-src")),t.getAttribute("data-srcset")&&t.setAttribute("srcset",t.getAttribute("data-srcset"));var l=",";if(t.getAttribute("data-background-delimiter")&&(l=t.getAttribute("data-background-delimiter")),t.getAttribute("data-background-image"))t.style.backgroundImage="url('"+t.getAttribute("data-background-image").split(l).join("'),url('")+"')";else if(t.getAttribute("data-background-image-set")){var d=t.getAttribute("data-background-image-set").split(l),a=d[0].substr(0,d[0].indexOf(" "))||d[0];a=a.indexOf("url(")===-1?"url("+a+")":a,d.length===1?t.style.backgroundImage=a:t.setAttribute("style",(t.getAttribute("style")||"")+"background-image: "+a+"; background-image: -webkit-image-set("+d+"); background-image: image-set("+d+")")}t.getAttribute("data-toggle-class")&&t.classList.toggle(t.getAttribute("data-toggle-class"))},loaded:function(){}};function m(t){t.setAttribute("data-loaded",!0)}var A=function(t){return t.getAttribute("data-loaded")==="true"},w=function(t){var r=1<arguments.length&&arguments[1]!==void 0?arguments[1]:document;return t instanceof Element?[t]:t instanceof NodeList?t:r.querySelectorAll(t)};return function(){var t,r,s=0<arguments.length&&arguments[0]!==void 0?arguments[0]:".lozad",c=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{},o=Object.assign({},u,c),i=o.root,l=o.rootMargin,d=o.threshold,a=o.load,v=o.loaded,b=void 0;typeof window<"u"&&window.IntersectionObserver&&(b=new IntersectionObserver((t=a,r=v,function(e,n){e.forEach(function(g){(0<g.intersectionRatio||g.isIntersecting)&&(n.unobserve(g.target),A(g.target)||(t(g.target),m(g.target),r(g.target)))})}),{root:i,rootMargin:l,threshold:d}));for(var h,I=w(s,i),p=0;p<I.length;p++)(h=I[p]).getAttribute("data-placeholder-background")&&(h.style.background=h.getAttribute("data-placeholder-background"));return{observe:function(){for(var e=w(s,i),n=0;n<e.length;n++)A(e[n])||(b?b.observe(e[n]):(a(e[n]),m(e[n]),v(e[n])))},triggerLoad:function(e){A(e)||(a(e),m(e),v(e))},observer:b}}})});export{O as a};
/*! Bundled license information:

lozad/dist/lozad.min.js:
  (*! lozad.js - v1.16.0 - 2020-09-06
  * https://github.com/ApoorvSaxena/lozad.js
  * Copyright (c) 2020 Apoorv Saxena; Licensed MIT *)
*/

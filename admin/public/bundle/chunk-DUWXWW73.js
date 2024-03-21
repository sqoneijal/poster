import{b as O,d as C,e as P}from"./chunk-2ZKIS3S6.js";var x=O(R=>{"use strict";var m=P();function U(e,r){return e===r&&(e!==0||1/e===1/r)||e!==e&&r!==r}var W=typeof Object.is=="function"?Object.is:U,L=m.useSyncExternalStore,q=m.useRef,z=m.useEffect,B=m.useMemo,H=m.useDebugValue;R.useSyncExternalStoreWithSelector=function(e,r,t,n,o){var s=q(null);if(s.current===null){var u={hasValue:!1,value:null};s.current=u}else u=s.current;s=B(function(){function d(f){if(!c){if(c=!0,p=f,f=n(f),o!==void 0&&u.hasValue){var i=u.value;if(o(i,f))return y=i}return y=f}if(i=y,W(p,f))return i;var v=n(f);return o!==void 0&&o(i,v)?i:(p=f,y=v)}var c=!1,p,y,h=t===void 0?null:t;return[function(){return d(r())},h===null?void 0:function(){return d(h())}]},[r,t,n,o]);var l=L(e,s[0],s[1]);return z(function(){u.hasValue=!0,u.value=l},[l]),H(l),l}});var N=O((he,T)=>{"use strict";T.exports=x()});var $=C(P(),1),M=C(N(),1),E=C(P(),1),a="default"in E?E.default:E,_=Symbol.for("react-redux-context"),F=typeof globalThis<"u"?globalThis:{};function K(){if(!a.createContext)return{};let e=F[_]??(F[_]=new Map),r=e.get(a.createContext);return r||(r=a.createContext(null),e.set(a.createContext,r)),r}var S=K(),A=()=>{throw new Error("uSES not initialized!")};function g(e=S){return function(){return a.useContext(e)}}var V=g(),D=A,X=e=>{D=e},G=(e,r)=>e===r;function J(e=S){let r=e===S?V:g(e),t=(n,o={})=>{let{equalityFn:s=G,devModeChecks:u={}}=typeof o=="function"?{equalityFn:o}:o,{store:l,subscription:d,getServerState:c,stabilityCheck:p,identityFunctionCheck:y}=r(),h=a.useRef(!0),f=a.useCallback({[n.name](v){let b=n(v);if(0){if((ye==="always"||ye==="once"&&h.current)&&!s(b,Y))try{}catch(Se){}if((w==="always"||w==="once"&&h.current)&&b===v)try{}catch(j){}}return b}}[n.name],[n,p,u.stabilityCheck]),i=D(d.addNestedSub,l.getState,c||l.getState,f,s);return a.useDebugValue(i),i};return Object.assign(t,{withTypes:()=>t}),t}var me=J(),Ee=Symbol.for("react.element"),be=Symbol.for("react.portal"),we=Symbol.for("react.fragment"),Ce=Symbol.for("react.strict_mode"),Pe=Symbol.for("react.profiler"),ge=Symbol.for("react.provider"),Oe=Symbol.for("react.context"),Re=Symbol.for("react.server_context"),Z=Symbol.for("react.forward_ref"),xe=Symbol.for("react.suspense"),Te=Symbol.for("react.suspense_list"),Q=Symbol.for("react.memo"),Ne=Symbol.for("react.lazy"),_e=Symbol.for("react.offscreen"),Fe=Symbol.for("react.client.reference"),ee=Z,te=Q;function re(e){e()}function ne(){let e=null,r=null;return{clear(){e=null,r=null},notify(){re(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(t){let n=!0,o=r={callback:t,next:null,prev:r};return o.prev?o.prev.next=o:e=o,function(){!n||e===null||(n=!1,o.next?o.next.prev=o.prev:r=o.prev,o.prev?o.prev.next=o.next:e=o.next)}}}}var k={notify(){},get:()=>[]};function oe(e,r){let t,n=k,o=0,s=!1;function u(v){p();let b=n.subscribe(v),w=!1;return()=>{w||(w=!0,b(),y())}}function l(){n.notify()}function d(){i.onStateChange&&i.onStateChange()}function c(){return s}function p(){o++,t||(t=r?r.addNestedSub(d):e.subscribe(d),n=ne())}function y(){o--,t&&o===0&&(t(),t=void 0,n.clear(),n=k)}function h(){s||(s=!0,p())}function f(){s&&(s=!1,y())}let i={addNestedSub:u,notifyNestedSubs:l,handleChangeWrapper:d,isSubscribed:c,trySubscribe:h,tryUnsubscribe:f,getListeners:()=>n};return i}var se=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",ce=se?a.useLayoutEffect:a.useEffect;var ue={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},ie={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},ke={[ee]:ue,[te]:ie};var $e=Object.prototype;var ae=A,le=e=>{ae=e};function fe({store:e,context:r,children:t,serverState:n,stabilityCheck:o="once",identityFunctionCheck:s="once"}){let u=a.useMemo(()=>{let c=oe(e);return{store:e,subscription:c,getServerState:n?()=>n:void 0,stabilityCheck:o,identityFunctionCheck:s}},[e,n,o,s]),l=a.useMemo(()=>e.getState(),[e]);ce(()=>{let{subscription:c}=u;return c.onStateChange=c.notifyNestedSubs,c.trySubscribe(),l!==e.getState()&&c.notifyNestedSubs(),()=>{c.tryUnsubscribe(),c.onStateChange=void 0}},[u,l]);let d=r||S;return a.createElement(d.Provider,{value:u},t)}var Me=fe;function I(e=S){let r=e===S?V:g(e),t=()=>{let{store:n}=r();return n};return Object.assign(t,{withTypes:()=>t}),t}var de=I();function pe(e=S){let r=e===S?de:I(e),t=()=>r().dispatch;return Object.assign(t,{withTypes:()=>t}),t}var Ae=pe();X(M.useSyncExternalStoreWithSelector);le($.useSyncExternalStore);export{me as a,Me as b,Ae as c};
/*! Bundled license information:

use-sync-external-store/cjs/use-sync-external-store-with-selector.production.min.js:
  (**
   * @license React
   * use-sync-external-store-with-selector.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
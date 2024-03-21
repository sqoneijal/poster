import{l as we}from"./chunk-5VQXXJVA.js";function N(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var Qe=typeof Symbol=="function"&&Symbol.observable||"@@observable",be=Qe,ee=()=>Math.random().toString(36).substring(7).split("").join("."),Ze={INIT:`@@redux/INIT${ee()}`,REPLACE:`@@redux/REPLACE${ee()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${ee()}`},L=Ze;function U(e){if(typeof e!="object"||e===null)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function te(e,t,r){if(typeof e!="function")throw new Error(N(2));if(typeof t=="function"&&typeof r=="function"||typeof r=="function"&&typeof arguments[3]=="function")throw new Error(N(0));if(typeof t=="function"&&typeof r>"u"&&(r=t,t=void 0),typeof r<"u"){if(typeof r!="function")throw new Error(N(1));return r(te)(e,t)}let n=e,o=t,i=new Map,s=i,a=0,c=!1;function l(){s===i&&(s=new Map,i.forEach((w,O)=>{s.set(O,w)}))}function u(){if(c)throw new Error(N(3));return o}function f(w){if(typeof w!="function")throw new Error(N(4));if(c)throw new Error(N(5));let O=!0;l();let d=a++;return s.set(d,w),function(){if(O){if(c)throw new Error(N(6));O=!1,l(),s.delete(d),i=null}}}function p(w){if(!U(w))throw new Error(N(7));if(typeof w.type>"u")throw new Error(N(8));if(typeof w.type!="string")throw new Error(N(17));if(c)throw new Error(N(9));try{c=!0,o=n(o,w)}finally{c=!1}return(i=s).forEach(d=>{d()}),w}function h(w){if(typeof w!="function")throw new Error(N(10));n=w,p({type:L.REPLACE})}function y(){let w=f;return{subscribe(O){if(typeof O!="object"||O===null)throw new Error(N(11));function d(){let m=O;m.next&&m.next(u())}return d(),{unsubscribe:w(d)}},[be](){return this}}}return p({type:L.INIT}),{dispatch:p,subscribe:f,getState:u,replaceReducer:h,[be]:y}}function et(e){Object.keys(e).forEach(t=>{let r=e[t];if(typeof r(void 0,{type:L.INIT})>"u")throw new Error(N(12));if(typeof r(void 0,{type:L.PROBE_UNKNOWN_ACTION()})>"u")throw new Error(N(13))})}function ve(e){let t=Object.keys(e),r={};for(let s=0;s<t.length;s++){let a=t[s];typeof e[a]=="function"&&(r[a]=e[a])}let n=Object.keys(r),o,i;try{et(r)}catch(s){i=s}return function(a={},c){if(i)throw i;let l=!1,u={};for(let f=0;f<n.length;f++){let p=n[f],h=r[p],y=a[p],E=h(y,c);if(typeof E>"u"){let w=c&&c.type;throw new Error(N(14))}u[p]=E,l=l||E!==y}return l=l||n.length!==Object.keys(a).length,l?u:a}}function I(...e){return e.length===0?t=>t:e.length===1?e[0]:e.reduce((t,r)=>(...n)=>t(r(...n)))}function _e(...e){return t=>(r,n)=>{let o=t(r,n),i=()=>{throw new Error(N(15))},s={getState:o.getState,dispatch:(c,...l)=>i(c,...l)},a=e.map(c=>c(s));return i=I(...a)(o.dispatch),{...o,dispatch:i}}}function Ee(e){return U(e)&&"type"in e&&typeof e.type=="string"}var Ce=Symbol.for("immer-nothing"),Oe=Symbol.for("immer-draftable"),S=Symbol.for("immer-state");function C(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var j=Object.getPrototypeOf;function D(e){return!!e&&!!e[S]}function A(e){return e?Ae(e)||Array.isArray(e)||!!e[Oe]||!!e.constructor?.[Oe]||K(e)||X(e):!1}var tt=Object.prototype.constructor.toString();function Ae(e){if(!e||typeof e!="object")return!1;let t=j(e);if(t===null)return!0;let r=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return r===Object?!0:typeof r=="function"&&Function.toString.call(r)===tt}function z(e,t){q(e)===0?Object.entries(e).forEach(([r,n])=>{t(r,n,e)}):e.forEach((r,n)=>t(n,r,e))}function q(e){let t=e[S];return t?t.type_:Array.isArray(e)?1:K(e)?2:X(e)?3:0}function oe(e,t){return q(e)===2?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function De(e,t,r){let n=q(e);n===2?e.set(t,r):n===3?e.add(r):e[t]=r}function rt(e,t){return e===t?e!==0||1/e===1/t:e!==e&&t!==t}function K(e){return e instanceof Map}function X(e){return e instanceof Set}function R(e){return e.copy_||e.base_}function ie(e,t){if(K(e))return new Map(e);if(X(e))return new Set(e);if(Array.isArray(e))return Array.prototype.slice.call(e);if(!t&&Ae(e))return j(e)?{...e}:Object.assign(Object.create(null),e);let r=Object.getOwnPropertyDescriptors(e);delete r[S];let n=Reflect.ownKeys(r);for(let o=0;o<n.length;o++){let i=n[o],s=r[i];s.writable===!1&&(s.writable=!0,s.configurable=!0),(s.get||s.set)&&(r[i]={configurable:!0,writable:!0,enumerable:s.enumerable,value:e[i]})}return Object.create(j(e),r)}function le(e,t=!1){return G(e)||D(e)||!A(e)||(q(e)>1&&(e.set=e.add=e.clear=e.delete=nt),Object.freeze(e),t&&z(e,(r,n)=>le(n,!0),!0)),e}function nt(){C(2)}function G(e){return Object.isFrozen(e)}var ot={};function x(e){let t=ot[e];return t||C(0,e),t}var V;function Pe(){return V}function it(e,t){return{drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function Ne(e,t){t&&(x("Patches"),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function se(e){ae(e),e.drafts_.forEach(st),e.drafts_=null}function ae(e){e===V&&(V=e.parent_)}function Se(e){return V=it(V,e)}function st(e){let t=e[S];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function ke(e,t){t.unfinalizedDrafts_=t.drafts_.length;let r=t.drafts_[0];return e!==void 0&&e!==r?(r[S].modified_&&(se(t),C(4)),A(e)&&(e=W(t,e),t.parent_||B(t,e)),t.patches_&&x("Patches").generateReplacementPatches_(r[S].base_,e,t.patches_,t.inversePatches_)):e=W(t,r,[]),se(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==Ce?e:void 0}function W(e,t,r){if(G(t))return t;let n=t[S];if(!n)return z(t,(o,i)=>Me(e,n,t,o,i,r),!0),t;if(n.scope_!==e)return t;if(!n.modified_)return B(e,n.base_,!0),n.base_;if(!n.finalized_){n.finalized_=!0,n.scope_.unfinalizedDrafts_--;let o=n.copy_,i=o,s=!1;n.type_===3&&(i=new Set(o),o.clear(),s=!0),z(i,(a,c)=>Me(e,n,o,a,c,r,s)),B(e,o,!1),r&&e.patches_&&x("Patches").generatePatches_(n,r,e.patches_,e.inversePatches_)}return n.copy_}function Me(e,t,r,n,o,i,s){if(D(o)){let a=i&&t&&t.type_!==3&&!oe(t.assigned_,n)?i.concat(n):void 0,c=W(e,o,a);if(De(r,n,c),D(c))e.canAutoFreeze_=!1;else return}else s&&r.add(o);if(A(o)&&!G(o)){if(!e.immer_.autoFreeze_&&e.unfinalizedDrafts_<1)return;W(e,o),(!t||!t.scope_.parent_)&&B(e,o)}}function B(e,t,r=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&le(t,r)}function at(e,t){let r=Array.isArray(e),n={type_:r?1:0,scope_:t?t.scope_:Pe(),modified_:!1,finalized_:!1,assigned_:{},parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1},o=n,i=fe;r&&(o=[n],i=$);let{revoke:s,proxy:a}=Proxy.revocable(o,i);return n.draft_=a,n.revoke_=s,a}var fe={get(e,t){if(t===S)return e;let r=R(e);if(!oe(r,t))return ct(e,r,t);let n=r[t];return e.finalized_||!A(n)?n:n===re(e.base_,t)?(ne(e),e.copy_[t]=ue(n,e)):n},has(e,t){return t in R(e)},ownKeys(e){return Reflect.ownKeys(R(e))},set(e,t,r){let n=Te(R(e),t);if(n?.set)return n.set.call(e.draft_,r),!0;if(!e.modified_){let o=re(R(e),t),i=o?.[S];if(i&&i.base_===r)return e.copy_[t]=r,e.assigned_[t]=!1,!0;if(rt(r,o)&&(r!==void 0||oe(e.base_,t)))return!0;ne(e),ce(e)}return e.copy_[t]===r&&(r!==void 0||t in e.copy_)||Number.isNaN(r)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=r,e.assigned_[t]=!0),!0},deleteProperty(e,t){return re(e.base_,t)!==void 0||t in e.base_?(e.assigned_[t]=!1,ne(e),ce(e)):delete e.assigned_[t],e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let r=R(e),n=Reflect.getOwnPropertyDescriptor(r,t);return n&&{writable:!0,configurable:e.type_!==1||t!=="length",enumerable:n.enumerable,value:r[t]}},defineProperty(){C(11)},getPrototypeOf(e){return j(e.base_)},setPrototypeOf(){C(12)}},$={};z(fe,(e,t)=>{$[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}});$.deleteProperty=function(e,t){return $.set.call(this,e,t,void 0)};$.set=function(e,t,r){return fe.set.call(this,e[0],t,r,e[0])};function re(e,t){let r=e[S];return(r?R(r):e)[t]}function ct(e,t,r){let n=Te(t,r);return n?"value"in n?n.value:n.get?.call(e.draft_):void 0}function Te(e,t){if(!(t in e))return;let r=j(e);for(;r;){let n=Object.getOwnPropertyDescriptor(r,t);if(n)return n;r=j(r)}}function ce(e){e.modified_||(e.modified_=!0,e.parent_&&ce(e.parent_))}function ne(e){e.copy_||(e.copy_=ie(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var ut=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.produce=(t,r,n)=>{if(typeof t=="function"&&typeof r!="function"){let i=r;r=t;let s=this;return function(c=i,...l){return s.produce(c,u=>r.call(this,u,...l))}}typeof r!="function"&&C(6),n!==void 0&&typeof n!="function"&&C(7);let o;if(A(t)){let i=Se(this),s=ue(t,void 0),a=!0;try{o=r(s),a=!1}finally{a?se(i):ae(i)}return Ne(i,n),ke(o,i)}else if(!t||typeof t!="object"){if(o=r(t),o===void 0&&(o=t),o===Ce&&(o=void 0),this.autoFreeze_&&le(o,!0),n){let i=[],s=[];x("Patches").generateReplacementPatches_(t,o,i,s),n(i,s)}return o}else C(1,t)},this.produceWithPatches=(t,r)=>{if(typeof t=="function")return(s,...a)=>this.produceWithPatches(s,c=>t(c,...a));let n,o;return[this.produce(t,r,(s,a)=>{n=s,o=a}),n,o]},typeof e?.autoFreeze=="boolean"&&this.setAutoFreeze(e.autoFreeze),typeof e?.useStrictShallowCopy=="boolean"&&this.setUseStrictShallowCopy(e.useStrictShallowCopy)}createDraft(e){A(e)||C(8),D(e)&&(e=de(e));let t=Se(this),r=ue(e,void 0);return r[S].isManual_=!0,ae(t),r}finishDraft(e,t){let r=e&&e[S];(!r||!r.isManual_)&&C(9);let{scope_:n}=r;return Ne(n,t),ke(void 0,n)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}applyPatches(e,t){let r;for(r=t.length-1;r>=0;r--){let o=t[r];if(o.path.length===0&&o.op==="replace"){e=o.value;break}}r>-1&&(t=t.slice(r+1));let n=x("Patches").applyPatches_;return D(e)?n(e,t):this.produce(e,o=>n(o,t))}};function ue(e,t){let r=K(e)?x("MapSet").proxyMap_(e,t):X(e)?x("MapSet").proxySet_(e,t):at(e,t);return(t?t.scope_:Pe()).drafts_.push(r),r}function de(e){return D(e)||C(10,e),Re(e)}function Re(e){if(!A(e)||G(e))return e;let t=e[S],r;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,r=ie(e,t.scope_.immer_.useStrictShallowCopy_)}else r=ie(e,!0);return z(r,(n,o)=>{De(r,n,Re(o))}),t&&(t.finalized_=!1),r}var k=new ut,Y=k.produce,Zt=k.produceWithPatches.bind(k),er=k.setAutoFreeze.bind(k),tr=k.setUseStrictShallowCopy.bind(k),rr=k.applyPatches.bind(k),nr=k.createDraft.bind(k),or=k.finishDraft.bind(k);function lt(e,t=`expected a function, instead received ${typeof e}`){if(typeof e!="function")throw new TypeError(t)}function ft(e,t=`expected an object, instead received ${typeof e}`){if(typeof e!="object")throw new TypeError(t)}function dt(e,t="expected all items to be functions, instead received the following types: "){if(!e.every(r=>typeof r=="function")){let r=e.map(n=>typeof n=="function"?`function ${n.name||"unnamed"}()`:typeof n).join(", ");throw new TypeError(`${t}[${r}]`)}}var xe=e=>Array.isArray(e)?e:[e];function pt(e){let t=Array.isArray(e[0])?e[0]:e;return dt(t,"createSelector expects all input-selectors to be functions, but received the following types: "),t}function ht(e,t){let r=[],{length:n}=e;for(let o=0;o<n;o++)r.push(e[o].apply(null,t));return r}var ar=Symbol();var cr=Object.getPrototypeOf({});var yt=class{constructor(e){this.value=e}deref(){return this.value}},mt=typeof WeakRef<"u"?WeakRef:yt,gt=0,Ie=1;function H(){return{s:gt,v:void 0,o:null,p:null}}function J(e,t={}){let r=H(),{resultEqualityCheck:n}=t,o,i=0;function s(){let a=r,{length:c}=arguments;for(let f=0,p=c;f<p;f++){let h=arguments[f];if(typeof h=="function"||typeof h=="object"&&h!==null){let y=a.o;y===null&&(a.o=y=new WeakMap);let E=y.get(h);E===void 0?(a=H(),y.set(h,a)):a=E}else{let y=a.p;y===null&&(a.p=y=new Map);let E=y.get(h);E===void 0?(a=H(),y.set(h,a)):a=E}}let l=a,u;if(a.s===Ie?u=a.v:(u=e.apply(null,arguments),i++),l.s=Ie,n){let f=o?.deref?.()??o;f!=null&&n(f,u)&&(u=f,i!==0&&i--),o=typeof u=="object"&&u!==null||typeof u=="function"?new mt(u):u}return l.v=u,u}return s.clearCache=()=>{r=H(),s.resetResultsCount()},s.resultsCount=()=>i,s.resetResultsCount=()=>{i=0},s}function pe(e,...t){let r=typeof e=="function"?{memoize:e,memoizeOptions:t}:e,n=(...o)=>{let i=0,s=0,a,c={},l=o.pop();typeof l=="object"&&(c=l,l=o.pop()),lt(l,`createSelector expects an output function after the inputs, but received: [${typeof l}]`);let u={...r,...c},{memoize:f,memoizeOptions:p=[],argsMemoize:h=J,argsMemoizeOptions:y=[],devModeChecks:E={}}=u,w=xe(p),O=xe(y),d=pt(o),g=f(function(){return i++,l.apply(null,arguments)},...w),m=!0,M=h(function(){s++;let v=ht(d,arguments);return a=g.apply(null,v),a},...O);return Object.assign(M,{resultFunc:l,memoizedResultFunc:g,dependencies:d,dependencyRecomputations:()=>s,resetDependencyRecomputations:()=>{s=0},lastResult:()=>a,recomputations:()=>i,resetRecomputations:()=>{i=0},memoize:f,argsMemoize:h})};return Object.assign(n,{withTypes:()=>n}),n}var wt=pe(J),bt=Object.assign((e,t=wt)=>{ft(e,`createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`);let r=Object.keys(e),n=r.map(i=>e[i]);return t(n,(...i)=>i.reduce((s,a,c)=>(s[r[c]]=a,s),{}))},{withTypes:()=>bt});function je(e){return({dispatch:r,getState:n})=>o=>i=>typeof i=="function"?i(r,n,e):o(i)}var ze=je(),Ve=je;var vt=(...e)=>{let t=pe(...e),r=Object.assign((...n)=>{let o=t(...n),i=(s,...a)=>o(D(s)?de(s):s,...a);return Object.assign(i,o),i},{withTypes:()=>r});return r},hr=vt(J),_t=typeof window<"u"&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]=="object"?I:I.apply(null,arguments)},gr=typeof window<"u"&&window.__REDUX_DEVTOOLS_EXTENSION__?window.__REDUX_DEVTOOLS_EXTENSION__:function(){return function(e){return e}},Et=e=>e&&typeof e.match=="function";function P(e,t){function r(...n){if(t){let o=t(...n);if(!o)throw new Error(_(0));return{type:e,payload:o.payload,..."meta"in o&&{meta:o.meta},..."error"in o&&{error:o.error}}}return{type:e,payload:n[0]}}return r.toString=()=>`${e}`,r.type=e,r.match=n=>Ee(n)&&n.type===e,r}var Ue=class F extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,F.prototype)}static get[Symbol.species](){return F}concat(...t){return super.concat.apply(this,t)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new F(...t[0].concat(this)):new F(...t.concat(this))}};function $e(e){return A(e)?Y(e,()=>{}):e}function Fe(e,t,r){if(e.has(t)){let o=e.get(t);return r.update&&(o=r.update(o,t,e),e.set(t,o)),o}if(!r.insert)throw new Error(_(10));let n=r.insert(t,e);return e.set(t,n),n}function Ot(e){return typeof e=="boolean"}var Nt=()=>function(t){let{thunk:r=!0,immutableCheck:n=!0,serializableCheck:o=!0,actionCreatorCheck:i=!0}=t??{},s=new Ue;return r&&(Ot(r)?s.push(ze):s.push(Ve(r.extraArgument))),s},St="RTK_autoBatch";var We=e=>t=>{setTimeout(t,e)},kt=typeof window<"u"&&window.requestAnimationFrame?window.requestAnimationFrame:We(10),Mt=(e={type:"raf"})=>t=>(...r)=>{let n=t(...r),o=!0,i=!1,s=!1,a=new Set,c=e.type==="tick"?queueMicrotask:e.type==="raf"?kt:e.type==="callback"?e.queueNotification:We(e.timeout),l=()=>{s=!1,i&&(i=!1,a.forEach(u=>u()))};return Object.assign({},n,{subscribe(u){let f=()=>o&&u(),p=n.subscribe(f);return a.add(u),()=>{p(),a.delete(u)}},dispatch(u){try{return o=!u?.meta?.[St],i=!o,i&&(s||(s=!0,c(l))),n.dispatch(u)}finally{o=!0}}})},Ct=e=>function(r){let{autoBatch:n=!0}=r??{},o=new Ue(e);return n&&o.push(Mt(typeof n=="object"?n:void 0)),o},T=!0;function _r(e){let t=Nt(),{reducer:r=void 0,middleware:n,devTools:o=!0,preloadedState:i=void 0,enhancers:s=void 0}=e||{},a;if(typeof r=="function")a=r;else if(U(r))a=ve(r);else throw new Error(_(1));if(!T&&n&&typeof n!="function")throw new Error(_(2));let c;if(typeof n=="function"){if(c=n(t),!T&&!Array.isArray(c))throw new Error(_(3))}else c=t();if(!T&&c.some(y=>typeof y!="function"))throw new Error(_(4));let l=I;o&&(l=_t({trace:!T,...typeof o=="object"&&o}));let u=_e(...c),f=Ct(u);if(!T&&s&&typeof s!="function")throw new Error(_(5));let p=typeof s=="function"?s(f):f();if(!T&&!Array.isArray(p))throw new Error(_(6));if(!T&&p.some(y=>typeof y!="function"))throw new Error(_(7));!T&&c.length&&!p.includes(u)&&console.error("middlewares were provided, but middleware enhancer was not included in final enhancers - make sure to call `getDefaultEnhancers`");let h=l(...p);return te(a,i,h)}function Be(e){let t={},r=[],n,o={addCase(i,s){let a=typeof i=="string"?i:i.type;if(!a)throw new Error(_(28));if(a in t)throw new Error(_(29));return t[a]=s,o},addMatcher(i,s){return r.push({matcher:i,reducer:s}),o},addDefaultCase(i){return n=i,o}};return e(o),[t,r,n]}function At(e){return typeof e=="function"}function Dt(e,t){let[r,n,o]=Be(t),i;if(At(e))i=()=>$e(e());else{let a=$e(e);i=()=>a}function s(a=i(),c){let l=[r[c.type],...n.filter(({matcher:u})=>u(c)).map(({reducer:u})=>u)];return l.filter(u=>!!u).length===0&&(l=[o]),l.reduce((u,f)=>{if(f)if(D(u)){let h=f(u,c);return h===void 0?u:h}else{if(A(u))return Y(u,p=>f(p,c));{let p=f(u,c);if(p===void 0){if(u===null)return u;throw new Error(_(9))}return p}}return u},a)}return s.getInitialState=i,s}var Pt="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",qe=(e=21)=>{let t="",r=e;for(;r--;)t+=Pt[Math.random()*64|0];return t},Tt=(e,t)=>Et(e)?e.match(t):e(t);function Rt(...e){return t=>e.some(r=>Tt(r,t))}var xt=["name","message","stack","code"],he=class{constructor(e,t){this.payload=e,this.meta=t}_type},Le=class{constructor(e,t){this.payload=e,this.meta=t}_type},It=e=>{if(typeof e=="object"&&e!==null){let t={};for(let r of xt)typeof e[r]=="string"&&(t[r]=e[r]);return t}return{message:String(e)}},jt=(()=>{function e(t,r,n){let o=P(t+"/fulfilled",(c,l,u,f)=>({payload:c,meta:{...f||{},arg:u,requestId:l,requestStatus:"fulfilled"}})),i=P(t+"/pending",(c,l,u)=>({payload:void 0,meta:{...u||{},arg:l,requestId:c,requestStatus:"pending"}})),s=P(t+"/rejected",(c,l,u,f,p)=>({payload:f,error:(n&&n.serializeError||It)(c||"Rejected"),meta:{...p||{},arg:u,requestId:l,rejectedWithValue:!!f,requestStatus:"rejected",aborted:c?.name==="AbortError",condition:c?.name==="ConditionError"}}));function a(c){return(l,u,f)=>{let p=n?.idGenerator?n.idGenerator(c):qe(),h=new AbortController,y,E;function w(d){E=d,h.abort()}let O=async function(){let d;try{let m=n?.condition?.(c,{getState:u,extra:f});if(Vt(m)&&(m=await m),m===!1||h.signal.aborted)throw{name:"ConditionError",message:"Aborted due to condition callback returning false."};let M=new Promise((b,v)=>{y=()=>{v({name:"AbortError",message:E||"Aborted"})},h.signal.addEventListener("abort",y)});l(i(p,c,n?.getPendingMeta?.({requestId:p,arg:c},{getState:u,extra:f}))),d=await Promise.race([M,Promise.resolve(r(c,{dispatch:l,getState:u,extra:f,requestId:p,signal:h.signal,abort:w,rejectWithValue:(b,v)=>new he(b,v),fulfillWithValue:(b,v)=>new Le(b,v)})).then(b=>{if(b instanceof he)throw b;return b instanceof Le?o(b.payload,p,c,b.meta):o(b,p,c)})])}catch(m){d=m instanceof he?s(null,p,c,m.payload,m.meta):s(m,p,c)}finally{y&&h.signal.removeEventListener("abort",y)}return n&&!n.dispatchConditionRejection&&s.match(d)&&d.meta.condition||l(d),d}();return Object.assign(O,{abort:w,requestId:p,arg:c,unwrap(){return O.then(zt)}})}}return Object.assign(a,{pending:i,rejected:s,fulfilled:o,settled:Rt(s,o),typePrefix:t})}return e.withTypes=()=>e,e})();function zt(e){if(e.meta&&e.meta.rejectedWithValue)throw e.payload;if(e.error)throw e.error;return e.payload}function Vt(e){return e!==null&&typeof e=="object"&&typeof e.then=="function"}var Ke=Symbol.for("rtk-slice-createasyncthunk"),Or={[Ke]:jt};function $t(e,t){return`${e}/${t}`}function Ft({creators:e}={}){let t=e?.asyncThunk?.[Ke];return function(n){let{name:o,reducerPath:i=o}=n;if(!o)throw new Error(_(11));typeof process<"u";let s=(typeof n.reducers=="function"?n.reducers(Ut()):n.reducers)||{},a=Object.keys(s),c={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},l={addCase(d,g){let m=typeof d=="string"?d:d.type;if(!m)throw new Error(_(12));if(m in c.sliceCaseReducersByType)throw new Error(_(13));return c.sliceCaseReducersByType[m]=g,l},addMatcher(d,g){return c.sliceMatchers.push({matcher:d,reducer:g}),l},exposeAction(d,g){return c.actionCreators[d]=g,l},exposeCaseReducer(d,g){return c.sliceCaseReducersByName[d]=g,l}};a.forEach(d=>{let g=s[d],m={reducerName:d,type:$t(o,d),createNotation:typeof n.reducers=="function"};Bt(g)?Kt(m,g,l,t):Wt(m,g,l)});function u(){let[d={},g=[],m=void 0]=typeof n.extraReducers=="function"?Be(n.extraReducers):[n.extraReducers],M={...d,...c.sliceCaseReducersByType};return Dt(n.initialState,b=>{for(let v in M)b.addCase(v,M[v]);for(let v of c.sliceMatchers)b.addMatcher(v.matcher,v.reducer);for(let v of g)b.addMatcher(v.matcher,v.reducer);m&&b.addDefaultCase(m)})}let f=d=>d,p=new Map,h;function y(d,g){return h||(h=u()),h(d,g)}function E(){return h||(h=u()),h.getInitialState()}function w(d,g=!1){function m(b){let v=b[d];return typeof v>"u"&&g&&(v=E()),v}function M(b=f){let v=Fe(p,g,{insert:()=>new WeakMap});return Fe(v,b,{insert:()=>{let Z={};for(let[me,ge]of Object.entries(n.selectors??{}))Z[me]=Lt(ge,b,E,g);return Z}})}return{reducerPath:d,getSelectors:M,get selectors(){return M(m)},selectSlice:m}}let O={name:o,reducer:y,actions:c.actionCreators,caseReducers:c.sliceCaseReducersByName,getInitialState:E,...w(i),injectInto(d,{reducerPath:g,...m}={}){let M=g??i;return d.inject({reducerPath:M,reducer:y},m),{...O,...w(M,!0)}}};return O}}function Lt(e,t,r,n){function o(i,...s){let a=t(i);return typeof a>"u"&&n&&(a=r()),e(a,...s)}return o.unwrapped=e,o}var Xe=Ft();function Ut(){function e(t,r){return{_reducerDefinitionType:"asyncThunk",payloadCreator:t,...r}}return e.withTypes=()=>e,{reducer(t){return Object.assign({[t.name](...r){return t(...r)}}[t.name],{_reducerDefinitionType:"reducer"})},preparedReducer(t,r){return{_reducerDefinitionType:"reducerWithPrepare",prepare:t,reducer:r}},asyncThunk:e}}function Wt({type:e,reducerName:t,createNotation:r},n,o){let i,s;if("reducer"in n){if(r&&!qt(n))throw new Error(_(17));i=n.reducer,s=n.prepare}else i=n;o.addCase(e,i).exposeCaseReducer(t,i).exposeAction(t,s?P(e,s):P(e))}function Bt(e){return e._reducerDefinitionType==="asyncThunk"}function qt(e){return e._reducerDefinitionType==="reducerWithPrepare"}function Kt({type:e,reducerName:t},r,n,o){if(!o)throw new Error(_(18));let{payloadCreator:i,fulfilled:s,pending:a,rejected:c,settled:l,options:u}=r,f=o(e,i,u);n.exposeAction(t,f),s&&n.addCase(f.fulfilled,s),a&&n.addCase(f.pending,a),c&&n.addCase(f.rejected,c),l&&n.addMatcher(f.settled,l),n.exposeCaseReducer(t,{fulfilled:s||Q,pending:a||Q,rejected:c||Q,settled:l||Q})}function Q(){}var Ge="listener",Ye="completed",He="cancelled",Nr=`task-${He}`,Sr=`task-${Ye}`,kr=`${Ge}-${He}`,Mr=`${Ge}-${Ye}`;var Xt=(e,t)=>{if(typeof e!="function")throw new Error(_(32))};var{assign:Cr}=Object;var ye="listenerMiddleware";var Gt=e=>{let{type:t,actionCreator:r,matcher:n,predicate:o,effect:i}=e;if(t)o=P(t).match;else if(r)t=r.type,o=r.match;else if(n)o=n;else if(!o)throw new Error(_(21));return Xt(i,"options.listener"),{predicate:o,type:t,effect:i}},Yt=Object.assign(e=>{let{type:t,predicate:r,effect:n}=Gt(e);return{id:qe(),effect:n,type:t,predicate:r,pending:new Set,unsubscribe:()=>{throw new Error(_(22))}}},{withTypes:()=>Yt});var Ht=Object.assign(P(`${ye}/add`),{withTypes:()=>Ht}),Ar=P(`${ye}/removeAll`),Jt=Object.assign(P(`${ye}/remove`),{withTypes:()=>Jt});var Dr=Symbol.for("rtk-state-proxy-original");function _(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var Je=Xe({name:"redux",initialState:{init:{},module:{},secondaryNav:[],detailNavActive:{},position:[],filter:{},showButton:!1,buttonConfig:{},websocket:"ws://localhost:8888/event"},reducers:{setInit:(e,{payload:t}=action)=>{e.init=t},secondaryNav:(e,{payload:t}=action)=>{e.secondaryNav=t},detailNavActive:(e,{payload:t}=action)=>{e.detailNavActive=t},position:(e,{payload:t}=action)=>{e.position=t},filter:(e,{payload:t}=action)=>{e.filter=t},applyFilter:(e,{payload:t}=action)=>{e.filter={...t.data},we(t.url,t.data)},setModule:(e,{payload:t}=action)=>{e.module=t},showButton:(e,{payload:t}=action)=>{e.showButton=t},buttonConfig:(e,{payload:t}=action)=>{e.buttonConfig=t}}}),{init:zr,setInit:Vr,setModule:$r,secondaryNav:Fr,detailNavActive:Lr,position:Ur,applyFilter:Wr,filter:Br,showButton:qr,buttonConfig:Kr,websocket:Xr}=Je.actions,Gr=Je.reducer;export{_r as a,Vr as b,$r as c,Ur as d,Wr as e,Br as f,qr as g,Kr as h,Gr as i};

import{a as E}from"./chunk-F25MCYSE.js";import{a as D}from"./chunk-SJTF4NYS.js";import{b as C,c as N,d as s,e as n,g as w,o as L}from"./chunk-K5HZLVTK.js";import{g as I,p as v,q as x}from"./chunk-5TOVVIUE.js";import"./chunk-AQBTORL7.js";import"./chunk-T6HN2I3K.js";import"./chunk-ZDGVLX7E.js";import{d as P,e as k}from"./chunk-2ZKIS3S6.js";var t=P(k());var d=0,B=({selectedRunningText:u,setSelectedRunningText:l})=>{let a=(0,t.useRef)(null),[c,m]=(0,t.useState)(!1),[g,O]=(0,t.useState)(!0),[h,b]=(0,t.useState)({}),[f,y]=(0,t.useState)([]),z=(e,r)=>{if(w(e))if(e.includes(n(s("id",r)))){let i=[];e.forEach(o=>{o!==n(s("id",r))&&i.push(o)}),l(i)}else l([...e,n(s("id",r))]);else l([...e,n(s("id",r))])},p=e=>{let r=C(`/getdaftarrunningtext?${L(e)}`);r.then(i=>{if(typeof i>"u")return;let{data:o}=i;if(typeof o.code<"u"&&s("code",o)!==200){N(!1,s("message",o));return}b(e),s("source",e)&&s("source",e)==="filter"?y(o.listContent):y(F=>F.concat(o.listContent)),d=o.totalData}),r.finally(()=>{O(!1)})};return(0,t.useLayoutEffect)(()=>(p({page:0}),()=>{}),[]),(0,t.useLayoutEffect)(()=>{let e=new IntersectionObserver(r=>{r[0].isIntersecting&&m(!0)},{threshold:1});return a.current&&e.observe(a.current),()=>{a.current&&e.unobserve(a.current)}},[a,f]),(0,t.useLayoutEffect)(()=>(c&&d>f.length&&!g&&p({...h,source:"",page:n(h.page)+1}),()=>m(!1)),[c,d,f,h,g]),t.default.createElement(v,null,t.default.createElement(E,{...{filter:h,setFilter:b,getData:p}}),t.default.createElement(I,null,t.default.createElement(x,{responsive:!0,hover:!0,className:"align-middle table-row-dashed fs-6",size:"sm"},t.default.createElement("thead",null,t.default.createElement("tr",{className:"text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0"},t.default.createElement("th",{style:{width:"5%"},className:"text-center"},"no"),t.default.createElement("th",null,"text"))),t.default.createElement("tbody",{className:"text-gray-600 fw-semibold"},t.default.createElement(D,{of:f,render:(e,r)=>t.default.createElement("tr",{style:{cursor:"pointer"},className:u.includes(n(s("id",e)))?"selected":"",onClick:()=>z(u,e)},t.default.createElement("td",{className:"text-center"},r+1),t.default.createElement("td",null,s("text",e)))})))),t.default.createElement("div",{ref:a}))},A=B;export{A as default};

import{a as O}from"./chunk-EHA3D7HX.js";import{a as N}from"./chunk-SJTF4NYS.js";import{b as $,c as B,d as r,e as n,g as D,p as E}from"./chunk-5VQXXJVA.js";import{f as I,g as b,j as y,p as L}from"./chunk-5TOVVIUE.js";import"./chunk-AQBTORL7.js";import"./chunk-T6HN2I3K.js";import"./chunk-ZDGVLX7E.js";import{d as k,e as z}from"./chunk-2ZKIS3S6.js";var e=k(z());var p=0,S=({selectedImages:u,setSelectedImages:l})=>{let i=(0,e.useRef)(null),[m,d]=(0,e.useState)(!1),[g,x]=(0,e.useState)(!0),[f,C]=(0,e.useState)({}),[h,v]=(0,e.useState)([]),F=(t,o)=>{if(D(t))if(t.includes(n(r("id",o)))){let a=[];t.forEach(s=>{s!==n(r("id",o))&&a.push(s)}),l(a)}else l([...t,n(r("id",o))]);else l([...t,n(r("id",o))])},c=t=>{let o=$(`/getdaftarimages?${E(t)}`);o.then(a=>{if(typeof a>"u")return;let{data:s}=a;if(typeof s.code<"u"&&r("code",s)!==200){B(!1,r("message",s));return}C(t),r("source",t)&&r("source",t)==="filter"?v(s.listContent):v(P=>P.concat(s.listContent)),p=s.totalData}),o.finally(()=>{x(!1)})};return(0,e.useLayoutEffect)(()=>(c({page:0}),()=>{}),[]),(0,e.useLayoutEffect)(()=>{let t=new IntersectionObserver(o=>{o[0].isIntersecting&&d(!0)},{threshold:1});return i.current&&t.observe(i.current),()=>{i.current&&t.unobserve(i.current)}},[i,h]),(0,e.useLayoutEffect)(()=>(m&&p>h.length&&!g&&c({...f,source:"",page:n(f.page)+1}),()=>d(!1)),[m,p,h,f,g]),e.default.createElement(L,null,e.default.createElement(O,{...{filter:f,setFilter:C,getData:c}}),e.default.createElement(N,{of:h,render:(t,o)=>e.default.createElement(b,{md:4,xs:12,className:`${o>2?"mt-5":""} col-hover ${u.includes(n(r("id",t)))?"col-hover-selected":""}`,style:{cursor:"pointer"},onClick:()=>F(u,t)},e.default.createElement(I.Body,{className:"p-2"},e.default.createElement("h5",{className:"card-title"},r("origname",t)),e.default.createElement(y,{thumbnail:!0,src:`/getfile/images/${r("filename",t)}`})))}),e.default.createElement("div",{ref:i}))},G=S;export{G as default};

import{a as E}from"./chunk-SJTF4NYS.js";import{c as D}from"./chunk-4TGKIISG.js";import{a as b}from"./chunk-LOOOLLH5.js";import{a as v,c as I}from"./chunk-DUWXWW73.js";import{c as N,d as o,e as m,g as k,q as x}from"./chunk-5VQXXJVA.js";import{f as i,g as y,i as n}from"./chunk-5TOVVIUE.js";import"./chunk-AQBTORL7.js";import{a as T}from"./chunk-T6HN2I3K.js";import"./chunk-ZDGVLX7E.js";import{d as g,e as C}from"./chunk-2ZKIS3S6.js";var w=g(T()),e=g(C());var L=e.default.lazy(()=>import("./ModalEditOrigName-V35YY6KT.js")),P=({totalData:l,listContent:s,getContent:B,setListContent:u})=>{let{module:M,filter:p}=v(r=>r.redux),t=(0,e.useRef)(null),O=I(),[f,h]=(0,e.useState)(!1);(0,e.useLayoutEffect)(()=>(k(s)&&(0,w.default)(".lozad",{enableAutoReload:!0}).observe(),()=>{}),[s]),(0,e.useLayoutEffect)(()=>{let r=new IntersectionObserver(a=>{a[0].isIntersecting&&h(!0)},{threshold:1});return t.current&&r.observe(t.current),()=>{t.current&&r.unobserve(t.current)}},[t,s]),(0,e.useLayoutEffect)(()=>(f&&l>s.length&&B({...p,page:m(p.page)+1}),()=>h(!1)),[f,l,s,p]);let S=(r,a)=>r.filter(d=>m(o("id",d))!==a),H=r=>{x({msg:`Apakah anda yakin ingin menghapus ${o("origname",r)}`,url:"/hapus",id:o("id",r),custom:{filename:o("filename",r)}}).then(a=>{let{data:d}=a;if(N(d.status,d.msg_response),!d.status)return;let c=S(s,m(o("id",r)));u(c),l=c.length})},z=r=>{O(D({...M,openModalEditOrigName:!0,detailContent:r}))},A={setListContent:u,listContent:s};return e.default.createElement(e.default.Suspense,{fallback:e.default.createElement(b,{visible:!0,color:"#4fa94d",radius:"9",wrapperStyle:{alignItems:"center",display:"flex",justifyContent:"center"},wrapperClass:"page-loader flex-column bg-dark bg-opacity-25"})},e.default.createElement(L,{...A}),e.default.createElement(E,{of:s,render:(r,a)=>e.default.createElement(y,{md:4,className:a>2?"mt-6":""},e.default.createElement(i,{className:"card-bordered shadow-sm"},e.default.createElement(i.Header,null,e.default.createElement("h3",{className:"card-title"},o("origname",r)),e.default.createElement("div",{className:"card-toolbar"},e.default.createElement(n,null,e.default.createElement(n.Toggle,{variant:"light",className:"btn btn-sm"},"Aksi"),e.default.createElement(n.Menu,null,e.default.createElement(n.Item,{onClick:()=>z(r)},"Edit"),e.default.createElement(n.Item,{onClick:()=>H(r)},"Hapus"))))),e.default.createElement(i.Body,null,e.default.createElement("div",{className:"text-center px-4"},e.default.createElement("img",{className:"mw-100 mh-300px card-rounded-bottom",alt:o("origname",r),src:`/getfile/images/${o("filename",r)}`})))))}),e.default.createElement("div",{ref:t}))},J=P;export{J as default};

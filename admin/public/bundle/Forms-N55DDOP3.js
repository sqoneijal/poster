import{c as b}from"./chunk-ORPF6BBH.js";import{a as T,c as _}from"./chunk-DUWXWW73.js";import{c as f,d as s,e as h,f as v,h as D,i as E,j as g,k as G}from"./chunk-K5HZLVTK.js";import{e as j,f as l}from"./chunk-5TOVVIUE.js";import"./chunk-AQBTORL7.js";import"./chunk-T6HN2I3K.js";import"./chunk-ZDGVLX7E.js";import{d as O,e as P}from"./chunk-2ZKIS3S6.js";var e=O(P());var W=({listContent:H,setListContent:y,totalData:N})=>{let{module:u,init:$}=T(t=>t.redux),{openForms:C,pageType:r,detailContent:p}=u,k=_(),[w,x]=(0,e.useState)(!1),[F,B]=(0,e.useState)({}),[m,d]=(0,e.useState)({});(0,e.useLayoutEffect)(()=>(r==="update"&&D(p)&&d({...p}),()=>{}),[r,p]);let S=()=>{B({}),d({})},I=()=>{S(),k(b({...u,openForms:!1,pageType:"",detailContent:{}}))},M=t=>{t.preventDefault();let a={pageType:r,user_modified:s("username",$)};Object.keys(m).forEach(o=>a[o]=m[o]),x(!0);let L=G("/submit",a);L.then(o=>{if(typeof o>"u")return;let{data:n}=o;if(typeof n.code<"u"&&s("code",n)!==200){f(!1,s("message",n));return}if(B(n.errors),f(n.status,n.msg_response),!!n.status)if(S(),k(b({...u,openForms:!1,pageType:"",detailContent:{}})),r==="insert")y(i=>i.concat(n)),N=N+1;else{let i=[];H.map(c=>{h(s("id",c))===h(a.id)?i.push({...c,nama:s("nama",a),link:s("link",a)}):i.push(c)}),y(i)}}),L.finally(()=>{x(!1)})};return e.default.createElement(e.default.Fragment,null,C&&e.default.createElement("div",{className:"drawer-overlay"}),e.default.createElement("div",{className:`bg-white drawer drawer-start ${C?"drawer-on":""}`,style:{width:window.innerWidth/2}},e.default.createElement(l,{className:"rounded-0 w-100"},e.default.createElement(l.Header,{className:"pe-5"},e.default.createElement("div",{className:"card-title"},e.default.createElement("div",{className:"d-flex justify-content-center flex-column me-3"},e.default.createElement("span",{className:"fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1"},E(r)," Link ",document.title))),e.default.createElement("div",{className:"card-toolbar"},e.default.createElement("button",{className:"btn btn-sm btn-icon btn-active-light-primary",onClick:I},e.default.createElement("i",{className:"ki-duotone ki-cross fs-2"},e.default.createElement("span",{className:"path1"}),e.default.createElement("span",{className:"path2"}))))),e.default.createElement(l.Body,{className:"hover-scroll-overlay-y"},g("Nama","nama",{onChange:t=>d(a=>({...a,[t.target.name]:t.target.value})),value:s("nama",m)},!0,F),g("Link Youtube","link",{onChange:t=>d(a=>({...a,[t.target.name]:t.target.value})),value:s("link",m)},!0,F)),e.default.createElement(l.Footer,{className:"text-end"},e.default.createElement(j,null,v(`Simpan Link ${document.title}`,w,{onClick:w?null:M}),v("Batal",!1,{variant:"danger",onClick:()=>I()}))))))},J=W;export{J as default};
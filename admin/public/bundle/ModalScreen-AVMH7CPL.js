import{a as k}from"./chunk-SJTF4NYS.js";import{c as T}from"./chunk-PB4JHPSQ.js";import{a as y,c as b}from"./chunk-DUWXWW73.js";import{c as l,d as s,e as o,h as S,k as x,n as M}from"./chunk-5VQXXJVA.js";import{l as a,q as g}from"./chunk-5TOVVIUE.js";import"./chunk-AQBTORL7.js";import"./chunk-T6HN2I3K.js";import"./chunk-ZDGVLX7E.js";import{d as I,e as B}from"./chunk-2ZKIS3S6.js";var e=I(B());var C=()=>{let{module:f,init:v}=y(t=>t.redux),{openModalScreen:i,daftarScreen:N,detailContent:n}=f,_=b(),[c,p]=(0,e.useState)([]);(0,e.useLayoutEffect)(()=>{if(i&&S(n)){let t=[];n.screen_active.forEach(h=>{t.push(o(s("id_screen",h)))}),p(t)}return()=>{}},[i,n]);let A=()=>{_(T({...f,openModalScreen:!1,detailContent:{}}))},E=t=>{let h={id_playlist:s("id",n),id_screen:s("id",t),pageType:s("pageType",t),user_modified:s("username",v)};x("/handlesetscreen",h).then(u=>{if(typeof u>"u")return;let{data:r}=u;if(typeof r.code<"u"&&s("code",r)!==200){l(!1,s("message",r));return}if(l(r.status,r.msg_response),!!r.status){if(M(),s("pageType",t)==="delete"){let d=[];c.forEach(m=>{m!==s("id",t)&&d.push(m)}),p(d);return}p(d=>d.concat(o(s("id",t))))}})};return e.default.createElement(a,{show:i,onHide:A,backdrop:"static"},e.default.createElement(a.Header,{closeButton:!0},e.default.createElement(a.Title,null,"Daftar Screen")),e.default.createElement(a.Body,null,e.default.createElement(g,{responsive:!0,hover:!0,className:"align-middle table-row-dashed fs-6",size:"sm"},e.default.createElement("thead",null,e.default.createElement("tr",{className:"text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0"},e.default.createElement("th",{className:"text-center",style:{width:"5%"}}),e.default.createElement("th",null,"kode"),e.default.createElement("th",null,"nama"))),e.default.createElement("tbody",{className:"text-gray-600 fw-semibold"},e.default.createElement(k,{of:N,render:t=>e.default.createElement("tr",{style:{cursor:"pointer"},onClick:()=>E({...t,pageType:c.includes(o(s("id",t)))?"delete":"insert"})},e.default.createElement("td",{className:"text-center"},e.default.createElement("input",{className:"form-check-input",type:"checkbox",disabled:!0,checked:c.includes(o(s("id",t)))})),e.default.createElement("td",null,s("kode",t)),e.default.createElement("td",null,s("nama",t)))})))))},q=C;export{q as default};

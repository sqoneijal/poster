import{c as b}from"./chunk-PB4JHPSQ.js";import{a as N,c as O}from"./chunk-DUWXWW73.js";import{c,d as o,e as g,f as M,h as v,j as D,k as I}from"./chunk-5VQXXJVA.js";import{e as S,l as n}from"./chunk-5TOVVIUE.js";import"./chunk-AQBTORL7.js";import"./chunk-T6HN2I3K.js";import"./chunk-ZDGVLX7E.js";import{d as L,e as P}from"./chunk-2ZKIS3S6.js";var t=L(P());var T=({setListContent:k,listContent:x})=>{let{module:u,init:F}=N(a=>a.redux),{openModalEditOrigName:d,detailContent:l}=u,C=O(),[E,j]=(0,t.useState)(!1),[i,p]=(0,t.useState)({}),[H,y]=(0,t.useState)({});(0,t.useLayoutEffect)(()=>(d&&v(l)&&p({...l}),()=>{}),[d,l]);let f=()=>{p({}),y({})},_=()=>{f(),C(b({...u,openModalEditOrigName:!1,detailContent:{}}))},G=a=>{a.preventDefault();let r={user_modified:o("username",F)};Object.keys(i).forEach(s=>r[s]=i[s]),j(!0);let B=I("/updateorigname",r);B.then(s=>{if(typeof s>"u")return;let{data:e}=s;if(typeof e.code<"u"&&o("code",e)!==200){c(!1,o("message",e));return}if(y(e.errors),c(e.status,e.msg_response),!e.status)return;let m=[];x.map(h=>{g(o("id",h))===g(r.id)?m.push({...h,judul:o("judul",i)}):m.push(h)}),k(m),f(),C(b({...u,openModalEditOrigName:!1,detailContent:{}}))}),B.finally(()=>{j(!1)})};return t.default.createElement(n,{show:d,onHide:f,backdrop:"static"},t.default.createElement(n.Header,null,t.default.createElement(n.Title,null,"Perbaharui Nama File")),t.default.createElement(n.Body,null,D("Judul","judul",{onChange:a=>p(r=>({...r,[a.target.name]:a.target.value})),value:o("judul",i)},!0,H)),t.default.createElement(n.Footer,null,t.default.createElement(S,null,M("Simpan",E,{onClick:E?null:G}),M("Batal",!1,{variant:"danger",onClick:()=>_()}))))},A=T;export{A as default};

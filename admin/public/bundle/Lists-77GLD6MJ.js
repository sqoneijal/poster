import{c as b}from"./chunk-4TGKIISG.js";import{a as u,c}from"./chunk-DUWXWW73.js";import{c as h,d as r,o as p,q as f}from"./chunk-5VQXXJVA.js";import{q as m}from"./chunk-5TOVVIUE.js";import"./chunk-AQBTORL7.js";import"./chunk-T6HN2I3K.js";import"./chunk-ZDGVLX7E.js";import{d as v,e as k}from"./chunk-2ZKIS3S6.js";var t=v(k());var i,g=()=>{let{module:w}=u(e=>e.redux),y=c();return i=p({show_edit_button:!0,show_delete_button:!0,url:"/getdata",columns:[{data:"kode"},{data:"nama"},{data:"screen_rotation"},{data:"screen_animation"},{data:null,render:e=>`<span id="status-${r("kode",e)}" class="text-danger fw-bold fs-4">Offline</span>`},{data:null,width:"10%"}],columnDefs:!0,createdRow:(e,s)=>{let a=e.querySelector("#edit");a&&(a.onclick=n=>{n.preventDefault(),y(b({...w,openForms:!0,pageType:"update",detailContent:s}))});let l=e.querySelector("#delete");l&&(l.onclick=n=>{n.preventDefault(),f({url:"/hapus",id:s.id}).then(d=>{if(typeof d>"u")return;let{data:o}=d;h(o.status,o.msg_response),o.status&&i.reload()})});let _=e.querySelector("#view-screen");_.onclick=n=>{n.preventDefault(),window.open(`http://localhost/poster/frontend/?screen=${r("kode",s)}`,"_blank")}},custom_button:'<a href="#" id="view-screen" class="btn btn-active-icon-primary btn-active-text-primary btn-sm p-0 m-0"><i class="ki-outline ki-monitor-mobile fs-1"></i></a>'}),(0,t.useLayoutEffect)(()=>{i.init();let e=new WebSocket("ws://localhost:8888/event");return e.onmessage=s=>{let a=document.querySelector(`#status-${s.data}`);a&&(a.classList.remove("text-danger"),a.classList.add("text-primary"),a.innerHTML="Online")},()=>{}},[]),t.default.createElement(m,{responsive:!0,hover:!0,id:"datatable",className:"align-middle table-row-dashed fs-6",size:"sm"},t.default.createElement("thead",null,t.default.createElement("tr",{className:"text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0"},t.default.createElement("th",null,"kode"),t.default.createElement("th",null,"nama"),t.default.createElement("th",null,"rotasi"),t.default.createElement("th",null,"animasi"),t.default.createElement("th",null,"status"),t.default.createElement("th",null))),t.default.createElement("tbody",{className:"text-gray-600 fw-semibold"}))},T=g;export{T as default};

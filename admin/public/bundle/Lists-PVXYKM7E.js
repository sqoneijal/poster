import{c as h}from"./chunk-ORPF6BBH.js";import{a as u,c as n}from"./chunk-DUWXWW73.js";import{c as m,n as c,p}from"./chunk-K5HZLVTK.js";import{q as f}from"./chunk-5TOVVIUE.js";import"./chunk-AQBTORL7.js";import"./chunk-T6HN2I3K.js";import"./chunk-ZDGVLX7E.js";import{d as x,e as y}from"./chunk-2ZKIS3S6.js";var t=x(y());var r,g=()=>{let{module:b}=u(e=>e.redux),_=n();return r=c({show_edit_button:!0,show_delete_button:!0,url:"/getdata",columns:[{data:"text"},{data:null}],columnDefs:!0,createdRow:(e,s)=>{let l=e.querySelector("#edit");l&&(l.onclick=a=>{a.preventDefault(),_(h({...b,openForms:!0,pageType:"update",detailContent:s}))});let d=e.querySelector("#delete");d&&(d.onclick=a=>{a.preventDefault(),p({url:"/hapus",id:s.id}).then(i=>{if(typeof i>"u")return;let{data:o}=i;m(o.status,o.msg_response),o.status&&r.reload()})})}}),(0,t.useLayoutEffect)(()=>(r.init(),()=>{}),[]),t.default.createElement(f,{responsive:!0,hover:!0,id:"datatable",className:"align-middle table-row-dashed fs-6",size:"sm"},t.default.createElement("thead",null,t.default.createElement("tr",{className:"text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0"},t.default.createElement("th",null,"text"),t.default.createElement("th",null))),t.default.createElement("tbody",{className:"text-gray-600 fw-semibold"}))},T=g;export{T as default};
import{c as m,h as u}from"./chunk-PB4JHPSQ.js";import{a as i}from"./chunk-LOOOLLH5.js";import{a as d,c as l}from"./chunk-DUWXWW73.js";import{b as p,c as f,d as s}from"./chunk-5VQXXJVA.js";import{f as r}from"./chunk-5TOVVIUE.js";import"./chunk-AQBTORL7.js";import"./chunk-T6HN2I3K.js";import"./chunk-ZDGVLX7E.js";import{d as b,e as C}from"./chunk-2ZKIS3S6.js";var e=b(C());var S=e.default.lazy(()=>import("./Lists-2LOZCAGM.js")),x=e.default.lazy(()=>import("./Forms-YVDDSLNK.js")),z=e.default.lazy(()=>import("./ModalScreen-AVMH7CPL.js")),L=e.default.lazy(()=>import("./Filter-GT63PKKX.js")),w=e.default.lazy(()=>import("./FormsContent-DEOD6SLA.js")),B=()=>{let{module:c}=d(t=>t.redux),a=l(),[y,g]=(0,e.useState)(!0),h=()=>{let t=p("/initpage");t.then(n=>{if(typeof n>"u")return;let{data:o}=n;if(typeof o.code<"u"&&s("code",o)!==200){f(!1,s("message",o));return}a(m({...c,...o}))}),t.finally(()=>{g(!1)})};return(0,e.useLayoutEffect)(()=>(a(u({label:`Tambah ${document.title}`,type:"add",loading:"false"})),h(),()=>{}),[]),!y&&e.default.createElement(r,{className:"shadow-sm card-bordered"},e.default.createElement(r.Body,null,e.default.createElement(e.default.Suspense,{fallback:e.default.createElement(i,{visible:!0,color:"#4fa94d",radius:"9",wrapperStyle:{alignItems:"center",display:"flex",justifyContent:"center"},wrapperClass:"page-loader flex-column bg-dark bg-opacity-25"})},e.default.createElement(L,null),e.default.createElement(S,null),e.default.createElement(x,null),e.default.createElement(z,null),e.default.createElement(w,null))))},v=B;export{v as default};

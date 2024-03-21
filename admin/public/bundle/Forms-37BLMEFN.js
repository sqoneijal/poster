import{c as N,e as W}from"./chunk-PB4JHPSQ.js";import{a as V,c as K}from"./chunk-DUWXWW73.js";import{c as O,d as E,f as x,h as U,i as R,j as G,k as J}from"./chunk-5VQXXJVA.js";import{a as oe,e as z,f as S}from"./chunk-5TOVVIUE.js";import"./chunk-AQBTORL7.js";import"./chunk-T6HN2I3K.js";import"./chunk-ZDGVLX7E.js";import{d as L,e as A}from"./chunk-2ZKIS3S6.js";var C=L(A());var n=L(oe()),B=function(){return B=Object.assign||function(r){for(var t,o=1,i=arguments.length;o<i;o++){t=arguments[o];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(r[a]=t[a])}return r},B.apply(this,arguments)},D={onActivate:n.func,onAddUndo:n.func,onBeforeAddUndo:n.func,onBeforeExecCommand:n.func,onBeforeGetContent:n.func,onBeforeRenderUI:n.func,onBeforeSetContent:n.func,onBeforePaste:n.func,onBlur:n.func,onChange:n.func,onClearUndos:n.func,onClick:n.func,onContextMenu:n.func,onCommentChange:n.func,onCopy:n.func,onCut:n.func,onDblclick:n.func,onDeactivate:n.func,onDirty:n.func,onDrag:n.func,onDragDrop:n.func,onDragEnd:n.func,onDragGesture:n.func,onDragOver:n.func,onDrop:n.func,onExecCommand:n.func,onFocus:n.func,onFocusIn:n.func,onFocusOut:n.func,onGetContent:n.func,onHide:n.func,onInit:n.func,onKeyDown:n.func,onKeyPress:n.func,onKeyUp:n.func,onLoadContent:n.func,onMouseDown:n.func,onMouseEnter:n.func,onMouseLeave:n.func,onMouseMove:n.func,onMouseOut:n.func,onMouseOver:n.func,onMouseUp:n.func,onNodeChange:n.func,onObjectResizeStart:n.func,onObjectResized:n.func,onObjectSelected:n.func,onPaste:n.func,onPostProcess:n.func,onPostRender:n.func,onPreProcess:n.func,onProgressState:n.func,onRedo:n.func,onRemove:n.func,onReset:n.func,onSaveContent:n.func,onSelectionChange:n.func,onSetAttrib:n.func,onSetContent:n.func,onShow:n.func,onSubmit:n.func,onUndo:n.func,onVisualAid:n.func,onSkinLoadError:n.func,onThemeLoadError:n.func,onModelLoadError:n.func,onPluginLoadError:n.func,onIconsLoadError:n.func,onLanguageLoadError:n.func,onScriptsLoad:n.func,onScriptsLoadError:n.func},$=B({apiKey:n.string,id:n.string,inline:n.bool,init:n.object,initialValue:n.string,onEditorChange:n.func,value:n.string,tagName:n.string,cloudChannel:n.string,plugins:n.oneOfType([n.string,n.array]),toolbar:n.oneOfType([n.string,n.array]),disabled:n.bool,textareaName:n.string,tinymceScriptSrc:n.oneOfType([n.string,n.arrayOf(n.string),n.arrayOf(n.shape({src:n.string,async:n.bool,defer:n.bool}))]),rollback:n.oneOfType([n.number,n.oneOf([!1])]),scriptLoading:n.shape({async:n.bool,defer:n.bool,delay:n.number})},D);var k=function(r){return typeof r=="function"},q=function(r){return r in D},Q=function(r){return r.substr(2)},ie=function(r,t,o,i,a,p,e){var s=Object.keys(a).filter(q),u=Object.keys(p).filter(q),c=s.filter(function(l){return p[l]===void 0}),f=u.filter(function(l){return a[l]===void 0});c.forEach(function(l){var y=Q(l),m=e[y];o(y,m),delete e[y]}),f.forEach(function(l){var y=i(r,l),m=Q(l);e[m]=y,t(m,y)})},Z=function(r,t,o,i,a){return ie(a,r.on.bind(r),r.off.bind(r),function(p,e){return function(s){var u;return(u=p(e))===null||u===void 0?void 0:u(s,r)}},t,o,i)},X=0,_=function(r){var t=Date.now(),o=Math.floor(Math.random()*1e9);return X++,r+"_"+o+X+String(t)},j=function(r){return r!==null&&(r.tagName.toLowerCase()==="textarea"||r.tagName.toLowerCase()==="input")},Y=function(r){return typeof r>"u"||r===""?[]:Array.isArray(r)?r:r.split(" ")},ee=function(r,t){return Y(r).concat(Y(t))},ne=function(){return window.InputEvent&&typeof InputEvent.prototype.getTargetRanges=="function"},re=function(r){if(!("isConnected"in Node.prototype)){for(var t=r,o=r.parentNode;o!=null;)t=o,o=t.parentNode;return t===r.ownerDocument}return r.isConnected},M=function(r,t){r!==void 0&&(r.mode!=null&&typeof r.mode=="object"&&typeof r.mode.set=="function"?r.mode.set(t):r.setMode(t))};var H=function(){return H=Object.assign||function(r){for(var t,o=1,i=arguments.length;o<i;o++){t=arguments[o];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(r[a]=t[a])}return r},H.apply(this,arguments)},ae=function(r,t,o){var i,a,p=r.createElement("script");p.referrerPolicy="origin",p.type="application/javascript",p.id=t.id,p.src=t.src,p.async=(i=t.async)!==null&&i!==void 0?i:!1,p.defer=(a=t.defer)!==null&&a!==void 0?a:!1;var e=function(){p.removeEventListener("load",e),p.removeEventListener("error",s),o(t.src)},s=function(u){p.removeEventListener("load",e),p.removeEventListener("error",s),o(t.src,u)};p.addEventListener("load",e),p.addEventListener("error",s),r.head&&r.head.appendChild(p)},se=function(r){var t={},o=function(e,s){var u=t[e];u.done=!0,u.error=s;for(var c=0,f=u.handlers;c<f.length;c++){var l=f[c];l(e,s)}u.handlers=[]},i=function(e,s,u){var c=function(T){return u!==void 0?u(T):console.error(T)};if(e.length===0){c(new Error("At least one script must be provided"));return}for(var f=0,l=!1,y=function(T,P){l||(P?(l=!0,c(P)):++f===e.length&&s())},m=0,v=e;m<v.length;m++){var h=v[m],g=t[h.src];if(g)g.done?y(h.src,g.error):g.handlers.push(y);else{var b=_("tiny-");t[h.src]={id:b,src:h.src,done:!1,error:null,handlers:[y]},ae(r,H({id:b},h),o)}}},a=function(){for(var e,s=0,u=Object.values(t);s<u.length;s++){var c=u[s],f=r.getElementById(c.id);f!=null&&f.tagName==="SCRIPT"&&((e=f.parentNode)===null||e===void 0||e.removeChild(f))}t={}},p=function(){return r};return{loadScripts:i,deleteScripts:a,getDocument:p}},pe=function(){var r=[],t=function(a){var p=r.find(function(e){return e.getDocument()===a});return p===void 0&&(p=se(a),r.push(p)),p},o=function(a,p,e,s,u){var c=function(){return t(a).loadScripts(p,s,u)};e>0?setTimeout(c,e):c()},i=function(){for(var a=r.pop();a!=null;a=r.pop())a.deleteScripts()};return{loadList:o,reinitialize:i}},te=pe();var w=function(r){var t=r;return t&&t.tinymce?t.tinymce:null};var ue=function(){var r=function(t,o){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(i,a){i.__proto__=a}||function(i,a){for(var p in a)Object.prototype.hasOwnProperty.call(a,p)&&(i[p]=a[p])},r(t,o)};return function(t,o){if(typeof o!="function"&&o!==null)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");r(t,o);function i(){this.constructor=t}t.prototype=o===null?Object.create(o):(i.prototype=o.prototype,new i)}}(),I=function(){return I=Object.assign||function(r){for(var t,o=1,i=arguments.length;o<i;o++){t=arguments[o];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(r[a]=t[a])}return r},I.apply(this,arguments)},F=function(r){ue(t,r);function t(o){var i,a,p,e=r.call(this,o)||this;return e.rollbackTimer=void 0,e.valueCursor=void 0,e.rollbackChange=function(){var s=e.editor,u=e.props.value;s&&u&&u!==e.currentContent&&s.undoManager.ignore(function(){if(s.setContent(u),e.valueCursor&&(!e.inline||s.hasFocus()))try{s.selection.moveToBookmark(e.valueCursor)}catch{}}),e.rollbackTimer=void 0},e.handleBeforeInput=function(s){if(e.props.value!==void 0&&e.props.value===e.currentContent&&e.editor&&(!e.inline||e.editor.hasFocus()))try{e.valueCursor=e.editor.selection.getBookmark(3)}catch{}},e.handleBeforeInputSpecial=function(s){(s.key==="Enter"||s.key==="Backspace"||s.key==="Delete")&&e.handleBeforeInput(s)},e.handleEditorChange=function(s){var u=e.editor;if(u&&u.initialized){var c=u.getContent();e.props.value!==void 0&&e.props.value!==c&&e.props.rollback!==!1&&(e.rollbackTimer||(e.rollbackTimer=window.setTimeout(e.rollbackChange,typeof e.props.rollback=="number"?e.props.rollback:200))),c!==e.currentContent&&(e.currentContent=c,k(e.props.onEditorChange)&&e.props.onEditorChange(c,u))}},e.handleEditorChangeSpecial=function(s){(s.key==="Backspace"||s.key==="Delete")&&e.handleEditorChange(s)},e.initialise=function(s){var u,c,f;s===void 0&&(s=0);var l=e.elementRef.current;if(l){if(!re(l)){if(s===0)setTimeout(function(){return e.initialise(1)},1);else if(s<100)setTimeout(function(){return e.initialise(s+1)},100);else throw new Error("tinymce can only be initialised when in a document");return}var y=w(e.view);if(!y)throw new Error("tinymce should have been loaded into global scope");var m=I(I({},e.props.init),{selector:void 0,target:l,readonly:e.props.disabled,inline:e.inline,plugins:ee((u=e.props.init)===null||u===void 0?void 0:u.plugins,e.props.plugins),toolbar:(c=e.props.toolbar)!==null&&c!==void 0?c:(f=e.props.init)===null||f===void 0?void 0:f.toolbar,setup:function(v){e.editor=v,e.bindHandlers({}),e.inline&&!j(l)&&v.once("PostRender",function(h){v.setContent(e.getInitialValue(),{no_events:!0})}),e.props.init&&k(e.props.init.setup)&&e.props.init.setup(v)},init_instance_callback:function(v){var h,g,b=e.getInitialValue();e.currentContent=(h=e.currentContent)!==null&&h!==void 0?h:v.getContent(),e.currentContent!==b&&(e.currentContent=b,v.setContent(b),v.undoManager.clear(),v.undoManager.add(),v.setDirty(!1));var T=(g=e.props.disabled)!==null&&g!==void 0?g:!1;M(e.editor,T?"readonly":"design"),e.props.init&&k(e.props.init.init_instance_callback)&&e.props.init.init_instance_callback(v)}});e.inline||(l.style.visibility=""),j(l)&&(l.value=e.getInitialValue()),y.init(m)}},e.id=e.props.id||_("tiny-react"),e.elementRef=C.createRef(),e.inline=(p=(i=e.props.inline)!==null&&i!==void 0?i:(a=e.props.init)===null||a===void 0?void 0:a.inline)!==null&&p!==void 0?p:!1,e.boundHandlers={},e}return Object.defineProperty(t.prototype,"view",{get:function(){var o,i;return(i=(o=this.elementRef.current)===null||o===void 0?void 0:o.ownerDocument.defaultView)!==null&&i!==void 0?i:window},enumerable:!1,configurable:!0}),t.prototype.componentDidUpdate=function(o){var i=this,a,p;if(this.rollbackTimer&&(clearTimeout(this.rollbackTimer),this.rollbackTimer=void 0),this.editor&&(this.bindHandlers(o),this.editor.initialized)){if(this.currentContent=(a=this.currentContent)!==null&&a!==void 0?a:this.editor.getContent(),typeof this.props.initialValue=="string"&&this.props.initialValue!==o.initialValue)this.editor.setContent(this.props.initialValue),this.editor.undoManager.clear(),this.editor.undoManager.add(),this.editor.setDirty(!1);else if(typeof this.props.value=="string"&&this.props.value!==this.currentContent){var e=this.editor;e.undoManager.transact(function(){var u;if(!i.inline||e.hasFocus())try{u=e.selection.getBookmark(3)}catch{}var c=i.valueCursor;if(e.setContent(i.props.value),!i.inline||e.hasFocus())for(var f=0,l=[u,c];f<l.length;f++){var y=l[f];if(y)try{e.selection.moveToBookmark(y),i.valueCursor=y;break}catch{}}})}if(this.props.disabled!==o.disabled){var s=(p=this.props.disabled)!==null&&p!==void 0?p:!1;M(this.editor,s?"readonly":"design")}}},t.prototype.componentDidMount=function(){var o=this,i,a,p,e,s;if(w(this.view)!==null)this.initialise();else if(Array.isArray(this.props.tinymceScriptSrc)&&this.props.tinymceScriptSrc.length===0)(a=(i=this.props).onScriptsLoadError)===null||a===void 0||a.call(i,new Error("No `tinymce` global is present but the `tinymceScriptSrc` prop was an empty array."));else if(!((p=this.elementRef.current)===null||p===void 0)&&p.ownerDocument){var u=function(){var f,l;(l=(f=o.props).onScriptsLoad)===null||l===void 0||l.call(f),o.initialise()},c=function(f){var l,y;(y=(l=o.props).onScriptsLoadError)===null||y===void 0||y.call(l,f)};te.loadList(this.elementRef.current.ownerDocument,this.getScriptSources(),(s=(e=this.props.scriptLoading)===null||e===void 0?void 0:e.delay)!==null&&s!==void 0?s:0,u,c)}},t.prototype.componentWillUnmount=function(){var o=this,i=this.editor;i&&(i.off(this.changeEvents(),this.handleEditorChange),i.off(this.beforeInputEvent(),this.handleBeforeInput),i.off("keypress",this.handleEditorChangeSpecial),i.off("keydown",this.handleBeforeInputSpecial),i.off("NewBlock",this.handleEditorChange),Object.keys(this.boundHandlers).forEach(function(a){i.off(a,o.boundHandlers[a])}),this.boundHandlers={},i.remove(),this.editor=void 0)},t.prototype.render=function(){return this.inline?this.renderInline():this.renderIframe()},t.prototype.changeEvents=function(){var o,i,a,p=(a=(i=(o=w(this.view))===null||o===void 0?void 0:o.Env)===null||i===void 0?void 0:i.browser)===null||a===void 0?void 0:a.isIE();return p?"change keyup compositionend setcontent CommentChange":"change input compositionend setcontent CommentChange"},t.prototype.beforeInputEvent=function(){return ne()?"beforeinput SelectionChange":"SelectionChange"},t.prototype.renderInline=function(){var o=this.props.tagName,i=o===void 0?"div":o;return C.createElement(i,{ref:this.elementRef,id:this.id})},t.prototype.renderIframe=function(){return C.createElement("textarea",{ref:this.elementRef,style:{visibility:"hidden"},name:this.props.textareaName,id:this.id})},t.prototype.getScriptSources=function(){var o,i,a=(o=this.props.scriptLoading)===null||o===void 0?void 0:o.async,p=(i=this.props.scriptLoading)===null||i===void 0?void 0:i.defer;if(this.props.tinymceScriptSrc!==void 0)return typeof this.props.tinymceScriptSrc=="string"?[{src:this.props.tinymceScriptSrc,async:a,defer:p}]:this.props.tinymceScriptSrc.map(function(c){return typeof c=="string"?{src:c,async:a,defer:p}:c});var e=this.props.cloudChannel,s=this.props.apiKey?this.props.apiKey:"no-api-key",u="https://cdn.tiny.cloud/1/".concat(s,"/tinymce/").concat(e,"/tinymce.min.js");return[{src:u,async:a,defer:p}]},t.prototype.getInitialValue=function(){return typeof this.props.initialValue=="string"?this.props.initialValue:typeof this.props.value=="string"?this.props.value:""},t.prototype.bindHandlers=function(o){var i=this;if(this.editor!==void 0){Z(this.editor,o,this.props,this.boundHandlers,function(s){return i.props[s]});var a=function(s){return s.onEditorChange!==void 0||s.value!==void 0},p=a(o),e=a(this.props);!p&&e?(this.editor.on(this.changeEvents(),this.handleEditorChange),this.editor.on(this.beforeInputEvent(),this.handleBeforeInput),this.editor.on("keydown",this.handleBeforeInputSpecial),this.editor.on("keyup",this.handleEditorChangeSpecial),this.editor.on("NewBlock",this.handleEditorChange)):p&&!e&&(this.editor.off(this.changeEvents(),this.handleEditorChange),this.editor.off(this.beforeInputEvent(),this.handleBeforeInput),this.editor.off("keydown",this.handleBeforeInputSpecial),this.editor.off("keyup",this.handleEditorChangeSpecial),this.editor.off("NewBlock",this.handleEditorChange))}},t.propTypes=$,t.defaultProps={cloudChannel:"6"},t}(C.Component);var d=L(A());var ce=()=>{let{module:r,init:t}=V(h=>h.redux),{openForms:o,pageType:i,detailContent:a}=r,p=K(),[e,s]=(0,d.useState)(!1),[u,c]=(0,d.useState)({}),[f,l]=(0,d.useState)({});(0,d.useLayoutEffect)(()=>(i==="update"&&U(a)&&c({...a}),()=>{}),[i,a]);let y=()=>{c({}),l({})},m=()=>{y(),p(N({...r,openForms:!1,pageType:"",detailContent:{}}))},v=h=>{h.preventDefault();let g={pageType:i,user_modified:E("username",t)};Object.keys(u).forEach(T=>g[T]=u[T]),s(!0);let b=J("/submit",g);b.then(T=>{if(typeof T>"u")return;let{data:P}=T;if(typeof P.code<"u"&&E("code",P)!==200){O(!1,E("message",P));return}l(P.errors),O(P.status,P.msg_response),P.status&&(y(),p(N({...r,openForms:!1,pageType:"",detailContent:{}})),p(W({url:"/getdata",data:{}})))}),b.finally(()=>{s(!1)})};return d.default.createElement(d.default.Fragment,null,o&&d.default.createElement("div",{className:"drawer-overlay"}),d.default.createElement("div",{className:`bg-white drawer drawer-start ${o?"drawer-on":""}`,style:{width:window.innerWidth/2}},d.default.createElement(S,{className:"rounded-0 w-100"},d.default.createElement(S.Header,{className:"pe-5"},d.default.createElement("div",{className:"card-title"},d.default.createElement("div",{className:"d-flex justify-content-center flex-column me-3"},d.default.createElement("span",{className:"fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1"},R(i)," ",document.title))),d.default.createElement("div",{className:"card-toolbar"},d.default.createElement("button",{className:"btn btn-sm btn-icon btn-active-light-primary",onClick:m},d.default.createElement("i",{className:"ki-duotone ki-cross fs-2"},d.default.createElement("span",{className:"path1"}),d.default.createElement("span",{className:"path2"}))))),d.default.createElement(S.Body,{className:"hover-scroll-overlay-y"},G("Judul","judul",{onChange:h=>c(g=>({...g,[h.target.name]:h.target.value})),value:E("judul",u)},!0,f),d.default.createElement(F,{tinymceScriptSrc:"/tinymce/tinymce.min.js",value:E("content",u),onEditorChange:h=>c(g=>({...g,content:h})),init:{menubar:!1,height:window.innerHeight-400,plugins:["preview","importcss","searchreplace","autolink","autosave","save","directionality","code","visualblocks","visualchars","fullscreen","image","link","media","codesample","table","charmap","pagebreak","nonbreaking","insertdatetime","advlist","lists","wordcount","help","charmap","emoticons"],toolbar:"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | pagebreak codesample",content_style:"body { font-family:Helvetica Neue; font-size:20px }"}})),d.default.createElement(S.Footer,{className:"text-end"},d.default.createElement(z,null,x(`Simpan ${document.title}`,e,{onClick:e?null:v}),x("Batal",!1,{variant:"danger",onClick:()=>m()}))))))},Le=ce;export{Le as default};

(self.webpackChunkjad_quick=self.webpackChunkjad_quick||[]).push([[340],{2143:function(w,W,m){"use strict";var k=m(59934),R=m(67294),b=m(96057);function x(i,c){return L(i)||T(i,c)||g(i,c)||A()}function A(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function g(i,c){if(!!i){if(typeof i=="string")return O(i,c);var l=Object.prototype.toString.call(i).slice(8,-1);if(l==="Object"&&i.constructor&&(l=i.constructor.name),l==="Map"||l==="Set")return Array.from(i);if(l==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l))return O(i,c)}}function O(i,c){(c==null||c>i.length)&&(c=i.length);for(var l=0,e=new Array(c);l<c;l++)e[l]=i[l];return e}function T(i,c){var l=i==null?null:typeof Symbol!="undefined"&&i[Symbol.iterator]||i["@@iterator"];if(l!=null){var e=[],r=!0,n=!1,o,a;try{for(l=l.call(i);!(r=(o=l.next()).done)&&(e.push(o.value),!(c&&e.length===c));r=!0);}catch(s){n=!0,a=s}finally{try{!r&&l.return!=null&&l.return()}finally{if(n)throw a}}return e}}function L(i){if(Array.isArray(i))return i}var B=function(c){var l,e=c.id,r=useAtomAssets(),n=r.components,o=n==null?void 0:n[e],a=useIntl();return React.createElement("div",{className:"markdown"},React.createElement(Table,null,React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null,a.formatMessage({id:"api.component.name"})),React.createElement("th",null,a.formatMessage({id:"api.component.description"})),React.createElement("th",null,a.formatMessage({id:"api.component.type"})),React.createElement("th",null,a.formatMessage({id:"api.component.default"})))),React.createElement("tbody",null,o&&(l=o.propsConfig)!==null&&l!==void 0&&l.properties?Object.entries(o.propsConfig.properties).map(function(s){var _,j=x(s,2),t=j[0],u=j[1];return React.createElement("tr",{key:t},React.createElement("td",null,t),React.createElement("td",null,u.description||"--"),React.createElement("td",null,React.createElement("code",null,u.type)),React.createElement("td",null,React.createElement("code",null,(_=o.propsConfig.required)!==null&&_!==void 0&&_.includes(t)?a.formatMessage({id:"api.component.required"}):u.default||"--")))}):React.createElement("tr",null,React.createElement("td",{colSpan:4},a.formatMessage({id:"api.component.".concat(n?"not.found":"loading")},{id:e}))))))},D=null},93359:function(w,W,m){"use strict";var k=m(67294);function R(){return R=Object.assign?Object.assign.bind():function(A){for(var g=1;g<arguments.length;g++){var O=arguments[g];for(var T in O)Object.prototype.hasOwnProperty.call(O,T)&&(A[T]=O[T])}return A},R.apply(this,arguments)}var b=function(g){return React.createElement("span",R({className:"dumi-default-badge"},g))},x=null},96057:function(w,W,m){"use strict";m.d(W,{Z:function(){return l}});var k=m(93096),R=m.n(k),b=m(67294),x=["children"];function A(e,r){return B(e)||L(e,r)||O(e,r)||g()}function g(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function O(e,r){if(!!e){if(typeof e=="string")return T(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return T(e,r)}}function T(e,r){(r==null||r>e.length)&&(r=e.length);for(var n=0,o=new Array(r);n<r;n++)o[n]=e[n];return o}function L(e,r){var n=e==null?null:typeof Symbol!="undefined"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var o=[],a=!0,s=!1,_,j;try{for(n=n.call(e);!(a=(_=n.next()).done)&&(o.push(_.value),!(r&&o.length===r));a=!0);}catch(t){s=!0,j=t}finally{try{!a&&n.return!=null&&n.return()}finally{if(s)throw j}}return o}}function B(e){if(Array.isArray(e))return e}function D(e,r){if(e==null)return{};var n=i(e,r),o,a;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)o=s[a],!(r.indexOf(o)>=0)&&(!Object.prototype.propertyIsEnumerable.call(e,o)||(n[o]=e[o]))}return n}function i(e,r){if(e==null)return{};var n={},o=Object.keys(e),a,s;for(s=0;s<o.length;s++)a=o[s],!(r.indexOf(a)>=0)&&(n[a]=e[a]);return n}var c=function(r){var n=r.children,o=D(r,x),a=(0,b.useRef)(null),s=(0,b.useState)(!1),_=A(s,2),j=_[0],t=_[1],u=(0,b.useState)(!1),d=A(u,2),p=d[0],h=d[1];return(0,b.useEffect)(function(){var v=a.current;if(v){var y=R()(function(){t(v.scrollLeft>0),h(v.scrollLeft<v.scrollWidth-v.offsetWidth)},100);return y(),v.addEventListener("scroll",y),window.addEventListener("resize",y),function(){v.removeEventListener("scroll",y),window.removeEventListener("resize",y)}}},[]),b.createElement("div",{className:"dumi-default-table"},b.createElement("div",{className:"dumi-default-table-content",ref:a,"data-left-folded":j||void 0,"data-right-folded":p||void 0},b.createElement("table",o,n)))},l=c},93096:function(w,W,m){var k="Expected a function",R=NaN,b="[object Symbol]",x=/^\s+|\s+$/g,A=/^[-+]0x[0-9a-f]+$/i,g=/^0b[01]+$/i,O=/^0o[0-7]+$/i,T=parseInt,L=typeof m.g=="object"&&m.g&&m.g.Object===Object&&m.g,B=typeof self=="object"&&self&&self.Object===Object&&self,D=L||B||Function("return this")(),i=Object.prototype,c=i.toString,l=Math.max,e=Math.min,r=function(){return D.Date.now()};function n(t,u,d){var p,h,v,y,E,S,M=0,K=!1,P=!1,N=!0;if(typeof t!="function")throw new TypeError(k);u=j(u)||0,a(d)&&(K=!!d.leading,P="maxWait"in d,v=P?l(j(d.maxWait)||0,u):v,N="trailing"in d?!!d.trailing:N);function $(f){var I=p,C=h;return p=h=void 0,M=f,y=t.apply(C,I),y}function G(f){return M=f,E=setTimeout(F,u),K?$(f):y}function Z(f){var I=f-S,C=f-M,X=u-I;return P?e(X,v-C):X}function H(f){var I=f-S,C=f-M;return S===void 0||I>=u||I<0||P&&C>=v}function F(){var f=r();if(H(f))return z(f);E=setTimeout(F,Z(f))}function z(f){return E=void 0,N&&p?$(f):(p=h=void 0,y)}function J(){E!==void 0&&clearTimeout(E),M=0,p=S=h=E=void 0}function Q(){return E===void 0?y:z(r())}function U(){var f=r(),I=H(f);if(p=arguments,h=this,S=f,I){if(E===void 0)return G(S);if(P)return E=setTimeout(F,u),$(S)}return E===void 0&&(E=setTimeout(F,u)),y}return U.cancel=J,U.flush=Q,U}function o(t,u,d){var p=!0,h=!0;if(typeof t!="function")throw new TypeError(k);return a(d)&&(p="leading"in d?!!d.leading:p,h="trailing"in d?!!d.trailing:h),n(t,u,{leading:p,maxWait:u,trailing:h})}function a(t){var u=typeof t;return!!t&&(u=="object"||u=="function")}function s(t){return!!t&&typeof t=="object"}function _(t){return typeof t=="symbol"||s(t)&&c.call(t)==b}function j(t){if(typeof t=="number")return t;if(_(t))return R;if(a(t)){var u=typeof t.valueOf=="function"?t.valueOf():t;t=a(u)?u+"":u}if(typeof t!="string")return t===0?t:+t;t=t.replace(x,"");var d=g.test(t);return d||O.test(t)?T(t.slice(2),d?2:8):A.test(t)?R:+t}w.exports=o}}]);

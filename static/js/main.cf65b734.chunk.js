(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{13:function(e,t,n){e.exports={wrapper:"InputText_wrapper__P-XLC",input:"InputText_input__2WQqQ",label:"InputText_label__9LF7I",animationBorder:"InputText_animationBorder__3c9Kr",errorInput:"InputText_errorInput__Abwxz"}},18:function(e,t,n){e.exports={item:"Test_item__2qUrE"}},19:function(e,t,n){e.exports={btn:"Button_btn__308sl",default:"Button_default__2L95g",red:"Button_red__2Ya8C",button:"Button_button__3hV6U"}},23:function(e,t,n){},25:function(e,t,n){e.exports={signIn:"Sign-in_signIn__3yMyS"}},26:function(e,t,n){e.exports={container:"CommonStyle_container__PUkOQ"}},34:function(e,t,n){},35:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),a=n(16),s=n.n(a),i=(n(34),n(35),n(8)),o=n(29),j=n(3),u=n(15),l=n(11),b=n(12),d=n(13),h=n.n(d),x=n(1),O=["type","onChange","onChangeText","onKeyPress","onEnter","setError","label","error","className"],p=function(e){e.type;var t=e.onChange,n=e.onChangeText,c=e.onKeyPress,r=e.onEnter,a=e.setError,s=e.label,i=e.error,o=(e.className,Object(b.a)(e,O)),j="".concat(i?h.a.errorInput:""," ").concat(h.a.input);return Object(x.jsxs)("div",{className:h.a.wrapper,children:[Object(x.jsx)("input",Object(l.a)({type:"text",onChange:function(e){t&&t(e),n&&n(e.currentTarget.value)},onKeyPress:function(e){c&&c(e),r&&"Enter"===e.key&&r()},onBlur:function(e){e.currentTarget.value&&r?(a(!1),r()):a(!0)},className:j,required:!0},o)),Object(x.jsx)("span",{className:h.a.animationBorder}),Object(x.jsx)("label",{className:h.a.label,children:s})]})},f=function(){var e=Object(c.useState)(""),t=Object(u.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)(!1),s=Object(u.a)(a,2),i=s[0],o=s[1];return Object(x.jsx)(p,{value:n,onChangeText:r,onEnter:function(){console.log(n)},setError:o,label:"E-mail",error:i})},v=n(18),g=n.n(v),m=n(23),_=n.n(m),C=["type","onChange","onChangeChecked","className","spanClassName","children"],N=function(e){e.type;var t=e.onChange,n=e.onChangeChecked,c=e.className,r=(e.spanClassName,e.children),a=Object(b.a)(e,C),s="".concat(_.a.checkbox," ").concat(c||"");return Object(x.jsxs)("label",{children:[Object(x.jsx)("input",Object(l.a)({type:"checkbox",onChange:function(e){n&&n(e.currentTarget.checked),t&&t(e)},className:s},a)),r&&Object(x.jsx)("span",{className:_.a.spanClassName,children:r})]})},y=function(){var e=Object(c.useState)(!1),t=Object(u.a)(e,2),n=t[0],r=t[1];return Object(x.jsx)(N,{checked:n,onChangeChecked:r,children:"children "})},I=n(19),k=n.n(I),T=["red","className"],B=function(e){var t=e.red,n=(e.className,Object(b.a)(e,T)),c="".concat(t?k.a.red:k.a.default," ").concat(k.a.btn);return Object(x.jsx)("button",Object(l.a)({className:c},n))},w=function(){return Object(x.jsx)(B,{onClick:function(){alert("button was clicked")},children:"delete "})},E=function(){return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)("div",{className:g.a.item,children:[Object(x.jsx)("span",{children:"Component Input - "}),Object(x.jsx)(f,{})]}),Object(x.jsxs)("div",{className:g.a.item,children:[Object(x.jsx)("span",{children:"Component Button - "}),Object(x.jsx)(w,{})]}),Object(x.jsxs)("div",{className:g.a.item,children:[Object(x.jsx)("span",{children:"Component Checkbox - "}),Object(x.jsx)(y,{})]})]})},P=n(25),S=n.n(P),F=function(){return Object(x.jsx)("div",{className:S.a.SignIn,children:"Sign in..."})},L=function(){return Object(x.jsx)("div",{children:"Registration..."})},K=function(){return Object(x.jsx)("div",{children:"Forgot..."})},U=function(){return Object(x.jsx)("div",{children:"Pasword assistance..."})},q=function(){return Object(x.jsx)("div",{children:"Profile..."})},A=n(26),Q=n.n(A),D="/sign-in",H="/registration",J="/forgot",M="/assistance",z="/profile",R="/test",V=function(){return Object(x.jsxs)("div",{className:Q.a.container,children:[Object(x.jsx)(j.b,{exact:!0,path:"/",render:function(){return Object(x.jsx)(j.a,{to:D})}}),Object(x.jsx)(j.b,{path:D,render:function(){return Object(x.jsx)(F,{})}}),Object(x.jsx)(j.b,{path:H,render:function(){return Object(x.jsx)(L,{})}}),Object(x.jsx)(j.b,{path:J,render:function(){return Object(x.jsx)(K,{})}}),Object(x.jsx)(j.b,{path:M,render:function(){return Object(x.jsx)(U,{})}}),Object(x.jsx)(j.b,{path:z,render:function(){return Object(x.jsx)(q,{})}}),Object(x.jsx)(j.b,{path:R,render:function(){return Object(x.jsx)(E,{})}})]})},W=n(9),X=n.n(W),Y=function(){return Object(x.jsxs)("div",{className:X.a.header,children:[Object(x.jsx)(i.b,{activeClassName:X.a.active,to:D,children:"sign-in"}),Object(x.jsx)(i.b,{activeClassName:X.a.active,to:H,children:"register"}),Object(x.jsx)(i.b,{activeClassName:X.a.active,to:J,children:"forgot"}),Object(x.jsx)(i.b,{activeClassName:X.a.active,to:M,children:"assistance"}),Object(x.jsx)(i.b,{activeClassName:X.a.active,to:z,children:"profile"}),Object(x.jsx)(i.b,{activeClassName:X.a.active,to:R,children:"test"})]})},G=function(){return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(Y,{}),Object(x.jsx)(V,{})]})},Z=n(20),$=n(28),ee={},te={},ne={},ce={},re={},ae=Object(Z.b)({signIn:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ee,t=arguments.length>1?arguments[1]:void 0;return t.type,e},register:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:te,t=arguments.length>1?arguments[1]:void 0;return t.type,e},forgot:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne,t=arguments.length>1?arguments[1]:void 0;return t.type,e},assistance:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ce,t=arguments.length>1?arguments[1]:void 0;return t.type,e},profile:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:re,t=arguments.length>1?arguments[1]:void 0;return t.type,e}}),se=Object(Z.c)(ae,Object(Z.a)($.a)),ie=se;window.store=se;var oe=function(){return Object(x.jsx)("div",{className:"App",children:Object(x.jsx)(i.a,{children:Object(x.jsx)(o.a,{store:ie,children:Object(x.jsx)(G,{})})})})},je=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,43)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),c(e),r(e),a(e),s(e)}))};s.a.render(Object(x.jsx)(r.a.StrictMode,{children:Object(x.jsx)(oe,{})}),document.getElementById("root")),je()},9:function(e,t,n){e.exports={header:"Header_header__oyhAD",active:"Header_active__2uUiP"}}},[[42,1,2]]]);
//# sourceMappingURL=main.cf65b734.chunk.js.map
(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{22:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var r=n(2),a=n.n(r),c=n(17),s=n.n(c),i=(n(22),n(6)),u=n(1),o=n.n(u),l=n(4),j=n(5),b=n(7),d=n.n(b),p="/api/blogs",f=null,h=function(e){f="bearer ".concat(e)},O=function(){var e=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get(p);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),v=function(){var e=Object(l.a)(o.a.mark((function e(t,n){var r,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h(n),r={headers:{Authorization:f}},e.next=4,d.a.post(p,t,r);case 4:return a=e.sent,e.abrupt("return",a.data);case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),x={setToken:h,getAll:O,create:v,update:function(){var e=Object(l.a)(o.a.mark((function e(t,n){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.put("".concat(p,"/").concat(t),n);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},g=n(0),m={paddingTop:10,paddingLeft:2,border:"solid",borderWidth:1,marginBottom:5},w=function(e){var t=e.blog,n=e.setUpdate,a=e.user,c=Object(r.useState)(!1),s=Object(j.a)(c,2),u=s[0],b=s[1],d=Object(r.useState)(!1),p=Object(j.a)(d,2),f=p[0],h=p[1],O={display:u?"none":""},v={display:u?"":"none"},w={display:f?"none":""},k=function(){var e=Object(l.a)(o.a.mark((function e(r){var a,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),a=t.likes+1,c=Object(i.a)(Object(i.a)({},t),{},{likes:a}),e.next=5,x.update(t.id,c);case 5:n(Math.floor(100*Math.random()));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),y=function(){var e=Object(l.a)(o.a.mark((function e(r){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),!window.confirm("remove blog ".concat(t.title,") by ").concat(t.author))){e.next=6;break}return x.setToken(a.token),e.next=5,x.remove(t.id,a.token);case 5:n(Math.floor(100*Math.random()));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsxs)("div",{style:m,className:"all",children:[Object(g.jsx)("div",{style:O,children:Object(g.jsxs)("div",{onClick:function(){b(!0),t.user.username!==a.username&&h(!0)},className:"titleauthor",children:[t.title," ",t.author]})}),Object(g.jsxs)("div",{style:v,className:"titleauthorlikedelete",children:[t.title," ",Object(g.jsx)("br",{}),t.url," ",Object(g.jsx)("br",{}),Object(g.jsxs)("div",{onClick:k,children:[t.likes," likes",Object(g.jsx)("button",{type:"submit",children:"like"})]}),Object(g.jsxs)("div",{onClick:y,style:w,children:["added by ",t.author,Object(g.jsx)("button",{type:"submit",children:"remove"})]})]})]})},k={login:function(){var e=Object(l.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},y=function(e){var t=Object(r.useState)(),n=Object(j.a)(t,2),a=n[0],c=n[1];return{initialValue:{type:e,value:a,onChange:function(e){c(e.target.value)}},reset:function(){c("")}}},S=function(e){e.message;return Object(g.jsx)("div",{children:"helloworld"})},C=function(){var e=Object(r.useState)([]),t=Object(j.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(""),s=Object(j.a)(c,2),u=s[0],b=s[1],d=Object(r.useState)(null),p=Object(j.a)(d,2),f=p[0],h=p[1],O=Object(r.useState)(""),v=Object(j.a)(O,2),m=v[0],C=v[1],T=Object(r.useState)(""),B=Object(j.a)(T,2),V=B[0],U=B[1],A=Object(r.useState)(null),D=Object(j.a)(A,2),I=D[0],M=D[1],N=y("text"),F=y("text"),J=y("text");Object(r.useEffect)((function(){x.getAll().then((function(e){a(e)}))}),[f]),Object(r.useEffect)((function(){var e=window.localStorage.getItem("loggedBlogUser");if(e){var t=JSON.parse(e);M(t),x.getAll().then((function(e){a(e)}))}}),[]);var L=function(){var e=Object(l.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,k.login({username:m,password:V});case 4:n=e.sent,window.localStorage.setItem("loggedBlogUser",JSON.stringify(n)),x.setToken(n.token),M(n),C(""),U(""),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(1),b("Wrong Credentials"),setTimeout((function(){b(null)}),5e3);case 16:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}(),E=function(){var e=Object(l.a)(o.a.mark((function e(t){var r,c,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,r={user:I,title:N.initialValue.value,author:F.initialValue.value,url:J.initialValue.value},c=I.token,e.next=6,x.create(r,c);case 6:s=e.sent,a(n.concat(s)),N.reset(),F.reset(),J.reset(),b("a new blog ".concat(r.title," by ").concat(r.author," added")),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(1),b("oops something went wrong"),setTimeout((function(){b(null)}),5e3);case 18:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsxs)("div",{children:[Object(g.jsx)(S,{message:u}),null===I?Object(g.jsxs)("div",{children:[Object(g.jsx)("h2",{children:"Login To Application"}),Object(g.jsxs)("form",{onSubmit:L,children:[Object(g.jsxs)("div",{children:["username",Object(g.jsx)("input",{type:"text",value:m,name:"Username",onChange:function(e){var t=e.target;return C(t.value)}})]}),Object(g.jsxs)("div",{children:["password",Object(g.jsx)("input",{type:"password",value:V,name:"Password",onChange:function(e){var t=e.target;return U(t.value)}})]}),Object(g.jsx)("button",{type:"submit",children:"login"})]})]}):Object(g.jsxs)("div",{children:[Object(g.jsx)("h2",{children:"Blogs"}),Object(g.jsxs)("p",{children:[I.name," has logged in"]}),Object(g.jsx)("button",{onClick:function(){try{window.localStorage.removeItem("loggedBlogUser")}catch(e){b("user has been logged out"),setTimeout((function(){b(null)}),5e3)}},children:"logout"}),Object(g.jsx)("div",{children:n.map((function(e){return Object(g.jsx)(w,{blog:e,user:I,setUpdate:h},e.id)}))}),Object(g.jsx)("br",{}),Object(g.jsxs)("form",{onSubmit:E,children:[Object(g.jsx)("h2",{children:"create new blog"}),Object(g.jsxs)("div",{children:[Object(g.jsxs)("div",{children:["title:",Object(g.jsx)("input",Object(i.a)({},N.initialValue))]}),"author:",Object(g.jsx)("input",Object(i.a)({},F.initialValue)),Object(g.jsxs)("div",{children:["url:",Object(g.jsx)("input",Object(i.a)({},J.initialValue))]})]}),Object(g.jsx)("button",{type:"submit",children:"create"})]})]})]})},T=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,44)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))};s.a.render(Object(g.jsx)(a.a.StrictMode,{children:Object(g.jsx)(C,{})}),document.getElementById("root")),T()}},[[43,1,2]]]);
//# sourceMappingURL=main.fa8eec82.chunk.js.map
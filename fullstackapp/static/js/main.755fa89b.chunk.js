(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{ 20:function(e,n,t){},40:function(e,n,t){'use strict';t.r(n);var r=t(1),c=t.n(r),a=t(15),o=t.n(a),i=(t(20),t(3)),u=t(4),s=t(5),d=t.n(s),l='http://localhost:3002/persons',b=function(){return d.a.get(l).then((function(e){return e.data}))},f=function(e){return d.a.post(l,e).then((function(e){return e.data}))},j=function(e,n){return d.a.put(''.concat(l,'/').concat(e),n).then((function(e){return e.data}))},h=function(e){return d.a.delete(''.concat(l,'/').concat(e)).then((function(e){return e.data}))},m=t(0),g=function(e){var n=e.filter,t=e.onfilterChange;return Object(m.jsxs)('div',{ children:['filter show with ',Object(m.jsx)('input',{ value:n,onChange:t })] })},O=function(e){var n=e.newNumber,t=e.newName,r=e.handleNameChange,c=e.handleNumberChange,a=e.onAddPerson;return Object(m.jsxs)('form',{ onSubmit:a,children:[Object(m.jsxs)('div',{ children:[Object(m.jsx)('h2',{ children:'add a new' }),'name:',Object(m.jsx)('input',{ value:t,onChange:r }),Object(m.jsx)('br',{}),'number:',Object(m.jsx)('input',{ value:n,onChange:c })] }),Object(m.jsx)('button',{ type:'submit',children:'add' })] })},p=function(e){var n=e.persons;e.filter&&(n=e.persons.filter((function(n){return n.name.toLowerCase().includes(e.filter.toLowerCase())})));var t=n.map((function(n){return Object(m.jsxs)('li',{ children:[n.name,' ',n.number,' ',Object(m.jsx)('button',{ onClick:function(){return e.onDelete(n.id)},children:'deleted' })] },n.name)}));return Object(m.jsxs)('div',{ children:[Object(m.jsx)('h2',{ children:'Numbers' }),Object(m.jsx)('ul',{ children:t })] })},x=function(e){var n=e.messageType;return null===n?null:'success'===n.category?Object(m.jsx)('div',{ style:{ color:'green',borderRadius:'5px',fontSize:'20px',border:'2px solid green',background:'#ccc',padding:'10px',marginBottom:'10px' },children:n.message }):'error'===n.category?Object(m.jsx)('div',{ style:{ color:'red',borderRadius:'5px',border:'2px solid red',fontSize:'20px',background:'#ccc',padding:'10px',marginBottom:'10px' },children:n.message }):Object(m.jsx)('div',{})},v=function(){var e=Object(r.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],a=Object(r.useState)(''),o=Object(u.a)(a,2),s=o[0],d=o[1],l=Object(r.useState)(''),v=Object(u.a)(l,2),w=v[0],C=v[1],y=Object(r.useState)(''),S=Object(u.a)(y,2),N=S[0],k=S[1],T=Object(r.useState)({ message:'',category:'' }),D=Object(u.a)(T,2),P=D[0],A=D[1],B=function(e){var n=t.find((function(n){return n.id===e}));window.confirm('Delete '.concat(n.name,' ?'))&&h(e).then((function(n){c(t.filter((function(n){return n.id!==e})))}))};return Object(r.useEffect)((function(){b().then((function(e){c(e)}))}),[]),Object(m.jsxs)('div',{ children:[Object(m.jsx)('h1',{ children:'Phonebook' }),Object(m.jsx)(x,{ messageType:P }),Object(m.jsx)(g,{ onfilterChange:function(e){return k(e.target.value)},filter:N,persons:t,onDelete:B }),Object(m.jsx)(O,{ newNumber:w,newName:s,handleNameChange:function(e){return d(e.target.value)},handleNumberChange:function(e){return C(e.target.value)},onAddPerson:function(e){if(e.preventDefault(),t.find((function(e){return e.name===s}))){if(window.confirm(''.concat(s,' is already added to phonebook, replace the old number with the new one'))){var n=t.find((function(e){return e.name===s})).id,r={ name:s,number:w };j(n,r).then((function(e){c(t.map((function(t){return t.id!==n?t:e})));var r={ message:'Added '.concat(e.name),category:'success' };A(r),setTimeout((function(){A(Object(i.a)(Object(i.a)({},P),{},{ message:null }))}),2e3),d(''),C('')})).catch((function(e){var n={ message:'Information of '.concat(r.name,' has already been removed from server'),category:'error' };A(n),setTimeout((function(){A(Object(i.a)(Object(i.a)({},P),{},{ message:null }))}),2e3)}))}}else f({ name:s,number:w }).then((function(e){c(t.concat(e));var n={ message:'Added '.concat(s),category:'success' };A(n),setTimeout((function(){A(Object(i.a)(Object(i.a)({},P),{},{ message:null }))}),2e3),d(''),C('')})).catch((function(e){return console.log(e)}))} }),Object(m.jsx)(p,{ persons:t,filter:N,onDelete:B })] })},w=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,41)).then((function(n){var t=n.getCLS,r=n.getFID,c=n.getFCP,a=n.getLCP,o=n.getTTFB;t(e),r(e),c(e),a(e),o(e)}))};o.a.render(Object(m.jsx)(c.a.StrictMode,{ children:Object(m.jsx)(v,{}) }),document.getElementById('root')),w()} },[[40,1,2]]])
//# sourceMappingURL=main.755fa89b.chunk.js.map
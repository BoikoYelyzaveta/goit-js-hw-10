import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as o}from"./assets/vendor-A92OCY9B.js";document.querySelector(".form").addEventListener("submit",s=>{s.preventDefault();const i=s.currentTarget,t=Number(i.elements.delay.value),r=i.elements.state.value;new Promise((e,m)=>{setTimeout(()=>{r==="fulfilled"?e(t):m(t)},t)}).then(e=>{o.success({title:"✅ Success",message:`Fulfilled promise in ${e} ms`,position:"topRight"})}).catch(e=>{o.error({title:"❌ Error",message:`Rejected promise in ${e} ms`,position:"topRight"})})});
//# sourceMappingURL=2-snackbar.js.map

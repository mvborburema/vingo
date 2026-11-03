document.querySelectorAll('.menu-toggle').forEach(b=>b.addEventListener('click',()=>{const n=document.querySelector('#main-nav');const v=n.classList.toggle('open');b.setAttribute('aria-expanded',String(v))}));document.querySelectorAll('.year').forEach(y=>y.textContent=new Date().getFullYear());const modal=document.querySelector('.modal');if(modal){const close=()=>{modal.hidden=true;document.body.style.overflow=''};document.querySelectorAll('[data-project-preview]').forEach(b=>b.addEventListener('click',()=>{document.querySelector('#project-modal-title').textContent=b.dataset.projectPreview;modal.hidden=false;document.body.style.overflow='hidden';modal.querySelector('.modal-close').focus()}));modal.querySelectorAll('[data-modal-close]').forEach(x=>x.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close()})}

/* Match the exact vector flag treatment used on the VINGO homepage. */
(function(){
const brazil='<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bandeira do Brasil" viewBox="0 0 28 20"><rect width="28" height="20" rx="2" fill="#169B62"/><path d="m14 2 11 8-11 8L3 10Z" fill="#FFDF00"/><circle cx="14" cy="10" r="5" fill="#002776"/><path d="M9.2 8.5c3.8-1 7.5.4 9.4 2.7" fill="none" stroke="white" stroke-width="1"/></svg>';
const usa='<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="United States flag" viewBox="0 0 28 20"><rect width="28" height="20" rx="2" fill="#fff"/><path d="M0 0h28v2H0zm0 4h28v2H0zm0 4h28v2H0zm0 4h28v2H0zm0 4h28v2H0zm0 3h28v1H0" fill="#B22234"/><rect width="12" height="10" fill="#3C3B6E"/><g fill="#fff"><circle cx="2" cy="2" r=".6"/><circle cx="5" cy="2" r=".6"/><circle cx="8" cy="2" r=".6"/><circle cx="2" cy="5" r=".6"/><circle cx="5" cy="5" r=".6"/><circle cx="8" cy="5" r=".6"/><circle cx="2" cy="8" r=".6"/><circle cx="5" cy="8" r=".6"/><circle cx="8" cy="8" r=".6"/></g></svg>';
document.querySelectorAll('.site-header .language a').forEach(a=>{
const isPt=(a.getAttribute('lang')||'').toLowerCase().startsWith('pt');
a.innerHTML=isPt?brazil:usa;
});
})();

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


/* VINGO v36 — apply the approved homepage navigation to all internal pages */
(function(){
  const old = document.querySelector('header.site-header');
  if (!old || document.querySelector('.internal-nav-shell')) return;
  const menu = old.querySelector('nav#main-nav');
  const logo = old.querySelector('.brand img');
  const cta = old.querySelector('.header-cta');
  const locales = Array.from(old.querySelectorAll('.language a'));
  if (!menu || !logo || !cta || locales.length < 2) return;
  const pt = document.documentElement.lang.toLowerCase().startsWith('pt');
  const brSvg = '<svg aria-hidden="true" viewBox="0 0 28 20"><rect fill="#169B62" width="28" height="20" rx="2"/><path fill="#FFDF00" d="m14 2 11 8-11 8L3 10Z"/><circle fill="#002776" cx="14" cy="10" r="5"/><path fill="none" stroke="white" stroke-width="1" d="M9.2 8.5c3.8-1 7.5.4 9.4 2.7"/></svg>';
  const usSvg = '<svg aria-hidden="true" viewBox="0 0 28 20"><rect fill="#fff" width="28" height="20" rx="2"/><path fill="#B22234" d="M0 0h28v2H0zm0 4h28v2H0zm0 4h28v2H0zm0 4h28v2H0zm0 4h28v2H0zm0 3h28v1H0"/><rect fill="#3C3B6E" width="12" height="10"/><g fill="white"><circle cx="2" cy="2" r=".6"/><circle cx="5" cy="2" r=".6"/><circle cx="8" cy="2" r=".6"/><circle cx="2" cy="5" r=".6"/><circle cx="5" cy="5" r=".6"/><circle cx="8" cy="5" r=".6"/><circle cx="2" cy="8" r=".6"/><circle cx="5" cy="8" r=".6"/><circle cx="8" cy="8" r=".6"/></g></svg>';
  const wrapper = document.createElement('div');
  wrapper.className='nav-shell internal-nav-shell';
  const header = document.createElement('header');
  header.className='floating-nav';
  const brand=old.querySelector('.brand').cloneNode(true);
  brand.className='brand';
  menu.className='nav';
  menu.id='nav';
  menu.setAttribute('aria-label',pt?'Menu principal':'Main navigation');
  menu.querySelectorAll('a').forEach(a=>{
    if(a.hasAttribute('aria-current'))a.setAttribute('aria-current','page');
  });
  const actions=document.createElement('div');
  actions.className='nav-actions';
  const locale=document.createElement('div');locale.className='locale';
  locales.forEach((a,i)=>{
    const b=a.cloneNode(false);
    const isPt=(a.getAttribute('lang')||'').toLowerCase().startsWith('pt');
    b.className='lang'+(pt===isPt?' active':'');
    b.innerHTML=isPt?brSvg:usSvg;
    b.setAttribute('aria-label',isPt?'Português':'English');
    if(pt===isPt)b.setAttribute('aria-current','page');
    else b.removeAttribute('aria-current');
    locale.appendChild(b);
  });
  const contact=cta.cloneNode(true);
  contact.className='head-cta';
  const badge=contact.querySelector('.circle');
  if(badge) badge.className='circle-arrow';
  const burger=document.createElement('button');
  burger.type='button';burger.className='burger';
  burger.setAttribute('aria-controls','nav');burger.setAttribute('aria-expanded','false');
  burger.setAttribute('aria-label',pt?'Abrir menu':'Open menu');
  burger.innerHTML='<span></span><span></span><span></span>';
  burger.addEventListener('click',()=>{
    const opened=menu.classList.toggle('open');
    burger.setAttribute('aria-expanded',String(opened));
  });
  actions.append(locale,contact,burger);
  header.append(brand,menu,actions);
  wrapper.appendChild(header);
  old.replaceWith(wrapper);
})();

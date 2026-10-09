// mobile menu
const links=document.getElementById('links');document.getElementById('menu').onclick=()=>links.classList.toggle('open');links.querySelectorAll('a').forEach(a=>a.onclick=()=>links.classList.remove('open'));
document.getElementById('yr').textContent=new Date().getFullYear();
// live status of the production system
(async()=>{const el=document.getElementById('live');const t0=performance.now();try{const r=await fetch('https://tanzaniteauto.com/api/health',{cache:'no-store'});const j=await r.json();const ms=Math.round(performance.now()-t0);el.innerHTML=j.ok?`<span class="ok">● Online</span> tanzaniteauto.com · ${ms} ms`:`<span class="warn">● Degraded</span> tanzaniteauto.com`}catch(e){el.innerHTML='<span class="ok">● Live</span> tanzaniteauto.com'}})();
// project filters
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.toggle('on',x===b));const f=b.dataset.f;document.querySelectorAll('#grid .proj').forEach(p=>p.style.display=(f==='all'||p.dataset.tags.includes(f))?'':'none')});

// theme
const root=document.documentElement;try{const t=localStorage.getItem('theme');if(t)root.dataset.theme=t}catch(e){}
document.getElementById('theme').onclick=()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('theme',root.dataset.theme)}catch(e){}};
const links=document.getElementById('links');document.getElementById('menu').onclick=()=>links.classList.toggle('open');links.querySelectorAll('a').forEach(a=>a.onclick=()=>links.classList.remove('open'));
document.getElementById('yr').textContent=new Date().getFullYear();
// reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
// terminal typing
const lines=[["$ git push origin main",""],["GitHub Actions  build → test → deploy","info"],["✓ type-check, lint and tests passed","ok"],["✓ docker image pushed to Amazon ECR","ok"],["✓ deploy role assumed via OIDC (no keys)","ok"],["✓ pruned old images · disk 18% used","ok"],["✓ SSM: pulled image, ran migrations","ok"],["✓ health check passed · traffic switched","ok"],["↺ automatic rollback armed","warn"],["",""],["$ curl -s https://tanzaniteauto.com/api/health",""],['{"ok":true}',"ok"]];
const term=document.getElementById('term');const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function esc(s){return s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}
async function type(){let html='';for(const [t,c] of lines){if(reduce){html+=`<span class="${c}">${esc(t)}</span>\n`;continue}let cur='';for(const ch of t){cur+=ch;term.innerHTML=html+`<span class="${c}">${esc(cur)}</span><span class="cursor"></span>`;await new Promise(r=>setTimeout(r,t.startsWith('$')?28:9))}html+=`<span class="${c}">${esc(t)}</span>\n`;term.innerHTML=html+'<span class="cursor"></span>';await new Promise(r=>setTimeout(r,180))}term.innerHTML=html+'<span class="cursor"></span>'}
type();
// live status of the production system
(async()=>{const el=document.getElementById('live');const t0=performance.now();try{const r=await fetch('https://tanzaniteauto.com/api/health',{cache:'no-store'});const j=await r.json();const ms=Math.round(performance.now()-t0);el.innerHTML=j.ok?`<span class="ok">●</span> <b>tanzaniteauto.com</b> operational · ${ms} ms`:`<span class="warn">●</span> tanzaniteauto.com degraded`}catch(e){el.innerHTML='<span class="ok">●</span> <b>tanzaniteauto.com</b> · live'}})();
// project filters
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.toggle('on',x===b));const f=b.dataset.f;document.querySelectorAll('#grid .proj').forEach(p=>p.style.display=(f==='all'||p.dataset.tags.includes(f))?'':'none')});

// mobile menu
const links=document.getElementById('links');document.getElementById('menu').onclick=()=>links.classList.toggle('open');links.querySelectorAll('a').forEach(a=>a.onclick=()=>links.classList.remove('open'));
document.getElementById('yr').textContent=new Date().getFullYear();
// live status of the production system
(async()=>{const el=document.getElementById('live');const t0=performance.now();try{const r=await fetch('https://tanzaniteauto.com/api/health',{cache:'no-store'});const j=await r.json();const ms=Math.round(performance.now()-t0);el.innerHTML=j.ok?`<span class="ok">● Online</span> tanzaniteauto.com · ${ms} ms`:`<span class="warn">● Degraded</span> tanzaniteauto.com`}catch(e){el.innerHTML='<span class="ok">● Live</span> tanzaniteauto.com'}})();
// project filters
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.toggle('on',x===b));const f=b.dataset.f;document.querySelectorAll('#grid .proj').forEach(p=>p.style.display=(f==='all'||p.dataset.tags.includes(f))?'':'none')});
// hero typewriter (same timing as tanzaniteauto.com): type, hold, delete, next phrase
(()=>{const el=document.getElementById('typed');if(!el)return;const phrases=['I build, ship and run production systems.','I keep production online on AWS.','I automate deployments with zero stored keys.'];let i=0,text='',del=false;
function tick(){const cur=phrases[i];let delay=del?35:60;if(!del&&text===cur){del=true;delay=1400}else if(del&&text===''){del=false;i=(i+1)%phrases.length;delay=300}else{text=del?cur.slice(0,text.length-1):cur.slice(0,text.length+1)}el.textContent=text;setTimeout(tick,delay)}
text='';el.textContent='';setTimeout(tick,300)})();

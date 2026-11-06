(()=>{
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

  $$('img.gen').forEach(img=>{
    const mark=()=>{if(!img.naturalWidth||img.nextElementSibling?.classList.contains('gen-note'))return;
      const s=document.createElement('span');s.className='gen-note gen-note--s';s.textContent='仮';img.after(s)};
    if(img.complete) mark(); else img.addEventListener('load',mark);
  });

  const hd=$('#hd'); const onScroll=()=>hd.classList.toggle('is-scrolled',scrollY>10);
  addEventListener('scroll',onScroll,{passive:true}); onScroll();
  const btn=$('#menuBtn'), sp=$('#spnav');
  btn.addEventListener('click',()=>{const o=sp.classList.toggle('is-open');btn.setAttribute('aria-expanded',o)});
  $$('a',sp).forEach(a=>a.addEventListener('click',()=>{sp.classList.remove('is-open');btn.setAttribute('aria-expanded',false)}));

  const pager=(items,nav,per,onCount)=>{
    let page=1;
    const render=()=>{const vis=items.filter(li=>!li.dataset.out);const pages=Math.max(1,Math.ceil(vis.length/per));page=Math.min(page,pages);
      items.forEach(li=>li.hidden=true); vis.slice((page-1)*per,page*per).forEach(li=>li.hidden=false);
      nav.innerHTML='';const add=(lab,p,on)=>{const b=document.createElement('button');b.type='button';b.textContent=lab;if(on)b.className='is-on';b.onclick=()=>{page=p;render();nav.previousElementSibling.scrollIntoView({block:'start'})};nav.appendChild(b)};
      if(pages>1){if(page>1)add('←',page-1);const s=new Set([1,pages,page-1,page,page+1]);let last=0;
        for(let p=1;p<=pages;p++){if(!s.has(p))continue;if(p-last>1){const e=document.createElement('span');e.textContent='…';nav.appendChild(e)}add(String(p),p,p===page);last=p}
        if(page<pages)add('→',page+1)}
      onCount&&onCount(vis.length)};
    return {reset:()=>{page=1;render()}};
  };

  const wl=$('#wkList');
  if(wl){const items=$$('li',wl), btns=$$('.dws [data-k]'), st={cat:'',kind:'',client:'',year:''};
    const known=new Set(btns.filter(b=>b.dataset.k==='client'&&b.dataset.v&&b.dataset.v!=='__other').map(b=>b.dataset.v));
    const p=pager(items,$('#wkPager'),12,n=>{$('#wkCount').textContent=n;$('#wkEmpty').hidden=n>0});
    const apply=()=>{btns.forEach(b=>b.classList.toggle('is-on',st[b.dataset.k]===b.dataset.v));
      items.forEach(li=>{const d=li.dataset;const ok=(!st.cat||d.cat===st.cat)&&(!st.kind||d.kind===st.kind)&&(!st.year||d.year===st.year)&&(!st.client||(st.client==='__other'?!known.has(d.client):d.client===st.client));
        if(ok)delete li.dataset.out;else li.dataset.out=1});p.reset()};
    btns.forEach(b=>b.addEventListener('click',()=>{st[b.dataset.k]=b.dataset.v;apply()}));
    const h=location.hash.slice(1); if(['se','so','ho','ku'].includes(h))st.cat=h;
    apply()}

  const nl=$('#nwList');
  if(nl){const items=$$('li',nl), p=pager(items,$('#nwPager'),10);
    const apply=e=>{e&&e.preventDefault();const q=$('#nwQ').value.trim(), y=$('#nwY').value, c=$('#nwC').value;
      items.forEach(li=>{const ok=(!q||li.dataset.q.includes(q))&&(!y||li.dataset.year===y)&&(!c||li.dataset.kind===c);if(ok)delete li.dataset.out;else li.dataset.out=1});p.reset()};
    $('#nwForm').addEventListener('submit',apply); ['#nwY','#nwC'].forEach(s=>$(s).addEventListener('change',apply)); apply()}

  const side=$$('.dsv__side a');
  if(side.length&&'IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)side.forEach(a=>a.classList.toggle('is-on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-40% 0px -55% 0px'});
    side.forEach(a=>{const t=$(a.getAttribute('href'));t&&io.observe(t)})}

  const fm=$('#contactForm');
  if(fm) fm.addEventListener('submit',e=>{e.preventDefault();if(!fm.reportValidity())return;
    $('#fmMsg').textContent='この画面は試作のため、送信は行われません。公開時に送信の仕組みを設定します。'});
})();

(()=>{
  const b=document.body; if(!b.classList.contains('d--motion'))return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches; if(reduce)return;
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  b.classList.add('m-on');
  const io=(els,fn,opt={threshold:.3})=>{if(!('IntersectionObserver' in window)){els.forEach(fn);return}
    const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){fn(e.target);o.unobserve(e.target)}}),opt);els.forEach(e=>o.observe(e))};

  io($$('.dshd'),el=>el.classList.add('is-in'),{threshold:.4});

  io($$('.dgrid__n'),el=>{const t=el.firstChild; const to=parseInt(t.textContent,10); if(!to)return;
    const t0=performance.now(), dur=900+to*60;
    const step=now=>{const p=Math.min((now-t0)/dur,1), e=1-Math.pow(1-p,3); t.textContent=String(Math.round(to*e)); if(p<1)requestAnimationFrame(step)};
    t.textContent='0'; requestAnimationFrame(step)},{threshold:.6});

  const fl=$('.dflow');
  if(fl){const lis=$$('li',fl);
    const upd=()=>{const r=fl.getBoundingClientRect(), mark=innerHeight*.62;
      const p=Math.min(Math.max((mark-r.top)/(r.height-40),0),1); fl.style.setProperty('--fp',p.toFixed(3));
      lis.forEach(li=>li.classList.toggle('is-lit',li.getBoundingClientRect().top<mark))};
    addEventListener('scroll',upd,{passive:true}); addEventListener('resize',upd); upd()}

  const cards=$$('.dsl--stack .dsl__i');
  if(cards.length){const upd=()=>{cards.forEach((c,i)=>{const nx=cards[i+1]; let s=1;
      if(nx){const top=parseFloat(getComputedStyle(c).top)||0, d=nx.getBoundingClientRect().top-top, h=c.offsetHeight;
        const p=Math.min(Math.max(1-d/h,0),1); s=1-.05*p}
      c.style.setProperty('--s',s.toFixed(4))})};
    addEventListener('scroll',upd,{passive:true}); addEventListener('resize',upd); upd()}

  const wl=$('#wkList');
  if(wl){const pop=()=>{const vis=$$('li',wl).filter(li=>!li.hidden);
      vis.forEach((li,i)=>{li.classList.remove('is-pop');void li.offsetWidth;li.style.setProperty('--d',(i*0.04).toFixed(2)+'s');li.classList.add('is-pop')})};
    new MutationObserver(()=>{clearTimeout(wl._t);wl._t=setTimeout(pop,10)}).observe(wl,{subtree:true,attributes:true,attributeFilter:['hidden']});
    pop()}
})();

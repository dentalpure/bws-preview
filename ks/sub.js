(()=>{
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  document.documentElement.classList.add('js');

  $$('img.gen').forEach(img=>{
    const mark=()=>{if(!img.naturalWidth||img.nextElementSibling?.classList.contains('gen-note'))return;
      const small=!!img.closest('.svc__thumb'); const s=document.createElement('span');
      s.className='gen-note'+(small?' gen-note--s':''); s.textContent=small?'仮':'仮の画像（AI生成）'; img.after(s)};
    if(img.complete) mark(); else img.addEventListener('load',mark);
  });

  const hd=$('#hd'); const onScroll=()=>hd.classList.toggle('is-scrolled',scrollY>10);
  addEventListener('scroll',onScroll,{passive:true}); onScroll();

  const btn=$('#menuBtn'), sp=$('#spnav');
  btn.addEventListener('click',()=>{const o=sp.classList.toggle('is-open');btn.setAttribute('aria-expanded',o)});
  $$('a',sp).forEach(a=>a.addEventListener('click',()=>{sp.classList.remove('is-open');btn.setAttribute('aria-expanded',false)}));

  $$('[data-tabs]').forEach(box=>{
    const tabs=$$('[data-tab]',box), panels=$$('[data-panel]',box);
    const show=id=>{tabs.forEach(t=>{const on=t.dataset.tab===id;t.classList.toggle('is-on',on);t.setAttribute('aria-selected',on)});
      panels.forEach(p=>p.classList.toggle('is-on',p.dataset.panel===id))};
    tabs.forEach(t=>t.addEventListener('click',()=>{show(t.dataset.tab);history.replaceState(null,'','#'+t.dataset.tab)}));
    const pick=()=>{const h=location.hash.slice(1); if(tabs.some(t=>t.dataset.tab===h)){show(h);box.scrollIntoView();return true}return false};
    if(!pick()) show(tabs[0].dataset.tab);
    addEventListener('hashchange',pick);
  });

  $$('[data-prime-box]').forEach(box=>{
    const t=$('[data-prime-toggle]',box);
    t.addEventListener('change',()=>{box.classList.toggle('is-prime',t.checked);
      $$('[data-all]',box).forEach(e=>e.textContent=t.checked?e.dataset.prime:e.dataset.all)});
  });

  const grow=$$('.yh,.cb');
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}}),{threshold:.25});
    grow.forEach(g=>io.observe(g));
    $$('[data-tab]').forEach(b=>b.addEventListener('click',()=>grow.forEach(g=>{if(g.offsetParent)g.classList.add('is-in')})));
  } else grow.forEach(g=>g.classList.add('is-in'));

  $$('[data-filter]').forEach(box=>{
    const btns=$$('button',box);
    btns.forEach(b=>b.addEventListener('click',()=>{
      btns.forEach(x=>x.classList.toggle('is-on',x===b));
      $$('.nl li').forEach(li=>li.hidden=!(b.dataset.f==='all'||li.dataset.kind===b.dataset.f));
      $$('.ny').forEach(y=>y.hidden=!$$('li',y).some(li=>!li.hidden));
    }));
  });

  const fm=$('#contactForm');
  if(fm) fm.addEventListener('submit',e=>{e.preventDefault();
    if(!fm.reportValidity()) return;
    $('#fmMsg').textContent='この画面は試作のため、送信は行われません。公開時に送信の仕組みを設定します。';
  });
})();

(()=>{
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;


  $$('img.gen').forEach(img=>{
    const mark=()=>{if(!img.naturalWidth||img.nextElementSibling?.classList.contains('gen-note'))return;
      const small=!!img.closest('.svc__thumb'); const s=document.createElement('span');
      s.className='gen-note'+(small?' gen-note--s':''); s.textContent=small?'仮':'仮の画像（AI生成）'; img.after(s)};
    if(img.complete) mark(); else img.addEventListener('load',mark);
  });


  $$('[data-gen-bg]').forEach(p=>{
    const base='../assets/gen/'+p.dataset.genBg; const tryLoad=(exts)=>{if(!exts.length)return;
      const url=base+exts[0], im=new Image();
      im.onload=()=>{p.style.setProperty('--bg',`url(${url})`);const s=document.createElement('span');s.className='gen-note gen-note--bg';s.textContent='仮の画像（AI生成）';p.appendChild(s)};
      im.onerror=()=>tryLoad(exts.slice(1)); im.src=url};
    tryLoad(['.jpg','.png']);
  });

  const hd=$('#hd'); const onScroll=()=>hd.classList.toggle('is-scrolled',scrollY>10);
  addEventListener('scroll',onScroll,{passive:true}); onScroll();

  const btn=$('#menuBtn'), sp=$('#spnav');
  btn.addEventListener('click',()=>{const o=sp.classList.toggle('is-open');btn.setAttribute('aria-expanded',o)});
  $$('a',sp).forEach(a=>a.addEventListener('click',()=>{sp.classList.remove('is-open');btn.setAttribute('aria-expanded',false)}));

  const items=$$('#mvList .mv__item'), thums=$$('#mvThum li'), bar=$('#mvBar');
  if(bar){ // 旧2カラムMVがあるときだけ（2026-10-27 全幅ヒーローに置換後は何もしない）
  let cur=0, t0=performance.now(); const DUR=6000;
  const go=i=>{cur=i;items.forEach((e,k)=>e.classList.toggle('is-active',k===i));thums.forEach((e,k)=>e.classList.toggle('is-active',k===i));t0=performance.now()};
  items.forEach((e,i)=>e.addEventListener('click',ev=>{if(ev.target.closest('a'))return;go(i)}));
  const tick=now=>{const p=Math.min((now-t0)/DUR,1);bar.style.width=(p*100)+'%';if(p>=1&&!reduce)go((cur+1)%items.length);requestAnimationFrame(tick)};
  requestAnimationFrame(tick);
  }

  const list=$('#puList'), cards=$$('.pu',list), dots=$('#puDots');
  const pages=()=>{const vw=list.parentElement.clientWidth, w=cards[0].getBoundingClientRect().width+20;return Math.max(1,cards.length-Math.floor(vw/w)+1)};
  let pg=0;
  const renderDots=()=>{dots.innerHTML='';for(let i=0;i<pages();i++){const b=document.createElement('button');b.setAttribute('aria-label',`${i+1}枚目へ`);b.className=i===pg?'is-on':'';b.onclick=()=>slide(i);dots.appendChild(b)}};
  const slide=i=>{pg=Math.min(i,pages()-1);const w=cards[0].getBoundingClientRect().width+20;list.style.transform=`translateX(${-pg*w}px)`;renderDots()};
  renderDots(); addEventListener('resize',()=>slide(0));
  if(!reduce) setInterval(()=>slide((pg+1)%pages()),5000);

  const pj=$$('#pj .pj__item'), pjd=$('#pjDots'); let pc=0;
  const open=i=>{pc=i;pj.forEach((e,k)=>e.classList.toggle('is-active',k===i));$$('button',pjd).forEach((b,k)=>b.classList.toggle('is-on',k===i))};
  pj.forEach((e,i)=>{const b=document.createElement('button');b.setAttribute('aria-label',`実績${i+1}`);b.onclick=()=>open(i);pjd.appendChild(b);
    e.addEventListener('click',()=>open(i)); e.addEventListener('mouseenter',()=>{if(matchMedia('(min-width:821px)').matches)open(i)})});
  open(0); if(!reduce) setInterval(()=>{if(!$('#pj').matches(':hover'))open((pc+1)%pj.length)},5500);

  const set=$('.set'), rec=$('.set__panel--recruit');
  if(set&&rec){ // 旧 Company/Recruit 固定2面があるときだけ（2026-10-27 Recruit パネルに置換後は無い）
  const wipe=()=>{const r=set.getBoundingClientRect(), span=set.offsetHeight-innerHeight;const p=Math.min(Math.max((-r.top-span*.25)/(span*.5),0),1);rec.style.clipPath=`inset(${(1-p)*100}% 0 0 0)`};
  addEventListener('scroll',wipe,{passive:true}); addEventListener('resize',wipe); wipe();
  }
})();

(()=>{
  const sec=document.querySelector('.biz2'), cards=[...document.querySelectorAll('#bzStack .bz')];
  if(!sec||!cards.length) return;
  const nav=[...document.querySelectorAll('#bzNav a')];
  const light=i=>nav.forEach((a,k)=>a.classList.toggle('is-on',k===i));
  const stack=document.getElementById('bzStack');
  const slideW=()=>cards[0].getBoundingClientRect().width+12;   // 携帯：1枚の幅＋gap
  nav.forEach(a=>a.addEventListener('click',ev=>{ev.preventDefault();const i=+a.dataset.i;
    const span=sec.offsetHeight-innerHeight; scrollTo({top:sec.offsetTop+span*(i/(cards.length-1))+1,behavior:'smooth'})}));
  const upd=()=>{
    if(matchMedia('(max-width:820px)').matches){
      const r=sec.getBoundingClientRect(); const span=sec.offsetHeight-innerHeight;
      const i=Math.round(Math.min(Math.max(-r.top/span,0),1)*(cards.length-1));
      cards.forEach((c,k)=>c.classList.toggle('is-cur',k===i)); light(i);
      const on=nav[i], ul=document.getElementById('bzNav');
      if(on&&ul){const d=on.getBoundingClientRect(), u=ul.getBoundingClientRect();
        if(d.left<u.left+16||d.right>u.right-16) ul.scrollTo({left:ul.scrollLeft+d.left-u.left-24,behavior:'smooth'})}
      return}
    const r=sec.getBoundingClientRect(); const span=sec.offsetHeight-innerHeight;
    const p=Math.min(Math.max(-r.top/span,0),1)*(cards.length-1);   // 0〜N-1 の進み
    light(Math.round(p));
    cards.forEach((c,i)=>{
      const d=i-p;                                   // 正：まだ下にある / 負：すでに上に積まれた
      const y=d>0?Math.min(d,1)*110:0;               // 下から入ってくる
      const s=d<0?Math.max(1+d*0.06,0.82):1;         // 積まれたカードは少し縮む
      c.style.setProperty('--y',y); c.querySelector('.bz__in').style.setProperty('--s',s);
      c.style.zIndex=String(10+i);
    });
  };
  addEventListener('scroll',upd,{passive:true}); addEventListener('resize',upd); upd();
  ['scroll','scrollend','touchend'].forEach(ev=>stack.addEventListener(ev,()=>{if(matchMedia('(max-width:820px)').matches)upd()},{passive:true}));
})();

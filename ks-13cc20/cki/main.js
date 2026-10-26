(()=>{
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const hd=$('#hd');
  const darkSecs=['.hero','.commit','.ft'].map(s=>$(s)).filter(Boolean);
  const tone=()=>{const y=scrollY+37;const onDark=darkSecs.some(s=>{const r=s.getBoundingClientRect();const t=r.top+scrollY;return y>=t&&y<t+r.height});hd.classList.toggle('is-light',!onDark)};
  addEventListener('scroll',tone,{passive:true});addEventListener('resize',tone);tone();
  const btn=$('#menuBtn'),sp=$('#spnav');
  btn.addEventListener('click',()=>{const o=sp.classList.toggle('is-open');btn.setAttribute('aria-expanded',o)});
  $$('a',sp).forEach(a=>a.addEventListener('click',()=>{sp.classList.remove('is-open');btn.setAttribute('aria-expanded',false)}));
  const hero=$('.hero'),photo=$('.hero__photo');
  const heroWipe=()=>{const r=hero.getBoundingClientRect();const span=hero.offsetHeight-innerHeight;const p=Math.min(Math.max(-r.top/span,0),1);photo.style.clipPath=`inset(${(1-p)*100}% 0 0 0)`};
  addEventListener('scroll',heroWipe,{passive:true});addEventListener('resize',heroWipe);heroWipe();
  const biz=$('.biz'),track=$('#bizTrack');
  const slide=()=>{if(matchMedia('(max-width:820px)').matches){track.style.transform='';return}
    const r=biz.getBoundingClientRect();const span=biz.offsetHeight-innerHeight;const p=Math.min(Math.max(-r.top/span,0),1);
    const max=track.scrollWidth+520-innerWidth+71;track.style.transform=`translateX(${-p*max}px)`};
  addEventListener('scroll',slide,{passive:true});addEventListener('resize',slide);slide();
})();

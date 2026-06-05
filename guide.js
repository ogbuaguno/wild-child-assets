/* ============================================================
   WILD CHILD 4.0 — Brand Guide interactions
   ============================================================ */
(function(){
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>toast.classList.remove('show'), 1800);
  }

  /* ---- copy hex from swatches ---- */
  document.querySelectorAll('.swatch').forEach(sw=>{
    sw.addEventListener('click', ()=>{
      const hex = sw.dataset.hex;
      navigator.clipboard.writeText(hex).then(
        ()=>showToast('Copied '+hex),
        ()=>showToast(hex)
      );
    });
  });

  /* ---- download asset files ---- */
  async function download(url, name){
    try{
      const res = await fetch(url);
      const blob = await res.blob();
      const a = document.createElement('a');
      const objUrl = URL.createObjectURL(blob);
      a.href = objUrl; a.download = name;
      document.body.appendChild(a); a.click();
      a.remove();
      setTimeout(()=>URL.revokeObjectURL(objUrl), 2000);
      showToast('Downloading '+name);
    }catch(e){
      // fallback: open in new tab
      window.open(url,'_blank');
      showToast('Opening '+name);
    }
  }
  document.querySelectorAll('[data-dl]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      download(btn.dataset.dl, btn.dataset.name || btn.dataset.dl.split('/').pop());
    });
  });

  /* ---- swirl tiles: click anywhere on card downloads ---- */
  document.querySelectorAll('.swirl-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const url = card.dataset.swirl;
      download(url, 'wildchild-swirl-'+url.split('/').pop());
    });
  });

  /* ---- scroll-spy active nav ---- */
  const links = [...document.querySelectorAll('.nav-links a')];
  const map = {};
  links.forEach(l=>{ const id=l.getAttribute('href').slice(1); const s=document.getElementById(id); if(s) map[id]=l; });
  const sections = Object.keys(map).map(id=>document.getElementById(id));
  const spy = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        links.forEach(l=>l.classList.remove('active'));
        const l = map[en.target.id];
        if(l) l.classList.add('active');
      }
    });
  }, {rootMargin:'-45% 0px -50% 0px', threshold:0});
  sections.forEach(s=>spy.observe(s));

  /* ---- reveal on scroll ---- */
  const rev = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){ en.target.classList.add('in'); rev.unobserve(en.target); }
    });
  }, {rootMargin:'0px 0px -8% 0px', threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>rev.observe(el));

  /* ---- respect reduced motion ---- */
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.body.classList.add('no-motion');
  }
})();

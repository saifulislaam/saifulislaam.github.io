

// ======================== MATRIX RAIN ========================

(function(){

  const canvas = document.getElementById('matrixCanvas');

  const ctx = canvas.getContext('2d');

  function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}

  resize();

  window.addEventListener('resize',resize);

  const chars='01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&';

  const fontSize=13;

  let cols=Math.floor(canvas.width/fontSize);

  let drops=Array(cols).fill(1);

  function draw(){

    ctx.fillStyle='rgba(3,5,7,0.04)';

    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle='#00FF66';

    ctx.font=fontSize+'px Share Tech Mono, monospace';

    for(let i=0;i<drops.length;i++){

      const c=chars[Math.floor(Math.random()*chars.length)];

      ctx.fillText(c,i*fontSize,drops[i]*fontSize);

      if(drops[i]*fontSize>canvas.height&&Math.random()>0.975)drops[i]=0;

      drops[i]++;

    }

  }

  setInterval(draw,45);

  window.addEventListener('resize',()=>{cols=Math.floor(canvas.width/fontSize);drops=Array(cols).fill(1);});

})();



// ======================== BOOT SCREEN ========================

const bootLines=[

  '> INITIALIZING SAIF_OPS CYBER TERMINAL v4.2.1...',

  '> LOADING ENCRYPTION PROTOCOLS...',

  '> ESTABLISHING SECURE CONNECTION...',

  '> SCANNING THREAT VECTORS...',

  '> MOUNTING CLASSIFIED DATABASES...',

  '> AUTHENTICATING OPERATOR CREDENTIALS...',

  '> ACCESS GRANTED // CLEARANCE LEVEL 5',

  '> RENDERING TACTICAL INTERFACE...',

  '> SYSTEM ONLINE // STANDBY FOR DEPLOYMENT',

];

const bl=document.getElementById('bootLines');

const bb=document.getElementById('bootBar');

const bs=document.getElementById('bootScreen');

let lineIdx=0;

function showNextLine(){

  if(lineIdx<bootLines.length){

    const d=document.createElement('div');

    d.textContent=bootLines[lineIdx];

    d.style.animation='fadeInLine 0.05s forwards';

    bl.appendChild(d);

    lineIdx++;

    bb.style.width=Math.round((lineIdx/bootLines.length)*100)+'%';

    setTimeout(showNextLine,200+Math.random()*150);

  } else {

    setTimeout(()=>{bs.style.opacity='0';setTimeout(()=>{bs.style.display='none';},800);},400);

  }

}

setTimeout(showNextLine,300);



// ======================== SIDEBAR CLOCK ========================

function updateClock(){

  const t=new Date();

  const h=String(t.getHours()).padStart(2,'0');

  const m=String(t.getMinutes()).padStart(2,'0');

  const s=String(t.getSeconds()).padStart(2,'0');

  const el=document.getElementById('sidebarTime');

  if(el)el.textContent=h+':'+m+':'+s;

}

setInterval(updateClock,1000);updateClock();



// ======================== NAV INDICATOR ========================

const navItems=document.querySelectorAll('.nav-item');

const navIndicator=document.getElementById('navIndicator');

const navWrap=document.getElementById('navWrap');

function moveIndicator(item){

  if(!item)return;

  const wrapTop=navWrap.getBoundingClientRect().top;

  const itemTop=item.getBoundingClientRect().top;

  const offset=itemTop-wrapTop+navWrap.scrollTop;

  navIndicator.style.transform='translateY('+offset+'px)';

  navIndicator.style.backgroundColor=item.getAttribute('data-color')||'var(--primary)';

  navIndicator.style.boxShadow='0 0 12px '+(item.getAttribute('data-color')||'var(--primary)');

  navIndicator.style.opacity='1';

}

navItems.forEach(item=>{

  item.addEventListener('mouseenter',()=>moveIndicator(item));

  item.addEventListener('mouseleave',()=>{

    const active=document.querySelector('.nav-item.active');

    if(active)moveIndicator(active);

  });

});

window.addEventListener('load',()=>{if(navItems[0])moveIndicator(navItems[0]);});



// ======================== SCROLLSPY ========================

const sections=document.querySelectorAll('section[id]');

window.addEventListener('scroll',()=>{

  let current='';

  sections.forEach(sec=>{

    if(window.scrollY>=(sec.offsetTop-200))current=sec.id;

  });

  navItems.forEach(item=>{

    item.classList.remove('active');

    const href=item.getAttribute('href');

    if(href==='#'+current){

      item.classList.add('active');

      moveIndicator(item);

    }

  });

  // Mobile topbar scroll effect

  const mob=document.getElementById('mobTopbar');

  if(window.scrollY>20)mob.classList.add('scrolled');

  else mob.classList.remove('scrolled');

});



// ======================== MOBILE MENU ========================

const sidebar=document.getElementById('sidebar');

document.getElementById('menuBtn').addEventListener('click',e=>{

  e.stopPropagation();sidebar.classList.toggle('open');});

document.addEventListener('click',e=>{

  if(window.innerWidth<1024&&sidebar.classList.contains('open')){

    if(!sidebar.contains(e.target)&&!document.getElementById('menuBtn').contains(e.target))

      sidebar.classList.remove('open');

  }

});

navItems.forEach(i=>i.addEventListener('click',()=>{if(window.innerWidth<1024)sidebar.classList.remove('open');}));



// ======================== REVEAL ON SCROLL ========================

const revealEls=document.querySelectorAll('.reveal:not(.active)');

const revealObs=new IntersectionObserver(entries=>{

  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('active');revealObs.unobserve(e.target);}});

},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});

revealEls.forEach(el=>revealObs.observe(el));



// ======================== TYPING EFFECT ========================

const typingStrings=[

  'Full-Stack Web Developer',

  'React + Laravel Specialist',

  'AI Integration Engineer',

  'UI/UX System Architect',

];

let tsIdx=0,tCharIdx=0,tDeleting=false;

const typingEl=document.getElementById('typingText');

function typeLoop(){

  const cur=typingStrings[tsIdx];

  if(!tDeleting){

    typingEl.textContent=cur.substring(0,tCharIdx+1);

    tCharIdx++;

    if(tCharIdx===cur.length){tDeleting=true;setTimeout(typeLoop,1800);return;}

  } else {

    typingEl.textContent=cur.substring(0,tCharIdx-1);

    tCharIdx--;

    if(tCharIdx===0){tDeleting=false;tsIdx=(tsIdx+1)%typingStrings.length;}

  }

  setTimeout(typeLoop,tDeleting?45:65);

}

setTimeout(typeLoop,3200);



// ======================== FOOTER OFFSET (sidebar) ========================

function adjustFooter(){

  const fw=document.getElementById('footerWrap');

  if(!fw)return;

  if(window.innerWidth>=1024){fw.style.marginLeft='270px';}

  else{fw.style.marginLeft='0';}

}

adjustFooter();window.addEventListener('resize',adjustFooter);


// =========================================================
// OpenClaw-style interactions: nav, drawer, reveals, terminal
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Icons ---------- */
  if (window.lucide) lucide.createIcons();

  /* ---------- Sticky nav background on scroll ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile drawer ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const drawer = document.getElementById('drawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  const openDrawer = () => {
    drawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const closeDrawer = () => {
    drawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  menuBtn?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);
  drawer?.querySelectorAll('.drawer-link, .btn').forEach(el =>
    el.addEventListener('click', closeDrawer)
  );

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));

  /* ---------- Terminal tabs ---------- */
  const tabs = document.querySelectorAll('.terminal-tab');
  const panes = document.querySelectorAll('.terminal-pane');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`.terminal-pane[data-pane="${tab.dataset.tab}"]`)?.classList.add('active');
    });
  });

  /* ---------- Copy terminal content ---------- */
  const copyBtn = document.getElementById('copyBtn');
  copyBtn?.addEventListener('click', async () => {
    const active = document.querySelector('.terminal-pane.active code');
    if (!active) return;
    try {
      await navigator.clipboard.writeText(active.innerText);
      const label = copyBtn.querySelector('span');
      const original = label.textContent;
      label.textContent = 'Copied!';
      setTimeout(() => (label.textContent = original), 1500);
    } catch (e) {
      /* clipboard unavailable — fail silently */
    }
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.style.color = '');
        link.style.color = 'var(--text-primary)';
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => navIo.observe(s));

  /* ---------- Ambient particle background ---------- */
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = Math.min(window.innerHeight, 900);
    };

    const initParticles = () => {
      const count = Math.min(60, Math.floor((width * height) / 28000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.4,
        vy: Math.random() * 0.15 + 0.05,
        o: Math.random() * 0.4 + 0.1
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.y -= p.vy;
        if (p.y < -5) p.y = height + 5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,106,77,${p.o})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    resize();
    initParticles();
    window.addEventListener('resize', () => { resize(); initParticles(); });
    if (!prefersReducedMotion) draw();
  }

});

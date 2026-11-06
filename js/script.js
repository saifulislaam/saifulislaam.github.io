    // 1. Decorate all `.inspectable` elements with Figma corner handles & dimension pills
    function initInspectables() {
      const items = document.querySelectorAll('.inspectable');
      items.forEach(el => {
        ['fh-tl', 'fh-tr', 'fh-bl', 'fh-br'].forEach(pos => {
          const handle = document.createElement('div');
          handle.className = `figma-handle ${pos}`;
          el.appendChild(handle);
        });
        const pill = document.createElement('div');
        pill.className = 'figma-dim-pill';
        el.appendChild(pill);

        // Update dimension text on hover or selection
        const updateDim = () => {
          const rect = el.getBoundingClientRect();
          const label = el.getAttribute('data-label') || 'NODE';
          pill.textContent = `${label} · ${Math.round(rect.width)} × ${Math.round(rect.height)}`;
        };
        el.addEventListener('mouseenter', () => {
          updateDim();
          el.classList.add('agent-selected');
        });
        el.addEventListener('mouseleave', () => {
          el.classList.remove('agent-selected');
        });
      });
    }

    // 2. Interactive 7-Layer Stack Data
    const layersData = [
      {
        tag: 'LAYER 01 // FRONTEND PRESENTATION CORE',
        title: 'Component-Driven Reactive Glass UI',
        desc: 'Built with React.js, TypeScript, and Tailwind CSS. Delivers 60fps micro-interactions, mobile-first fluid layouts, and zero-latency state updates across desktop and mobile viewports.',
        badges: ['React.js 18', 'Tailwind CSS', 'TypeScript', 'HTML5 / CSS3']
      },
      {
        tag: 'LAYER 02 // REAL-TIME API GATEWAY',
        title: 'REST, GraphQL & WebSocket Stream Router',
        desc: 'Low-latency API gateway orchestrating token authentication, rate limiting, and bi-directional WebSocket channels for live AI token streaming.',
        badges: ['REST APIs', 'GraphQL', 'WebSockets', 'JWT Auth']
      },
      {
        tag: 'LAYER 03 // APPLICATION & BUSINESS LOGIC',
        title: 'Laravel & Node.js Microservice Core',
        desc: 'Decoupled server architectures engineered in Laravel (PHP) and Node.js. Handles complex enterprise workflows, job queues, and asynchronous event dispatching.',
        badges: ['Laravel', 'Node.js', 'Event Sourcing', 'MVC Architecture']
      },
      {
        tag: 'LAYER 04 // ARTIFICIAL INTELLIGENCE & RAG',
        title: 'Multi-Model LLM & Diffusion Pipeline',
        desc: 'Direct integration with OpenAI GPT models, custom RAG vector embeddings, and generative image diffusion endpoints for intelligent automation.',
        badges: ['OpenAI API', 'RAG Memory', 'Diffusion API', 'Vector Search']
      },
      {
        tag: 'LAYER 05 // PERSISTENCE & HIGH-SPEED CACHE',
        title: 'Relational, NoSQL & In-Memory Data Layer',
        desc: 'Optimized database schemas across PostgreSQL, MySQL, and MongoDB paired with sub-millisecond Redis caching for high-concurrency queries.',
        badges: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis Cache']
      },
      {
        tag: 'LAYER 06 // FINTECH & WEBHOOK ENGINE',
        title: 'Multi-Gateway Payment & Idempotent Webhooks',
        desc: 'Fault-tolerant checkout routing integrating Stripe, PayPal, and Crypto gateways with cryptographic webhook signature verification.',
        badges: ['Stripe API', 'PayPal', 'Crypto Gateways', 'Webhooks']
      },
      {
        tag: 'LAYER 07 // CONTAINERIZATION & CLOUD DEPLOY',
        title: 'Dockerized CI/CD & AWS Cloud Infrastructure',
        desc: 'Reproducible Docker environments, automated Git workflows, and horizontally scalable AWS cloud deployments with 99.9% uptime.',
        badges: ['Docker', 'AWS Cloud', 'Git / GitHub', 'CI/CD Pipelines']
      }
    ];

    function selectLayer(idx) {
      const data = layersData[idx];
      document.getElementById('layerTag').textContent = data.tag;
      document.getElementById('layerTitle').textContent = data.title;
      document.getElementById('layerDesc').textContent = data.desc;
      
      const badgesContainer = document.getElementById('layerBadges');
      badgesContainer.innerHTML = data.badges.map(b => 
        `<span class="font-mono text-[10px] bg-zinc-900 border border-white/10 px-2.5 py-1 rounded text-zinc-300">${b}</span>`
      ).join('');

      const btns = document.querySelectorAll('.layer-btn');
      btns.forEach((btn, i) => {
        if (i === idx) {
          btn.className = 'layer-btn bg-brand text-white font-mono text-xs px-3.5 py-2 rounded border border-brand transition-all';
        } else {
          btn.className = 'layer-btn bg-zinc-900/90 text-zinc-400 hover:text-white font-mono text-xs px-3.5 py-2 rounded border border-white/10 transition-all';
        }
      });
    }

    // 3. Filterable Systems Matrix
    function filterMatrix(category) {
      const items = document.querySelectorAll('.matrix-item');
      items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-cat') === category) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });

      const tabs = document.querySelectorAll('.matrix-tab');
      tabs.forEach(tab => {
        if (tab.getAttribute('data-filter') === category) {
          tab.className = 'matrix-tab bg-brand text-white font-mono text-xs px-4 py-2 rounded transition-all';
        } else {
          tab.className = 'matrix-tab bg-zinc-900 text-zinc-400 hover:text-white border border-white/10 font-mono text-xs px-4 py-2 rounded transition-all';
        }
      });
    }

    // 4. Copy Email Helper
    function copyEmail() {
      const email = 'saifulislam.git@gmail.com';
      const temp = document.createElement('textarea');
      temp.value = email;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);

      const toast = document.getElementById('toastMsg');
      toast.textContent = 'Copied: saifulislam.git@gmail.com';
      toast.style.opacity = '1';
      setTimeout(() => { toast.style.opacity = '0'; }, 2400);
    }

    // 5. USER INTERACTIVE CANVAS MARQUEE & ELEMENT DRAG
    let isUserDraggingMarquee = false;
    let startX = 0, startY = 0;
    const userMarquee = document.getElementById('userMarquee');
    const userMarqueeSize = document.getElementById('userMarqueeSize');

    window.addEventListener('mousedown', (e) => {
      // Ignore clicks on buttons or links
      if (e.target.closest('a, button, nav')) return;

      isUserDraggingMarquee = true;
      startX = e.clientX;
      startY = e.clientY;
      userMarquee.style.display = 'block';
      userMarquee.style.left = `${startX}px`;
      userMarquee.style.top = `${startY}px`;
      userMarquee.style.width = '0px';
      userMarquee.style.height = '0px';
    });

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isUserDraggingMarquee) return;

      const x = Math.min(e.clientX, startX);
      const y = Math.min(e.clientY, startY);
      const w = Math.abs(e.clientX - startX);
      const h = Math.abs(e.clientY - startY);

      userMarquee.style.left = `${x}px`;
      userMarquee.style.top = `${y}px`;
      userMarquee.style.width = `${w}px`;
      userMarquee.style.height = `${h}px`;
      userMarqueeSize.textContent = `${Math.round(w)} × ${Math.round(h)}`;

      // Highlight any `.inspectable` intersecting the user's marquee box
      const mRect = { left: x, top: y, right: x + w, bottom: y + h };
      document.querySelectorAll('.inspectable').forEach(el => {
        const r = el.getBoundingClientRect();
        const intersects = !(r.right < mRect.left || r.left > mRect.right || r.bottom < mRect.top || r.top > mRect.bottom);
        if (intersects && w > 8 && h > 8) {
          el.classList.add('user-dragging');
          const pill = el.querySelector('.figma-dim-pill');
          if (pill) pill.textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`;
        } else {
          el.classList.remove('user-dragging');
        }
      });
    });

    window.addEventListener('mouseup', () => {
      if (isUserDraggingMarquee) {
        isUserDraggingMarquee = false;
        userMarquee.style.display = 'none';
        setTimeout(() => {
          document.querySelectorAll('.inspectable.user-dragging').forEach(el => {
            el.classList.remove('user-dragging');
          });
        }, 600);
      }
    });

    // 6. AUTONOMOUS 20-AGENT CURSOR SWARM & MARQUEE ENGINE (Exact Video Match)
    const agentConfigs = [
      { name: 'REACT_UI', color: '#00F0FF' },
      { name: 'LARAVEL_OP', color: '#FF2E1A' },
      { name: 'RAG_CORE', color: '#A855F7' },
      { name: 'SYS_ARCH', color: '#10B981' },
      { name: 'NODE_API', color: '#F59E0B' },
      { name: 'DOCKER_01', color: '#38BDF8' },
      { name: 'REDIS_MEM', color: '#EC4899' },
      { name: 'STRIPE_GW', color: '#84CC16' },
      { name: 'LLM_ROUTE', color: '#F97316' },
      { name: 'TYPE_CHK', color: '#60A5FA' },
      { name: 'SQL_INDEX', color: '#14B8A6' },
      { name: 'DIFFUSION', color: '#E879F9' },
      { name: 'TAILWIND', color: '#2DD4BF' },
      { name: 'AUTH_GUARD', color: '#FACC15' },
      { name: 'WEBHOOK_X', color: '#FB7185' },
      { name: 'AWS_NODE', color: '#FBBF24' },
      { name: 'VECTOR_DB', color: '#818CF8' },
      { name: 'DOM_SCAN', color: '#34D399' },
      { name: 'UI_VERIF', color: '#F43F5E' },
      { name: 'SWARM_20', color: '#A3E635' }
    ];

    const agentLayer = document.getElementById('agentLayer');
    const agents = [];
    let agentMode = 'intro'; // 'intro' -> 'touring' or 'swarm'
    let agentsPaused = false;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let introAngle = 0;

    function createAgents() {
      agentConfigs.forEach((cfg, idx) => {
        const el = document.createElement('div');
        el.className = 'agent-cursor';
        el.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6));">
            <path d="M1.5 1.5L14.5 6.8L8.2 9.1L5.8 15.2L1.5 1.5Z" fill="${cfg.color}" stroke="#050507" stroke-width="1.2" stroke-linejoin="round"/>
          </svg>
          <span class="agent-tag" style="background:${cfg.color};">${cfg.name}</span>
        `;
        agentLayer.appendChild(el);

        // Start in a tight circle in center for the 00:00 intro vortex
        const angle = (idx / agentConfigs.length) * Math.PI * 2;
        const radius = 55 + (idx % 2) * 28;
        const cx = window.innerWidth / 2 + Math.cos(angle) * radius;
        const cy = window.innerHeight / 2 + Math.sin(angle) * radius;

        agents.push({
          el,
          cfg,
          x: cx,
          y: cy,
          tx: Math.random() * (window.innerWidth - 120) + 60,
          ty: Math.random() * (window.innerHeight - 120) + 60,
          speed: 0.025 + Math.random() * 0.03,
          orbitAngle: angle,
          orbitRadius: radius
        });
      });
    }

    // Autonomous Marquee Drag Simulation (like in 00:01 - 00:35 of video)
    const agentMarquee1 = document.getElementById('agentMarquee1');
    const agentMarqueeSize1 = document.getElementById('agentMarqueeSize1');
    const agentMarquee2 = document.getElementById('agentMarquee2');
    const agentMarqueeSize2 = document.getElementById('agentMarqueeSize2');

    function triggerAutonomousInspection() {
      if (agentsPaused || agentMode !== 'touring') return;

      const inspectables = Array.from(document.querySelectorAll('.inspectable')).filter(el => {
        const r = el.getBoundingClientRect();
        return r.top >= 40 && r.bottom <= window.innerHeight - 40 && r.width > 40;
      });

      if (inspectables.length === 0) return;

      // Pick a random visible element for an agent to inspect & select
      const target = inspectables[Math.floor(Math.random() * inspectables.length)];
      const rect = target.getBoundingClientRect();

      // Send one of the agents to the top-left of that element, then drag to bottom-right
      const ag = agents[Math.floor(Math.random() * 6)];
      ag.tx = rect.left + 8;
      ag.ty = rect.top + 8;

      setTimeout(() => {
        if (agentsPaused) return;
        target.classList.add('agent-selected');
        const pill = target.querySelector('.figma-dim-pill');
        if (pill) {
          const label = target.getAttribute('data-label') || 'COMPONENT';
          pill.textContent = `${label} · ${Math.round(rect.width)} × ${Math.round(rect.height)}`;
        }
        ag.tx = rect.right - 12;
        ag.ty = rect.bottom - 12;

        setTimeout(() => {
          target.classList.remove('agent-selected');
        }, 1400);
      }, 450);
    }

    // Periodic live blue marquee rectangle drag across canvas by agents
    function triggerAgentMarqueeBox(marqueeEl, sizeEl, agentIdx) {
      if (agentsPaused || agentMode !== 'touring') return;
      const ag = agents[agentIdx];
      if (!ag) return;

      const sx = Math.random() * (window.innerWidth * 0.65) + window.innerWidth * 0.1;
      const sy = Math.random() * (window.innerHeight * 0.6) + window.innerHeight * 0.15;
      const mw = 140 + Math.random() * 220;
      const mh = 60 + Math.random() * 110;

      ag.tx = sx;
      ag.ty = sy;

      setTimeout(() => {
        if (agentsPaused || agentMode !== 'touring') return;
        marqueeEl.style.display = 'block';
        marqueeEl.style.left = `${sx}px`;
        marqueeEl.style.top = `${sy}px`;
        marqueeEl.style.width = '10px';
        marqueeEl.style.height = '10px';

        ag.tx = sx + mw;
        ag.ty = sy + mh;

        let step = 0;
        const maxSteps = 22;
        const interval = setInterval(() => {
          step++;
          const progress = step / maxSteps;
          const cw = mw * progress;
          const ch = mh * progress;
          marqueeEl.style.width = `${cw}px`;
          marqueeEl.style.height = `${ch}px`;
          sizeEl.textContent = `${Math.round(cw)} × ${Math.round(ch)}`;

          if (step >= maxSteps) {
            clearInterval(interval);
            setTimeout(() => {
              marqueeEl.style.display = 'none';
            }, 350);
          }
        }, 22);
      }, 400);
    }

    function animateAgents() {
      if (!agentsPaused) {
        introAngle += 0.045;

        agents.forEach((ag, i) => {
          if (agentMode === 'intro') {
            // Circular vortex rotation around the center logo (00:00 - 00:01)
            const a = ag.orbitAngle + introAngle;
            const tx = window.innerWidth / 2 + Math.cos(a) * ag.orbitRadius;
            const ty = window.innerHeight / 2 + Math.sin(a) * ag.orbitRadius;
            ag.x += (tx - ag.x) * 0.18;
            ag.y += (ty - ag.y) * 0.18;
          } else if (agentMode === 'swarm') {
            // Swarm tightly around user mouse cursor (00:53 in video)
            const a = ag.orbitAngle + introAngle * 0.6;
            const r = 28 + (i % 4) * 22;
            const tx = mouseX + Math.cos(a) * r;
            const ty = mouseY + Math.sin(a) * r;
            ag.x += (tx - ag.x) * 0.12;
            ag.y += (ty - ag.y) * 0.12;
          } else {
            // 'touring' mode: autonomous exploration across the viewport
            ag.x += (ag.tx - ag.x) * ag.speed;
            ag.y += (ag.ty - ag.y) * ag.speed;

            if (Math.hypot(ag.tx - ag.x, ag.ty - ag.y) < 18) {
              // Pick a new waypoint (Only keep ~8 agents visible on screen so it looks clean like the video)
              if (i < 8) {
                ag.tx = Math.random() * (window.innerWidth - 140) + 50;
                ag.ty = Math.random() * (window.innerHeight - 140) + 50;
                ag.el.style.opacity = '0.92';
              } else {
                // Park extra agents softly at edges until Swarm mode is clicked
                ag.tx = (i % 2 === 0) ? -80 : window.innerWidth + 80;
                ag.ty = Math.random() * window.innerHeight;
                ag.el.style.opacity = '0';
              }
            }
          }

          ag.el.style.transform = `translate3d(${ag.x}px, ${ag.y}px, 0)`;
        });
      }

      requestAnimationFrame(animateAgents);
    }

    function setAgentMode(mode) {
      agentMode = mode;
      const btnTouring = document.getElementById('btnTouring');
      const btnSwarm = document.getElementById('btnSwarm');

      if (mode === 'swarm') {
        btnSwarm.className = 'px-2.5 py-1 rounded-full font-mono text-[10px] bg-brand text-white transition-all';
        btnTouring.className = 'px-2.5 py-1 rounded-full font-mono text-[10px] text-zinc-400 hover:text-white transition-all';
        agents.forEach(ag => { ag.el.style.opacity = '1'; });
      } else {
        btnTouring.className = 'px-2.5 py-1 rounded-full font-mono text-[10px] bg-brand text-white transition-all';
        btnSwarm.className = 'px-2.5 py-1 rounded-full font-mono text-[10px] text-zinc-400 hover:text-white transition-all';
      }
    }

    function togglePauseAgents() {
      agentsPaused = !agentsPaused;
      const icon = document.getElementById('pauseIcon');
      icon.className = agentsPaused ? 'ph-fill ph-play text-xs text-brand' : 'ph-fill ph-pause text-xs';
      if (agentsPaused) {
        agentMarquee1.style.display = 'none';
        agentMarquee2.style.display = 'none';
      }
    }

    // Boot Sequence on Window Load
    window.onload = () => {
      initInspectables();
      createAgents();
      animateAgents();

      // Transition from Intro Vortex (00:00) -> Dispersed Canvas Touring (00:02)
      setTimeout(() => {
        const overlay = document.getElementById('introOverlay');
        overlay.style.opacity = '0';
        setAgentMode('touring');
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 700);
      }, 1300);

      // Schedule autonomous element inspections & marquee boxes
      setInterval(triggerAutonomousInspection, 1600);
      setInterval(() => triggerAgentMarqueeBox(agentMarquee1, agentMarqueeSize1, 0), 3400);
      setInterval(() => triggerAgentMarqueeBox(agentMarquee2, agentMarqueeSize2, 2), 4900);
    };

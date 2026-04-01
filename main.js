/* =============================================
   COAXIS AI — main.js
   Ultimate 2026 Premium Animated Architecture
   ============================================= */
'use strict';

const lerp = (a, b, t) => a + (b - a) * t;

/* ══════════════════════════════════════════
   1. HARDWARE ACCELERATED CURSOR
══════════════════════════════════════════ */
(function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`; 
  }, { passive: true });

  (function follow() {
    rx = lerp(rx, mx, 0.15);
    ry = lerp(ry, my, 0.15);
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    requestAnimationFrame(follow);
  })();
})();

/* ══════════════════════════════════════════
   2. UI & NEXT-GEN TEXT SPLIT REVEALS
══════════════════════════════════════════ */
(function initUI() {
  const hdr = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (hdr) hdr.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 1. Text Splitting for Titles/Subtitles to create "Zordar" 3D wave reveal
  document.querySelectorAll('.section-title, .hero-title').forEach(title => {
    // Preserve the accent span if present (for hero), or simply split words
    if(title.querySelector('.accent')) {
        // Just general reveal for complex innerHTML
        return; 
    }
    const text = title.textContent;
    title.textContent = '';
    text.split(' ').forEach((word, wIdx) => {
        const wordDiv = document.createElement('div');
        wordDiv.style.display = 'inline-block';
        wordDiv.style.overflow = 'visible'; // allow popout
        wordDiv.style.marginRight = '12px';
        
        word.split('').forEach((char, cIdx) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.classList.add('char-reveal');
            span.style.transitionDelay = `${(wIdx * 0.05) + (cIdx * 0.02)}s`;
            wordDiv.appendChild(span);
        });
        title.appendChild(wordDiv);
    });
  });

  // 2. Advanced Scroll Observer
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        // If it contains chars, add a class to trigger cascade
        if(e.target.classList.contains('section-title') || e.target.classList.contains('hero-title')) {
           e.target.classList.add('chars-revealed');
        }
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal, .section-title, .hero-title, .hero-sub, .hero-cta-group').forEach(el => revealObs.observe(el));

  // 3. Counters
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      const tick = now => {
        const p = Math.min((now - start) / 2000, 1);
        const eased = 1 - Math.pow(1 - p, 4); 
        const val = eased * target;
        el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));
})();

/* ══════════════════════════════════════════
   3. THREE.JS — ADVANCED NEURAL GRAPH
══════════════════════════════════════════ */
(function init3D() {
  if (typeof THREE === 'undefined') return;
  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 180;
  camera.position.x = 80;
  camera.position.y = 20;

  const NODE_COUNT = window.innerWidth < 768 ? 80 : 150; 
  const MAX_CONN_DIST = 55; 
  const positions = new Float32Array(NODE_COUNT * 3);
  const velocities = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    const r = Math.cbrt(Math.random()) * 160; 
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i*3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i*3+2] = r * Math.cos(phi);
    velocities.push({
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      vz: (Math.random() - 0.5) * 0.15
    });
  }

  const particlesGeo = new THREE.BufferGeometry();
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMaterial = new THREE.PointsMaterial({
    color: 0x7DD9D0, size: 1.5, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending
  });
  const particleSystem = new THREE.Points(particlesGeo, pMaterial);
  scene.add(particleSystem);

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x2BBFB0, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending
  });
  const MAX_LINES = NODE_COUNT * 4;
  const linePositions = new Float32Array(MAX_LINES * 6);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const linesMesh = new THREE.LineSegments(lineGeo, lineMaterial);
  scene.add(linesMesh);

  let scrollY = 0, mouseX = 0, mouseY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  function animate() {
    requestAnimationFrame(animate);
    const pos = particlesGeo.attributes.position.array;
    let lineIdx = 0;

    particleSystem.rotation.y += 0.0015;
    linesMesh.rotation.y += 0.0015;
    particleSystem.rotation.z += 0.0005;
    linesMesh.rotation.z += 0.0005;

    camera.position.y = lerp(camera.position.y, 20 - (scrollY * 0.05), 0.1);
    camera.position.x = lerp(camera.position.x, 80 + (mouseX * 15), 0.05);

    for (let i = 0; i < NODE_COUNT; i++) {
        const i3 = i * 3;
        pos[i3] += velocities[i].vx;
        pos[i3+1] += velocities[i].vy;
        pos[i3+2] += velocities[i].vz;

        const distCenter = Math.sqrt(pos[i3]**2 + pos[i3+1]**2 + pos[i3+2]**2);
        if(distCenter > 160) {
            velocities[i].vx *= -1;
            velocities[i].vy *= -1;
            velocities[i].vz *= -1;
        }

        for (let j = i + 1; j < NODE_COUNT; j++) {
            const j3 = j * 3;
            const dx = pos[i3] - pos[j3];
            const dy = pos[i3+1] - pos[j3+1];
            const dz = pos[i3+2] - pos[j3+2];
            if ((dx*dx + dy*dy + dz*dz) < MAX_CONN_DIST * MAX_CONN_DIST) {
                if (lineIdx < MAX_LINES) {
                  const idx6 = lineIdx * 6;
                  linePositions[idx6] = pos[i3];   linePositions[idx6+1] = pos[i3+1]; linePositions[idx6+2] = pos[i3+2];
                  linePositions[idx6+3] = pos[j3]; linePositions[idx6+4] = pos[j3+1]; linePositions[idx6+5] = pos[j3+2];
                  lineIdx++;
                }
            }
        }
    }
    particlesGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.setDrawRange(0, lineIdx * 2);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, { passive: true });
})();

/* ══════════════════════════════════════════
   4. ULTIMATE HOLOGRAPHIC 3D CARDS
   (Spotlight border glow + Deep 3D Parallax Inside)
══════════════════════════════════════════ */
(function initHoloCards() {
  document.querySelectorAll('.stat-card, .service-card, .process-step, .highlight-box').forEach(card => {
    // Wrap internal contents to give them Z depth independence
    const innerHTML = card.innerHTML;
    card.innerHTML = '';
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('card-content-3d');
    contentWrapper.innerHTML = innerHTML;
    card.appendChild(contentWrapper);

    // Setup Holo layers
    const glare = document.createElement('div');
    glare.classList.add('card-glare-layer');
    card.appendChild(glare);

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Mouse Spotlight CSS variable for the animated neon border pseudo-element
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      // Extreme 3D Tilt calculation
      const rotX = -((y - rect.height/2) / rect.height) * 22; // Extreme tilt!
      const rotY = ((x - rect.width/2) / rect.width) * 22;

      card.style.transition = 'transform 0.1s ease-out';
      // The pop-out scale to look floating
      card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.05, 1.05, 1.05)`;
      
      // Intensive shadow logic to fake light source
      card.style.boxShadow = `${-rotY * 2}px ${rotX * 2 + 25}px 60px rgba(0,0,0,0.8), 0 0 45px rgba(43,191,176,0.4)`;
      
      // Realistic glare tracking light source
      glare.style.opacity = '1';
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.25), transparent 70%)`;
    });

    card.addEventListener('mouseleave', () => {
      // Bounce back to normal beautifully
      card.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.25), box-shadow 0.8s'; // Bouncy ease back
      card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.boxShadow = '';
      glare.style.opacity = '0';
    });
  });
})();

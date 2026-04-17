/* =============================================
   COAXIS AI — main.js
   Ultimate 2026 Premium Animated Architecture
   ============================================= */
'use strict';

/* ══════════════════════════════════════════
   1. MEGA INTRO OVERLAY — SMOOTH 60FPS
══════════════════════════════════════════ */
let introSceneActive = false;
let introRenderer, introScene, introCamera;
let introIntervalId = null;

function destroyIntro3D() {
  introSceneActive = false;
  if (introRenderer) {
    introRenderer.dispose();
    const el = document.getElementById('intro-3d-target');
    if (el) el.innerHTML = '';
    introRenderer = null;
  }
  if (introIntervalId) { clearInterval(introIntervalId); introIntervalId = null; }
}

function initIntro3D() {
  const container = document.getElementById('intro-3d-target');
  if (!container || introSceneActive) return;

  introScene = new THREE.Scene();
  introCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  introCamera.position.z = 0; // Starting inside the tunnel

  introRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  introRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  introRenderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(introRenderer.domElement);

  /* --- 1. NEURAL TUNNEL (Hundreds of High-Energy Splines) --- */
  const tunnelGroup = new THREE.Group();
  introScene.add(tunnelGroup);

  const curveCount = 60;
  const tubeRadius = 15;
  const tubeLength = 400;

  for (let i = 0; i < curveCount; i++) {
    const points = [];
    for (let j = 0; j < 6; j++) {
      points.push(new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        j * (tubeLength / 5) - tubeLength / 2
      ));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.05, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({ 
      color: i % 2 === 0 ? 0x2BBFB0 : 0x7DD9D0,
      transparent: true,
      opacity: 0.3 + Math.random() * 0.4,
      blending: THREE.AdditiveBlending
    });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    tunnelGroup.add(tube);
  }

  /* --- 2. FLOATING DATA PARTICLES (Stars/Dust) --- */
  const partCount = 4000;
  const partGeo = new THREE.BufferGeometry();
  const partPos = new Float32Array(partCount * 3);
  for (let i = 0; i < partCount; i++) {
    partPos[i * 3] = (Math.random() - 0.5) * 100;
    partPos[i * 3 + 1] = (Math.random() - 0.5) * 100;
    partPos[i * 3 + 2] = (Math.random() - 0.5) * tubeLength;
  }
  partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
  const partMat = new THREE.PointsMaterial({
    size: 0.1,
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  const stars = new THREE.Points(partGeo, partMat);
  introScene.add(stars);

  /* --- 3. CORE GLOW PULSE --- */
  const light = new THREE.PointLight(0x2BBFB0, 10, 200);
  introScene.add(light);

  /* --- 4. ANIMATION LOOP (HYPER-JUMP FEEL) --- */
  const clock = new THREE.Clock();
  
  function animate() {
    if (!introSceneActive) return;
    requestAnimationFrame(animate);
    
    const elapsed = clock.getElapsedTime();
    
    // Move tunnel forward (Infinite Loop feel)
    tunnelGroup.children.forEach(tube => {
      tube.rotation.z += 0.001;
    });
    
    // Fly the camera through the tunnel
    introCamera.position.z = (elapsed * 50) % tubeLength - (tubeLength / 2);
    introCamera.rotation.z = elapsed * 0.1; // Rotate while flying
    
    // Shake camera slightly for "power" feel
    introCamera.position.x = Math.sin(elapsed * 4) * 0.5;
    introCamera.position.y = Math.cos(elapsed * 4) * 0.5;

    light.position.copy(introCamera.position);
    
    introRenderer.render(introScene, introCamera);
  }
  
  introSceneActive = true;
  animate();
}

/* --- Console Typewriter (visible, fixed) --- */
function startIntroConsole() {
  const logs = [
    "INITIALIZING NEURAL CORE...",
    "LINKING AGENTIC BACKBONE...",
    "SYNTHESIZING DATA FABRIC...",
    "ORCHESTRATING MULTI-AGENT SWARMS...",
    "STATUS: AUTONOMOUS EXECUTION READY.",
    "COAXIS AI — SYSTEMS INTEGRATED ✓"
  ];
  const console_el = document.getElementById('intro-console');
  if (!console_el) return;
  console_el.innerHTML = '';
  let i = 0;
  introIntervalId = setInterval(() => {
    if (i >= logs.length || !introSceneActive) { clearInterval(introIntervalId); return; }
    const line = document.createElement('div');
    line.className = 'console-line';
    line.textContent = '> ' + logs[i];
    if (i === logs.length - 1) line.classList.add('console-final');
    console_el.appendChild(line);
    console_el.scrollTop = console_el.scrollHeight;
    i++;
  }, 900);
}

function toggleIntro(show) {
  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;
  if (show) {
    destroyIntro3D();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { initIntro3D(); startIntroConsole(); }, 300);
  } else {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => destroyIntro3D(), 700);
  }
}

(function initIntroEvents() {
  document.querySelectorAll('a.logo').forEach(logo => {
    logo.addEventListener('click', (e) => { e.preventDefault(); toggleIntro(true); });
  });
  const closeBtn = document.getElementById('intro-close');
  if (closeBtn) closeBtn.addEventListener('click', () => toggleIntro(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggleIntro(false); });
})();


const lerp = (a, b, t) => a + (b - a) * t;

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
  }, { threshold: 0.1 });
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
    color: 0x2BBFB0, transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending
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
   5. HERO-SPECIFIC 3D CORE — ENTERPRISE DIGITAL TWIN (REAL GLOBE)
══════════════════════════════════════════ */
(function initHeroCore() {
  const container = document.getElementById('hero-3d-target');
  if (!container || typeof THREE === 'undefined') return;

  setTimeout(() => {
    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = 90;

    const group = new THREE.Group();
    scene.add(group);

    const R = 23;

    // 1. Core Energy Sphere (Atmosphere/Solid Base)
    const coreGeo = new THREE.SphereGeometry(R - 0.3, 64, 64);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x05080f,
      emissive: 0x07111f,
      specular: 0x2BBFB0,
      shininess: 60,
      transparent: true,
      opacity: 0.98
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // 2. High-Density Latitude/Longitude Grid (The 'Real' Tech Globe Look)
    const gridGeo = new THREE.SphereGeometry(R, 32, 24);
    const gridMat = new THREE.LineBasicMaterial({ 
      color: 0x2BBFB0, 
      transparent: true, 
      opacity: 0.4 
    });
    const globeGrid = new THREE.LineSegments(new THREE.WireframeGeometry(gridGeo), gridMat);
    group.add(globeGrid);

    // 3. Highlighted Data Nodes (Cities/Data Centers)
    const hubCount = 60;
    const hubGeo = new THREE.BufferGeometry();
    const hubPos = new Float32Array(hubCount * 3);
    for(let i=0; i<hubCount; i++) {
       const u = Math.random();
       const v = Math.random();
       const theta = u * 2.0 * Math.PI;
       const phi = Math.acos(2.0 * v - 1.0);
       hubPos[i*3] = (R+0.1) * Math.sin(phi) * Math.cos(theta);
       hubPos[i*3+1] = (R+0.1) * Math.sin(phi) * Math.sin(theta);
       hubPos[i*3+2] = (R+0.1) * Math.cos(phi);
    }
    hubGeo.setAttribute('position', new THREE.BufferAttribute(hubPos, 3));
    
    // Canvas texture for glowing hubs
    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.2, 'rgba(43,191,176,0.9)');
    grad.addColorStop(1, 'rgba(43,191,176,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,32,32);
    const texture = new THREE.CanvasTexture(canvas);

    const hubMat = new THREE.PointsMaterial({
       size: 5,
       map: texture,
       transparent: true,
       blending: THREE.AdditiveBlending,
       depthWrite: false
    });
    const hubs = new THREE.Points(hubGeo, hubMat);
    group.add(hubs);

    // 4. Radar Scanning Ring (Moves up and down the globe)
    const scannerGeo = new THREE.TorusGeometry(R + 0.3, 0.15, 4, 64);
    const scannerMat = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.7 
    });
    const scanner = new THREE.Mesh(scannerGeo, scannerMat);
    scanner.rotation.x = Math.PI / 2;
    group.add(scanner);

    // 5. Precise Technical Data Rings
    const orbitGroup = new THREE.Group();
    group.add(orbitGroup);
    
    for(let i=0; i<3; i++) {
        const ringGeo = new THREE.TorusGeometry(R + 6 + (i*4), 0.02, 8, 128);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x7DD9D0, transparent: true, opacity: 0.4 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.random() * Math.PI;
        ring.rotation.y = Math.random() * Math.PI;
        orbitGroup.add(ring);
        
        // Fast moving satellite
        const sat = new THREE.Mesh(new THREE.SphereGeometry(0.8, 12, 12), new THREE.MeshBasicMaterial({color: 0xffffff}));
        sat.position.x = R + 6 + (i*4);
        ring.add(sat);
    }
    
    // 6. UI Dashboard Brackets (Brings the Clean Architecture vibe)
    // Diamond box enclosing the globe
    const BracketMat = new THREE.LineBasicMaterial({ color: 0x2BBFB0, transparent: true, opacity: 0.5 });
    for(let i=0; i<2; i++) {
       const bracketGeo = new THREE.EdgesGeometry(new THREE.PlaneGeometry(R*2.8, R*2.8));
       const bracket = new THREE.LineSegments(bracketGeo, BracketMat);
       if(i===0) {
           bracket.rotation.x = Math.PI/2;
       } else {
           bracket.rotation.y = Math.PI/2;
       }
       group.add(bracket);
    }

    // Lighting
    const light1 = new THREE.PointLight(0x2BBFB0, 2, 200);
    light1.position.set(50, 50, 50);
    scene.add(light1);
    
    const light2 = new THREE.PointLight(0xffffff, 1, 200);
    light2.position.set(-50, -50, -50);
    scene.add(light2);

    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

    // Base tilt
    group.rotation.x = 0.2;

    let mouseX = 0, mouseY = 0;
    
    function animate() {
      requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;

      // Real Global rotation
      globeGrid.rotation.y += 0.002;
      hubs.rotation.y += 0.002;
      core.rotation.y += 0.002;

      // Radar scanner moving up and down the globe based on sine wave
      // The scale also shrinks as it hits the poles to match the sphere perfectly
      const scanY = Math.sin(time * 1.2) * (R - 1);
      scanner.position.y = scanY;
      const scanRadius = Math.sqrt(Math.max(0, R*R - scanY*scanY));
      const scale = scanRadius / R;
      scanner.scale.set(scale, scale, 1);

      // Fast Orbiting Satellites
      orbitGroup.children.forEach((ring, idx) => {
         ring.rotation.z -= 0.01 * (idx + 1);
      });

      // Mouse interactive tilt
      const targetRotX = 0.2 + (mouseY * 0.15);
      const targetRotZ = -(mouseX * 0.15);
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05;
      group.rotation.z += (targetRotZ - group.rotation.z) * 0.05;

      renderer.render(scene, camera);
    }
    animate();

    container.addEventListener('mousemove', e => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });
    
    container.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
    });

    window.addEventListener('resize', () => {
      width = container.clientWidth || 500;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

  }, 100);
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
      
      // Subtle 3D Tilt calculation
      const rotX = -((y - rect.height/2) / rect.height) * 6; // Subtle tilt
      const rotY = ((x - rect.width/2) / rect.width) * 6;

      card.style.transition = 'transform 0.1s ease-out';
      // The subtle pop-out scale to look floating
      card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
      
      // Intensive shadow logic to fake light source
      card.style.boxShadow = `${-rotY * 2}px ${rotX * 2 + 25}px 40px rgba(0,0,0,0.6), 0 0 30px rgba(43,191,176,0.3)`;
      
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

/* ══════════════════════════════════════════
   6. FOOTER 3D ANIMATION — NEURAL FLOOR
══════════════════════════════════════════ */
(function initFooter3D() {
  const container = document.getElementById('footer-3d-bg');
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || 150;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // Deep fog so the grid fades out smoothly
  scene.fog = new THREE.Fog(0x05080f, 5, 40);

  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
  camera.position.set(0, 3, 20);
  camera.lookAt(0, 0, 0);

  // Digital Foundation Floor (Moving Grid)
  const floorGeo = new THREE.PlaneGeometry(80, 50, 40, 25);
  floorGeo.rotateX(-Math.PI / 2);
  
  const floorMat = new THREE.LineBasicMaterial({
     color: 0x2BBFB0,
     transparent: true,
     opacity: 0.35
  });
  
  const floorWave = new THREE.LineSegments(new THREE.WireframeGeometry(floorGeo), floorMat);
  scene.add(floorWave);
  
  // Data particles floating above the floor
  const pointsGeo = new THREE.BufferGeometry();
  const pointsCount = 150;
  const posArray = new Float32Array(pointsCount * 3);
  for(let i=0; i<pointsCount; i++) {
     posArray[i*3] = (Math.random() - 0.5) * 60;
     posArray[i*3+1] = Math.random() * 5;
     posArray[i*3+2] = (Math.random() - 0.5) * 30;
  }
  pointsGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const pointsMat = new THREE.PointsMaterial({ color: 0x7DD9D0, size: 0.3, transparent: true, opacity: 0.8 });
  const points = new THREE.Points(pointsGeo, pointsMat);
  scene.add(points);

  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.015;

    // Animate the terrain wave
    const positions = floorWave.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 2];
      // Create a smooth flowing wave effect
      positions[i + 1] = Math.sin(x * 0.2 + time) * 1.5 + Math.cos(z * 0.2 + time * 0.8) * 1.5;
    }
    floorWave.geometry.attributes.position.needsUpdate = true;
    
    // Slow drift for points
    points.position.z += 0.05;
    if(points.position.z > 15) points.position.z = -15;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || 150;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
})();

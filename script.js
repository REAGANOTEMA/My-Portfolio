// ===============================
// Divine 3D Software Universe Portfolio JS
// Glorifying God & Israel Inspired Colors
// ===============================
document.addEventListener('DOMContentLoaded', () => {

  // ===== Header 3D Hover Animation =====
  const siteTitle = document.getElementById('site-title');
  if (siteTitle) {
    siteTitle.addEventListener('mouseenter', () => {
      siteTitle.style.transform = 'perspective(500px) rotateX(5deg) rotateY(10deg) scale(1.1)';
      siteTitle.style.transition = 'transform 0.3s ease';
    });
    siteTitle.addEventListener('mouseleave', () => {
      siteTitle.style.transform = 'scale(1)';
      siteTitle.style.transition = 'transform 0.5s ease';
    });
  }

  // ===== Hamburger Mobile Menu =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // ===== 3D Canvas Setup =====
  const canvas = document.createElement('canvas');
  canvas.id = 'divine-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = 0;
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // ===== 3D Grid Nodes =====
  class Node {
    constructor() {
      this.x = Math.random() * width - width / 2;
      this.y = Math.random() * height - height / 2;
      this.z = Math.random() * 800 - 400;
      this.size = Math.random() * 3 + 1;
    }
    project() {
      const scale = 800 / (800 + this.z);
      return {
        x: this.x * scale + width / 2,
        y: this.y * scale + height / 2,
        size: this.size * scale
      };
    }
    move() {
      this.z -= 1.2;
      if (this.z < -400) this.z = 400;
    }
  }
  const nodes = Array.from({ length: 250 }, () => new Node());

  // ===== Divine Light Rays =====
  const lightRays = Array.from({ length: 15 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height / 2,
    length: Math.random() * 300 + 100,
    width: Math.random() * 2 + 1,
    alpha: Math.random() * 0.15 + 0.05
  }));

  // ===== Floating 3D Tech Symbols =====
  class Symbol3D {
    constructor() {
      this.x = Math.random() * width - width / 2;
      this.y = Math.random() * height - height / 2;
      this.z = Math.random() * 800 - 400;
      this.char = ['{', '}', '<', '>', '/', ';', '=', '+'][Math.floor(Math.random() * 8)];
      this.color = 'rgba(255, 223, 0, 0.7)';
    }
    project() {
      const scale = 800 / (800 + this.z);
      return { x: this.x * scale + width / 2, y: this.y * scale + height / 2, size: scale * 16 };
    }
    move() {
      this.z -= 0.8;
      if (this.z < -400) this.z = 400;
    }
  }
  const symbols = Array.from({ length: 80 }, () => new Symbol3D());

  // ===== Sparkle Cursor =====
  const sparkleContainer = document.createElement('div');
  sparkleContainer.id = 'sparkle-container';
  sparkleContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:3000';
  document.body.appendChild(sparkleContainer);

  document.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 2; i++) {
      const sparkle = document.createElement('div');
      sparkle.style.cssText = `
        position:absolute;
        width:${3 + Math.random() * 4}px;
        height:${3 + Math.random() * 4}px;
        background:radial-gradient(circle,#fff9c4 0%,#ffeb3b 80%);
        border-radius:50%;
        left:${e.clientX + Math.random() * 10 - 5}px;
        top:${e.clientY + Math.random() * 10 - 5}px;
        opacity:1;
        pointer-events:none;
      `;
      sparkleContainer.appendChild(sparkle);

      const duration = 600 + Math.random() * 400;
      const start = Date.now();
      (function animateSparkle() {
        const elapsed = Date.now() - start;
        if (elapsed < duration) {
          sparkle.style.top = parseFloat(sparkle.style.top) - 0.5 + 'px';
          sparkle.style.opacity = 1 - elapsed / duration;
          requestAnimationFrame(animateSparkle);
        } else {
          sparkleContainer.removeChild(sparkle);
        }
      })();
    }
  });

  // ===== Floating Glowing Orbs =====
  const orbs = Array.from({ length: 10 }, () => {
    const orb = document.createElement('div');
    orb.style.cssText = `
      position:fixed;
      width:${20 + Math.random() * 30}px;
      height:${20 + Math.random() * 30}px;
      border-radius:50%;
      background:rgba(255,223,0,0.2);
      left:${Math.random() * window.innerWidth}px;
      top:${Math.random() * window.innerHeight}px;
      pointer-events:none;
      z-index:100;
    `;
    document.body.appendChild(orb);
    return { el: orb, dx: (Math.random() - 0.5) / 2, dy: (Math.random() - 0.5) / 2 };
  });

  // ===== Shooting Divine Beams =====
  const beams = Array.from({ length: 8 }, () => ({
    x: Math.random() * window.innerWidth,
    y: 0,
    length: 300 + Math.random() * 200,
    width: 2 + Math.random() * 2,
    alpha: 0.05 + Math.random() * 0.1
  }));

  // ===== Twinkling Stars =====
  const stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 2 + 1,
    alpha: Math.random()
  }));

  // ===== Main Animation Loop =====
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Light Rays
    lightRays.forEach(ray => {
      ctx.beginPath();
      ctx.moveTo(ray.x, ray.y);
      ctx.lineTo(ray.x, ray.y + ray.length);
      ctx.strokeStyle = `rgba(255,255,255,${ray.alpha})`;
      ctx.lineWidth = ray.width;
      ctx.stroke();
    });

    // Nodes
    nodes.forEach(node => {
      node.move();
      const p = node.project();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(30,144,255,0.8)';
      ctx.fill();
    });

    // Connecting Nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i].project(), b = nodes[j].project();
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(255,255,255,0.05)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Symbols
    symbols.forEach(sym => {
      sym.move();
      const p = sym.project();
      ctx.font = `${p.size}px Arial`;
      ctx.fillStyle = sym.color;
      ctx.fillText(sym.char, p.x, p.y);
    });

    // Orbs
    orbs.forEach(o => {
      let left = parseFloat(o.el.style.left) + o.dx;
      let top = parseFloat(o.el.style.top) + o.dy;
      if (left < 0 || left > window.innerWidth) o.dx *= -1;
      if (top < 0 || top > window.innerHeight) o.dy *= -1;
      o.el.style.left = left + 'px';
      o.el.style.top = top + 'px';
    });

    // Beams
    beams.forEach(b => {
      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(b.x, b.y + b.length);
      ctx.strokeStyle = `rgba(255,255,224,${b.alpha})`;
      ctx.lineWidth = b.width;
      ctx.stroke();
      b.y += 3;
      if (b.y > window.innerHeight) b.y = -b.length;
    });

    // Stars
    stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.fill();
      s.alpha += (Math.random() - 0.5) * 0.02;
      if (s.alpha > 1) s.alpha = 1;
      if (s.alpha < 0) s.alpha = 0;
    });

    requestAnimationFrame(animate);
  }

  animate();

});

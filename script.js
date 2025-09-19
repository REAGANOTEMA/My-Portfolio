// ===============================
// DIVINE 3D "CITY OF GOD" UNIVERSE FINAL JS
// ===============================
document.addEventListener('DOMContentLoaded', () => {

  // ===== Canvas Setup =====
  const canvas = document.createElement('canvas');
  canvas.id = 'divine-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // ===== 3D Nodes (City Towers) =====
  class Node {
    constructor() {
      this.x = Math.random() * width - width / 2;
      this.y = Math.random() * height - height / 2;
      this.z = Math.random() * 800 - 400;
      this.size = Math.random() * 3 + 1;
    }
    project() {
      const scale = 800 / (800 + this.z);
      return { x: this.x * scale + width / 2, y: this.y * scale + height / 2, size: this.size * scale };
    }
    move() { this.z -= 1.2; if (this.z < -400) this.z = 400; }
  }
  const nodes = Array.from({ length: 250 }, () => new Node());

  // ===== 3D Symbols (Divine Scripts) =====
  class Symbol3D {
    constructor() {
      this.x = Math.random() * width - width / 2;
      this.y = Math.random() * height - height / 2;
      this.z = Math.random() * 800 - 400;
      this.char = ['{', '}', '<', '>', '/', ';', '=', '+'][Math.floor(Math.random() * 8)];
      this.color = 'rgba(255,223,0,0.7)';
    }
    project() {
      const scale = 800 / (800 + this.z);
      return { x: this.x * scale + width / 2, y: this.y * scale + height / 2, size: scale * 16 };
    }
    move() { this.z -= 0.8; if (this.z < -400) this.z = 400; }
  }
  const symbols = Array.from({ length: 80 }, () => new Symbol3D());

  // ===== Stars =====
  const stars = Array.from({ length: 200 }, () => ({ x: Math.random() * width, y: Math.random() * height, r: Math.random() * 2 + 1, alpha: Math.random() }));

  // ===== Beams (City Glows) =====
  const beams = Array.from({ length: 10 }, () => ({ x: Math.random() * width, y: 0, length: 300 + Math.random() * 200, width: 2 + Math.random() * 2, alpha: 0.05 + Math.random() * 0.1 }));

  // ===== Orbs (Floating Light Globes) =====
  const orbs = Array.from({ length: 15 }, () => {
    const orb = document.createElement('div');
    const size = 20 + Math.random() * 30;
    orb.style.cssText = `position:fixed;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,223,0,0.2);left:${Math.random() * width}px;top:${Math.random() * height}px;pointer-events:none;z-index:100`;
    document.body.appendChild(orb);
    return { el: orb, dx: (Math.random() - 0.5) / 2, dy: (Math.random() - 0.5) / 2 };
  });

  // ===== Cosmic Particles (Divine Mist) =====
  const particles = Array.from({ length: 60 }, () => {
    const p = document.createElement('div');
    const col = 200 + Math.floor(Math.random() * 55);
    p.style.cssText = `position:fixed;width:4px;height:4px;border-radius:50%;background:rgba(255,${col},0,0.2);left:${Math.random() * width}px;top:${Math.random() * height}px;pointer-events:none;z-index:50`;
    document.body.appendChild(p);
    return { el: p, dx: (Math.random() - 0.5) / 1.5, dy: (Math.random() - 0.5) / 1.5 };
  });

  // ===== Cursor Sparkles & Trail =====
  const sparkleContainer = document.createElement('div');
  sparkleContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:3000';
  document.body.appendChild(sparkleContainer);

  document.addEventListener('mousemove', e => {
    // sparkles
    for (let i = 0; i < 2; i++) {
      const s = document.createElement('div');
      const size = 3 + Math.random() * 4;
      s.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:radial-gradient(circle,#fff9c4 0%,#ffeb3b 80%);left:${e.clientX + Math.random() * 10 - 5}px;top:${e.clientY + Math.random() * 10 - 5}px;opacity:1;pointer-events:none`;
      sparkleContainer.appendChild(s);
      const start = Date.now();
      const duration = 600 + Math.random() * 400;
      (function anim() {
        const elapsed = Date.now() - start;
        if (elapsed < duration) {
          s.style.top = parseFloat(s.style.top) - 0.5 + 'px';
          s.style.opacity = 1 - elapsed / duration;
          requestAnimationFrame(anim);
        } else s.remove();
      })();
    }
    // trail
    const dot = document.createElement('div');
    const trailSize = 4 + Math.random() * 4;
    dot.style.cssText = `position:fixed;width:${trailSize}px;height:${trailSize}px;border-radius:50%;background:rgba(255,255,200,0.6);left:${e.clientX}px;top:${e.clientY}px;pointer-events:none;z-index:2000`;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 800);
  });

  // ===== Hamburger Menu =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
    window.addEventListener('popstate', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  }

  // ===== Random Energy Bursts =====
  setInterval(() => {
    const burst = document.createElement('div');
    const size = 10 + Math.random() * 30;
    burst.style.cssText = `position:fixed;width:${size}px;height:${size}px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,150,0.8) 0%,rgba(255,223,0,0) 80%);left:${Math.random() * width}px;top:${Math.random() * height}px;pointer-events:none;z-index:100`;
    document.body.appendChild(burst);
    let scale = 1;
    (function expand() {
      scale += 0.05;
      burst.style.transform = `scale(${scale})`;
      burst.style.opacity = 1 - scale / 5;
      if (scale < 5) requestAnimationFrame(expand);
      else burst.remove();
    })();
  }, 1200);

  // ===== Main Animation Loop =====
  let angle = 0;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    angle += 0.0005;

    // stars
    stars.forEach(s => {
      const x = s.x + Math.sin(angle + s.y / height) * 20;
      const y = s.y + Math.cos(angle + s.x / width) * 20;
      ctx.beginPath();
      ctx.arc(x, y, s.r * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.shadowColor = 'rgba(255,255,255,0.4)';
      ctx.shadowBlur = 4;
      ctx.fill();
      s.alpha += (Math.random() - 0.5) * 0.02;
      if (s.alpha > 1) s.alpha = 1;
      if (s.alpha < 0) s.alpha = 0;
    });

    // nodes & lines
    nodes.forEach((node, i) => {
      node.move();
      const p = node.project();
      const xRot = Math.cos(angle) * (p.x - width / 2) - Math.sin(angle) * (p.y - height / 2) + width / 2;
      const yRot = Math.sin(angle) * (p.x - width / 2) + Math.cos(angle) * (p.y - height / 2) + height / 2;
      ctx.beginPath();
      ctx.arc(xRot, yRot, p.size * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(30,144,255,0.9)';
      ctx.shadowColor = 'rgba(30,144,255,0.7)';
      ctx.shadowBlur = 6;
      ctx.fill();
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j].project();
        const bxRot = Math.cos(angle) * (b.x - width / 2) - Math.sin(angle) * (b.y - height / 2) + width / 2;
        const byRot = Math.sin(angle) * (b.x - width / 2) + Math.cos(angle) * (b.y - height / 2) + height / 2;
        const dist = Math.hypot(xRot - bxRot, yRot - byRot);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(xRot, yRot);
          ctx.lineTo(bxRot, byRot);
          ctx.strokeStyle = 'rgba(255,255,255,0.07)';
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
    });

    // symbols
    symbols.forEach(sym => {
      sym.move();
      const p = sym.project();
      ctx.save();
      ctx.translate(width / 2, height / 2);
      const xRot = Math.cos(angle) * (p.x - width / 2) - Math.sin(angle) * (p.y - height / 2);
      const yRot = Math.sin(angle) * (p.x - width / 2) + Math.cos(angle) * (p.y - height / 2);
      ctx.font = `${p.size * 1.3}px Arial`;
      ctx.fillStyle = sym.color;
      ctx.shadowColor = 'rgba(255,223,0,0.6)';
      ctx.shadowBlur = 8;
      ctx.fillText(sym.char, xRot, yRot);
      ctx.restore();
    });

    // beams
    beams.forEach(b => {
      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(b.x, b.y + b.length);
      ctx.strokeStyle = `rgba(255,255,224,${b.alpha})`;
      ctx.lineWidth = b.width;
      ctx.shadowColor = 'rgba(255,255,224,0.4)';
      ctx.shadowBlur = 8;
      ctx.stroke();
      b.y += 3; if (b.y > height) b.y = -b.length;
    });

    // orbs
    orbs.forEach(o => {
      let left = parseFloat(o.el.style.left) + o.dx;
      let top = parseFloat(o.el.style.top) + o.dy;
      if (left < 0 || left > width) o.dx *= -1;
      if (top < 0 || top > height) o.dy *= -1;
      o.el.style.left = left + 'px';
      o.el.style.top = top + 'px';
      o.el.style.boxShadow = '0 0 20px rgba(255,223,0,0.6)';
    });

    // particles
    particles.forEach(p => {
      let left = parseFloat(p.el.style.left) + p.dx;
      let top = parseFloat(p.el.style.top) + p.dy;
      if (left < 0 || left > width) p.dx *= -1;
      if (top < 0 || top > height) p.dy *= -1;
      p.el.style.left = left + 'px';
      p.el.style.top = top + 'px';
    });

    requestAnimationFrame(animate);
  }

  animate();

});

// ===============================
// CLEAN 3D "CITY OF GOD" UNIVERSE JS
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
      this.size = Math.random() * 2 + 1; // smaller, subtle
    }
    project() {
      const scale = 800 / (800 + this.z);
      return { x: this.x * scale + width / 2, y: this.y * scale + height / 2, size: this.size * scale };
    }
    move() { this.z -= 1.2; if (this.z < -400) this.z = 400; }
  }
  const nodes = Array.from({ length: 200 }, () => new Node()); // fewer for clean look

  // ===== 3D Symbols (Subtle Scripts) =====
  class Symbol3D {
    constructor() {
      this.x = Math.random() * width - width / 2;
      this.y = Math.random() * height - height / 2;
      this.z = Math.random() * 800 - 400;
      this.char = ['{', '}', '<', '>', '/', ';', '=', '+'][Math.floor(Math.random() * 8)];
      this.color = 'rgba(255, 223, 0, 0.5)'; // toned down
    }
    project() {
      const scale = 800 / (800 + this.z);
      return { x: this.x * scale + width / 2, y: this.y * scale + height / 2, size: scale * 14 };
    }
    move() { this.z -= 0.8; if (this.z < -400) this.z = 400; }
  }
  const symbols = Array.from({ length: 60 }, () => new Symbol3D());

  // ===== Stars (Soft Twinkle) =====
  const stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.5 + 0.5,
    alpha: Math.random() * 0.8
  }));

  // ===== Beams (Soft City Glows) =====
  const beams = Array.from({ length: 6 }, () => ({
    x: Math.random() * width,
    y: 0,
    length: 200 + Math.random() * 150,
    width: 1 + Math.random(),
    alpha: 0.03 + Math.random() * 0.05 // subtle
  }));

  // ===== Orbs (Gentle Floating Lights) =====
  const orbs = Array.from({ length: 10 }, () => {
    const orb = document.createElement('div');
    const size = 15 + Math.random() * 20;
    orb.style.cssText = `position:fixed;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,223,0,0.1);left:${Math.random() * width}px;top:${Math.random() * height}px;pointer-events:none;z-index:50`;
    document.body.appendChild(orb);
    return { el: orb, dx: (Math.random() - 0.5) / 3, dy: (Math.random() - 0.5) / 3 };
  });

  // ===== Particles (Subtle Cosmic Dust) =====
  const particles = Array.from({ length: 40 }, () => {
    const p = document.createElement('div');
    const col = 200 + Math.floor(Math.random() * 55);
    p.style.cssText = `position:fixed;width:3px;height:3px;border-radius:50%;background:rgba(255,${col},0,0.1);left:${Math.random() * width}px;top:${Math.random() * height}px;pointer-events:none;z-index:40`;
    document.body.appendChild(p);
    return { el: p, dx: (Math.random() - 0.5) / 2, dy: (Math.random() - 0.5) / 2 };
  });

  // ===== Cursor Trail =====
  const sparkleContainer = document.createElement('div');
  sparkleContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:2000';
  document.body.appendChild(sparkleContainer);

  document.addEventListener('mousemove', e => {
    const dot = document.createElement('div');
    const trailSize = 3 + Math.random() * 3;
    dot.style.cssText = `position:fixed;width:${trailSize}px;height:${trailSize}px;border-radius:50%;background:rgba(255,255,200,0.4);left:${e.clientX}px;top:${e.clientY}px;pointer-events:none;z-index:2000`;
    sparkleContainer.appendChild(dot);
    setTimeout(() => dot.remove(), 600);
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

  // ===== Minimal Energy Bursts =====
  setInterval(() => {
    const burst = document.createElement('div');
    const size = 8 + Math.random() * 15;
    burst.style.cssText = `position:fixed;width:${size}px;height:${size}px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,150,0.3) 0%,rgba(255,223,0,0) 80%);left:${Math.random() * width}px;top:${Math.random() * height}px;pointer-events:none;z-index:50`;
    document.body.appendChild(burst);
    let scale = 1;
    (function expand() {
      scale += 0.03;
      burst.style.transform = `scale(${scale})`;
      burst.style.opacity = 1 - scale / 5;
      if (scale < 5) requestAnimationFrame(expand);
      else burst.remove();
    })();
  }, 1500);

  // ===== Main Animation Loop =====
  let angle = 0;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    angle += 0.0003;

    // stars
    stars.forEach(s => {
      const x = s.x + Math.sin(angle + s.y / height) * 10;
      const y = s.y + Math.cos(angle + s.x / width) * 10;
      ctx.beginPath();
      ctx.arc(x, y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.shadowBlur = 0;
      ctx.fill();
      s.alpha += (Math.random() - 0.5) * 0.01;
      if (s.alpha > 0.8) s.alpha = 0.8;
      if (s.alpha < 0.2) s.alpha = 0.2;
    });

    // nodes & lines
    nodes.forEach((node, i) => {
      node.move();
      const p = node.project();
      const xRot = Math.cos(angle) * (p.x - width / 2) - Math.sin(angle) * (p.y - height / 2) + width / 2;
      const yRot = Math.sin(angle) * (p.x - width / 2) + Math.cos(angle) * (p.y - height / 2) + height / 2;
      ctx.beginPath();
      ctx.arc(xRot, yRot, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(30,144,255,0.5)';
      ctx.fill();
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j].project();
        const bxRot = Math.cos(angle) * (b.x - width / 2) - Math.sin(angle) * (b.y - height / 2) + width / 2;
        const byRot = Math.sin(angle) * (b.x - width / 2) + Math.cos(angle) * (b.y - height / 2) + height / 2;
        const dist = Math.hypot(xRot - bxRot, yRot - byRot);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(xRot, yRot);
          ctx.lineTo(bxRot, byRot);
          ctx.strokeStyle = 'rgba(255,255,255,0.05)';
          ctx.lineWidth = 0.5;
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
      ctx.font = `${p.size}px Arial`;
      ctx.fillStyle = sym.color;
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
      ctx.stroke();
      b.y += 1.5; if (b.y > height) b.y = -b.length;
    });

    // orbs
    orbs.forEach(o => {
      let left = parseFloat(o.el.style.left) + o.dx;
      let top = parseFloat(o.el.style.top) + o.dy;
      if (left < 0 || left > width) o.dx *= -1;
      if (top < 0 || top > height) o.dy *= -1;
      o.el.style.left = left + 'px';
      o.el.style.top = top + 'px';
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

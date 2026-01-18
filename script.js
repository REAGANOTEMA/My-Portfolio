// ===============================
// FINAL CLEAN 3D "CITY OF GOD" BACKGROUND + UX
// Fully Integrated: Canvas, Nodes, Symbols, Stars, Beams, Orbs, Particles, Avatar, Cursor Glow
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
      this.x = Math.random() * width - width/2;
      this.y = Math.random() * height - height/2;
      this.z = Math.random() * 800 - 400;
      this.size = Math.random() * 2 + 1;
    }
    project() {
      const scale = 800 / (800 + this.z);
      return { x: this.x*scale + width/2, y: this.y*scale + height/2, size: this.size*scale };
    }
    move() { this.z -= 1.2; if (this.z < -400) this.z = 400; }
  }
  const nodes = Array.from({length:200}, () => new Node());

  // ===== 3D Symbols (Subtle Scripts) =====
  class Symbol3D {
    constructor() {
      this.x = Math.random()*width - width/2;
      this.y = Math.random()*height - height/2;
      this.z = Math.random()*800 - 400;
      this.char = ['{','}','<','>','/',';','=','+'][Math.floor(Math.random()*8)];
      this.color = 'rgba(255,223,0,0.5)';
    }
    project() {
      const scale = 800 / (800 + this.z);
      return { x: this.x*scale + width/2, y: this.y*scale + height/2, size: scale*14 };
    }
    move() { this.z -= 0.8; if(this.z < -400) this.z = 400; }
  }
  const symbols = Array.from({length:60}, () => new Symbol3D());

  // ===== Stars =====
  const stars = Array.from({length:150}, () => ({
    x: Math.random()*width,
    y: Math.random()*height,
    r: Math.random()*1.5 + 0.5,
    alpha: Math.random()*0.8
  }));

  // ===== Beams =====
  const beams = Array.from({length:6}, () => ({
    x: Math.random()*width,
    y: 0,
    length: 200 + Math.random()*150,
    width: 1 + Math.random(),
    alpha: 0.03 + Math.random()*0.05
  }));

  // ===== Orbs =====
  const orbs = Array.from({length:10}, () => {
    const orb = document.createElement('div');
    const size = 15 + Math.random()*20;
    orb.style.cssText = `position:fixed;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,223,0,0.1);left:${Math.random()*width}px;top:${Math.random()*height}px;pointer-events:none;z-index:0`;
    document.body.appendChild(orb);
    return { el: orb, dx: (Math.random()-0.5)/3, dy: (Math.random()-0.5)/3 };
  });

  // ===== Particles =====
  const particles = Array.from({length:40}, () => {
    const p = document.createElement('div');
    const col = 200 + Math.floor(Math.random()*55);
    p.style.cssText = `position:fixed;width:3px;height:3px;border-radius:50%;background:rgba(255,${col},0,0.1);left:${Math.random()*width}px;top:${Math.random()*height}px;pointer-events:none;z-index:0`;
    document.body.appendChild(p);
    return { el: p, dx: (Math.random()-0.5)/2, dy: (Math.random()-0.5)/2 };
  });

  // ===== UX: Cursor Glow =====
  const uxContainer = document.createElement('div');
  uxContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1';
  document.body.appendChild(uxContainer);
  document.addEventListener('mousemove', e => {
    const glow = document.createElement('div');
    const size = 10 + Math.random()*10;
    glow.style.cssText = `position:fixed;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,255,150,0.3);left:${e.clientX - size/2}px;top:${e.clientY - size/2}px;pointer-events:none;z-index:1;transition:0.2s`;
    uxContainer.appendChild(glow);
    setTimeout(() => glow.remove(), 400);
  });

  // ===== UX: Section Highlight =====
  document.querySelectorAll('section, article, div.content').forEach(el => {
    el.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease';
    el.addEventListener('mouseenter', () => {
      el.style.boxShadow = '0 0 40px rgba(255,223,0,0.3)';
      el.style.transform = 'scale(1.02)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.boxShadow = 'none';
      el.style.transform = 'scale(1)';
    });
  });

  // ===== Main Animation Loop =====
  let angle = 0;
  function animate() {
    ctx.clearRect(0,0,width,height);
    angle += 0.0005;

    // Stars
    stars.forEach(s => {
      const x = s.x + Math.sin(angle + s.y/height)*10;
      const y = s.y + Math.cos(angle + s.x/width)*10;
      ctx.beginPath();
      ctx.arc(x,y,s.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.fill();
      s.alpha += (Math.random()-0.5)*0.01;
      s.alpha = Math.min(Math.max(s.alpha,0.2),0.8);
    });

    // Nodes & lines
    nodes.forEach((node,i)=>{
      node.move();
      const p = node.project();
      const xRot = Math.cos(angle)*(p.x - width/2) - Math.sin(angle)*(p.y - height/2) + width/2;
      const yRot = Math.sin(angle)*(p.x - width/2) + Math.cos(angle)*(p.y - height/2) + height/2;
      ctx.beginPath();
      ctx.arc(xRot,yRot,p.size,0,Math.PI*2);
      ctx.fillStyle = 'rgba(30,144,255,0.5)';
      ctx.fill();
      for(let j=i+1;j<nodes.length;j++){
        const b = nodes[j].project();
        const bxRot = Math.cos(angle)*(b.x - width/2) - Math.sin(angle)*(b.y - height/2) + width/2;
        const byRot = Math.sin(angle)*(b.x - width/2) + Math.cos(angle)*(b.y - height/2) + height/2;
        if(Math.hypot(xRot-bxRot,yRot-byRot)<100){
          ctx.beginPath();
          ctx.moveTo(xRot,yRot);
          ctx.lineTo(bxRot,byRot);
          ctx.strokeStyle = 'rgba(255,255,255,0.05)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    // Symbols
    symbols.forEach(sym=>{
      sym.move();
      const p = sym.project();
      ctx.save();
      ctx.translate(width/2,height/2);
      const xRot = Math.cos(angle)*(p.x-width/2) - Math.sin(angle)*(p.y-height/2);
      const yRot = Math.sin(angle)*(p.x-width/2) + Math.cos(angle)*(p.y-height/2);
      ctx.font = `${p.size}px Arial`;
      ctx.fillStyle = sym.color;
      ctx.fillText(sym.char,xRot,yRot);
      ctx.restore();
    });

    // Beams
    beams.forEach(b=>{
      ctx.beginPath();
      ctx.moveTo(b.x,b.y);
      ctx.lineTo(b.x,b.y+b.length);
      ctx.strokeStyle = `rgba(255,255,224,${b.alpha})`;
      ctx.lineWidth = b.width;
      ctx.stroke();
      b.y += 1.5; if(b.y>height) b.y=-b.length;
    });

    // Orbs
    orbs.forEach(o=>{
      let left = parseFloat(o.el.style.left)+o.dx;
      let top = parseFloat(o.el.style.top)+o.dy;
      if(left<0||left>width) o.dx*=-1;
      if(top<0||top>height) o.dy*=-1;
      o.el.style.left = left+'px';
      o.el.style.top = top+'px';
    });

    // Particles
    particles.forEach(p=>{
      let left = parseFloat(p.el.style.left)+p.dx;
      let top = parseFloat(p.el.style.top)+p.dy;
      if(left<0||left>width) p.dx*=-1;
      if(top<0||top>height) p.dy*=-1;
      p.el.style.left = left+'px';
      p.el.style.top = top+'px';
    });

    requestAnimationFrame(animate);
  }
  animate();

  // ===== Luxury Professional Avatar =====
  const avatar = document.createElement('img');
  avatar.src = 'https://api.dicebear.com/7.x/personas/png?seed=executive&backgroundColor=f5f5f5';
  avatar.alt = 'Professional Avatar';
  avatar.style.cssText = `
    position: fixed;
    right: 40px;
    bottom: 40px;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    z-index: 2;
    box-shadow: 0 20px 50px rgba(0,0,0,0.35),
                inset 0 0 0 2px rgba(255,223,0,0.4);
    background: radial-gradient(circle at top, #fff, #eaeaea);
    animation: avatarFloat 6s ease-in-out infinite;
    pointer-events: none;
  `;
  document.body.appendChild(avatar);

  const avatarStyle = document.createElement('style');
  avatarStyle.innerHTML = `
    @keyframes avatarFloat {
      0%   { transform: translateY(0px); }
      50%  { transform: translateY(-12px); }
      100% { transform: translateY(0px); }
    }
  `;
  document.head.appendChild(avatarStyle);

});

/* =====================================================
   FINAL PROFESSIONAL 3D PORTFOLIO JS
   MAGICAL 3D BACKGROUND + SPEAKING AVATAR + UX
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= CANVAS SETUP ================= */
  const canvas = document.createElement("canvas");
  canvas.id = "divine-canvas";
  canvas.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;";
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d");
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  window.addEventListener("resize", () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });

  /* ================= MAGICAL STAR FIELD ================= */
  const stars = Array.from({ length: 200 }, () => ({
    x: Math.random()*w, y: Math.random()*h, r: Math.random()*2+0.5, a: Math.random()*0.7+0.3
  }));

  /* ================= 3D NODES + CONNECTIONS ================= */
  class Node { constructor(){ this.x=Math.random()*w-w/2; this.y=Math.random()*h-h/2; this.z=Math.random()*800-400; }
    move(){ this.z-=1.2; if(this.z<-400)this.z=400; }
    project(){ const s=800/(800+this.z); return {x:this.x*s+w/2, y:this.y*s+h/2, s}; }
  }
  const nodes = Array.from({length:220},()=>new Node());

  /* ================= SYMBOLS ================= */
  const chars=["{","}","<",">","/",";","+","="];
  class Symbol3D { constructor(){ this.x=Math.random()*w-w/2; this.y=Math.random()*h-h/2; this.z=Math.random()*800-400; this.char=chars[Math.floor(Math.random()*chars.length)]; }
    move(){ this.z-=0.8; if(this.z<-400)this.z=400; }
    project(){ const s=800/(800+this.z); return {x:this.x*s+w/2, y:this.y*s+h/2, size:s*14}; }
  }
  const symbols=Array.from({length:80},()=>new Symbol3D());

  /* ================= BEAMS ================= */
  const beams = Array.from({length:8},()=>({x:Math.random()*w,y:Math.random()*-h,len:150+Math.random()*250,a:0.05}));

  /* ================= ORBS & PARTICLES ================= */
  const orbs=[], particles=[];
  for(let i=0;i<12;i++){const el=document.createElement("div"); const s=16+Math.random()*20;
    el.style.cssText=`position:fixed;width:${s}px;height:${s}px;border-radius:50%;background:rgba(255,223,0,0.12);left:${Math.random()*w}px;top:${Math.random()*h}px;pointer-events:none;z-index:0;`;
    document.body.appendChild(el); orbs.push({el,dx:(Math.random()-0.5)*0.3,dy:(Math.random()-0.5)*0.3});
  }
  for(let i=0;i<50;i++){const el=document.createElement("div");
    el.style.cssText=`position:fixed;width:3px;height:3px;border-radius:50%;background:rgba(255,200,80,0.15);left:${Math.random()*w}px;top:${Math.random()*h}px;pointer-events:none;z-index:0;`;
    document.body.appendChild(el); particles.push({el,dx:(Math.random()-0.5)*0.4,dy:(Math.random()-0.5)*0.4});
  }

  /* ================= CURSOR GLOW ================= */
  document.addEventListener("mousemove",e=>{const g=document.createElement("div"); g.style.cssText=`position:fixed;width:16px;height:16px;border-radius:50%;background:rgba(255,255,180,0.35);left:${e.clientX-8}px;top:${e.clientY-8}px;pointer-events:none;z-index:1;transition:0.4s;`; document.body.appendChild(g); setTimeout(()=>g.remove(),400); });

  /* ================= MAIN ANIMATION LOOP ================= */
  function animate(){
    ctx.clearRect(0,0,w,h);
    stars.forEach(s=>{ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${s.a})`; ctx.fill(); });
    nodes.forEach((n,i)=>{n.move(); const p=n.project(); ctx.beginPath(); ctx.arc(p.x,p.y,p.s*2,0,Math.PI*2); ctx.fillStyle="rgba(80,160,255,0.45)"; ctx.fill();
      for(let j=i+1;j<nodes.length;j++){const q=nodes[j].project(); if(Math.hypot(p.x-q.x,p.y-q.y)<100){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle="rgba(255,255,255,0.05)";ctx.stroke();}}
    });
    symbols.forEach(s=>{s.move(); const p=s.project(); ctx.font=`${p.size}px monospace`; ctx.fillStyle="rgba(255,223,120,0.5)"; ctx.fillText(s.char,p.x,p.y);});
    beams.forEach(b=>{ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.lineTo(b.x,b.y+b.len);ctx.strokeStyle=`rgba(255,255,200,${b.a})`;ctx.stroke(); b.y+=1.3; if(b.y>h) b.y=-b.len;});
    [...orbs,...particles].forEach(o=>{let x=parseFloat(o.el.style.left)+o.dx; let y=parseFloat(o.el.style.top)+o.dy; if(x<0||x>w)o.dx*=-1; if(y<0||y>h)o.dy*=-1; o.el.style.left=x+"px"; o.el.style.top=y+"px";});
    requestAnimationFrame(animate);
  }
  animate();

  /* ================= SPEAKING AVATAR ================= */
  const avatar=document.createElement("div");
  avatar.id="avatar-guide";
  avatar.innerHTML=`<div class="avatar-eyes"><div class="eye left"></div><div class="eye right"></div></div><div class="avatar-mouth"></div>`;
  document.body.appendChild(avatar);

  const style=document.createElement("style");
  style.textContent=`
    #avatar-guide {
      position:fixed;right:32px;bottom:32px;width:100px;height:100px;border-radius:50%;
      background:#fff url('https://api.dicebear.com/7.x/personas/png?seed=executive') center/cover no-repeat;
      box-shadow:0 18px 40px rgba(0,0,0,.35), inset 0 0 0 2px rgba(255,223,0,.4);
      z-index:2000; display:flex;flex-direction:column;align-items:center;justify-content:flex-end;overflow:hidden; animation:avatarFloat 6s ease-in-out infinite;
    }
    @keyframes avatarFloat{0%{transform:translateY(0)}50%{transform:translateY(-12px)}100%{transform:translateY(0)}}
    .avatar-eyes{position:absolute;top:28%;width:60%;display:flex;justify-content:space-between;}
    .eye{width:12px;height:12px;background:#222;border-radius:50%;animation:blink 4s infinite;}
    @keyframes blink{0%,90%,100%{transform:scaleY(1);}92%,96%{transform:scaleY(0.1);}}
    .avatar-mouth{position:absolute;bottom:18%;width:40%;height:6px;background:#222;border-radius:50%;transform-origin:center; transform:scaleY(0.2);}
  `;
  document.head.appendChild(style);

  const messages=[
    "Hi! I'm Reagan Otema, a highly skilled web developer!",
    "I create modern, professional, and stunning websites.",
    "Detail-oriented and tech-ready, I deliver top-notch solutions.",
    "I collaborate seamlessly and bring projects to life quickly.",
    "Hire me, and I’ll make your project shine with excellence!"
  ];
  let msgIndex=0;

  function speak(){
    const mouth=avatar.querySelector(".avatar-mouth");
    const msg=messages[msgIndex];
    const utter=new SpeechSynthesisUtterance(msg);
    utter.lang="en-US"; utter.volume=1; utter.rate=1; utter.pitch=1.2;
    window.speechSynthesis.speak(utter);

    const mouthAnim=setInterval(()=>{
      const scale=Math.random(); mouth.style.transform=`scaleY(${0.2 + scale*0.8})`;
    },80);

    utter.onend=()=>{
      clearInterval(mouthAnim); mouth.style.transform="scaleY(0.2)";
      msgIndex=(msgIndex+1)%messages.length;
      setTimeout(speak,800);
    };
  }
  speak();

});
/* =====================================================
   MAGICAL 3D ENHANCED BACKGROUND - HD + DEPTH + LIGHTING
   ===================================================== */

(function(){
  const canvas = document.getElementById('divine-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });

  // Floating colorful orbs
  const colors = ['#ff7f50','#ffdf00','#00ffff','#ff00ff','#00ff7f','#7f00ff','#ffffff'];
  const magicalOrbs = Array.from({length:40},()=>{
    return {
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*6 + 2,
      dx: (Math.random()-0.5)*1.2,
      dy: (Math.random()-0.5)*1.2,
      color: colors[Math.floor(Math.random()*colors.length)],
      alpha: Math.random()*0.7+0.3
    }
  });

  // Light beams
  const lightBeams = Array.from({length:6},()=>{
    return {x:Math.random()*w, y:Math.random()*-h, len:200+Math.random()*300, alpha:Math.random()*0.2+0.05, dx:0, dy:1.5+Math.random()*1};
  });

  function magicalAnimate(){
    ctx.clearRect(0,0,w,h);

    // Background gradient for magical feel
    const grad = ctx.createLinearGradient(0,0,w,h);
    grad.addColorStop(0,'#0a0a1a');
    grad.addColorStop(0.5,'#050525');
    grad.addColorStop(1,'#0a0a1a');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,w,h);

    // Floating orbs
    magicalOrbs.forEach(o=>{
      ctx.beginPath();
      ctx.arc(o.x,o.y,o.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(${parseInt(o.color.slice(1,3),16)},${parseInt(o.color.slice(3,5),16)},${parseInt(o.color.slice(5,7),16)},${o.alpha})`;
      ctx.shadowColor = o.color;
      ctx.shadowBlur = 16;
      ctx.fill();
      o.x += o.dx; o.y += o.dy;
      if(o.x<0||o.x>w)o.dx*=-1;
      if(o.y<0||o.y>h)o.dy*=-1;
    });

    // Light beams
    lightBeams.forEach(b=>{
      ctx.beginPath();
      ctx.moveTo(b.x,b.y);
      ctx.lineTo(b.x,b.y+b.len);
      ctx.strokeStyle = `rgba(255,255,255,${b.alpha})`;
      ctx.shadowColor = 'rgba(255,255,255,0.6)';
      ctx.shadowBlur = 20;
      ctx.lineWidth = 2;
      ctx.stroke();
      b.y += b.dy;
      if(b.y > h) b.y = -b.len;
    });

    requestAnimationFrame(magicalAnimate);
  }
  magicalAnimate();

})();

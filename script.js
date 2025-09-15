// ===============================
// Final Responsive Portfolio JavaScript
// Rain, Thunder, Flower Rain & Cartoon Character
// ===============================

document.addEventListener('DOMContentLoaded', () => {

  /* ================= Header 3D Hover Animation ================= */
  const siteTitle = document.getElementById('site-title');
  if (siteTitle) {
    const animateTitle = () => {
      siteTitle.style.transition = 'transform 0.6s ease-out';
      siteTitle.style.transform = 'scale3d(1.05,1.05,1) translateZ(10px)';
      setTimeout(() => siteTitle.style.transform = 'scale3d(1,1,1) translateZ(0)', 800);
    };

    siteTitle.addEventListener('mouseenter', () => {
      siteTitle.style.transition = 'transform 0.3s ease';
      siteTitle.style.transform = 'perspective(500px) rotateX(5deg) rotateY(10deg) scale3d(1.1,1.1,1.1)';
    });

    siteTitle.addEventListener('mouseleave', () => {
      siteTitle.style.transition = 'transform 0.5s ease';
      siteTitle.style.transform = 'scale3d(1,1,1) translateZ(0)';
    });

    animateTitle();
  }

  /* ================= Hamburger Mobile Menu ================= */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  /* ================= Rain Effect ================= */
  const rainCanvas = document.getElementById('rain-canvas');
  if (rainCanvas) {
    const ctx = rainCanvas.getContext('2d');
    let width = rainCanvas.width = window.innerWidth;
    let height = rainCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = rainCanvas.width = window.innerWidth;
      height = rainCanvas.height = window.innerHeight;
    });

    class Raindrop {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.length = Math.random() * 20 + 10;
        this.speed = Math.random() * 4 + 4;
      }
      fall() {
        this.y += this.speed;
        if (this.y > height) {
          this.y = -this.length;
          this.x = Math.random() * width;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.strokeStyle = 'rgba(30,144,255,0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    const raindrops = Array.from({length: 180}, () => new Raindrop());

    function animateRain() {
      ctx.clearRect(0, 0, width, height);
      raindrops.forEach(drop => { drop.fall(); drop.draw(); });
      requestAnimationFrame(animateRain);
    }
    animateRain();

    // Thunder Flash
    setInterval(() => {
      document.body.classList.add('flash');
      setTimeout(() => document.body.classList.remove('flash'), 150);
    }, 4000);
  }

  /* ================= Flower Rain ================= */
  const flowerCanvas = document.getElementById('flower-canvas');
  if (flowerCanvas) {
    const ctx2 = flowerCanvas.getContext('2d');
    flowerCanvas.width = window.innerWidth;
    flowerCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      flowerCanvas.width = window.innerWidth;
      flowerCanvas.height = window.innerHeight;
    });

    const colors = ['#ff6b6b', '#6bcB77', '#4d96ff', '#c77dff', '#ff7fbf'];
    class Flower {
      constructor() {
        this.x = Math.random() * flowerCanvas.width;
        this.y = Math.random() * -flowerCanvas.height;
        this.size = Math.random() * 15 + 10;
        this.speed = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random()*colors.length)];
        this.angle = Math.random() * 2*Math.PI;
        this.angularSpeed = (Math.random()-0.5)*0.05;
      }
      update() {
        this.y += this.speed;
        this.angle += this.angularSpeed;
        if (this.y > flowerCanvas.height + this.size) {
          this.y = -this.size;
          this.x = Math.random() * flowerCanvas.width;
        }
      }
      draw() {
        ctx2.save();
        ctx2.translate(this.x, this.y);
        ctx2.rotate(this.angle);
        ctx2.fillStyle = this.color;
        ctx2.beginPath();
        for (let i=0;i<5;i++){
          ctx2.lineTo(0,this.size);
          ctx2.rotate((Math.PI*2)/5);
        }
        ctx2.closePath();
        ctx2.fill();
        ctx2.restore();
      }
    }

    const flowers = Array.from({length:80}, () => new Flower());

    function animateFlowers() {
      ctx2.clearRect(0,0,flowerCanvas.width,flowerCanvas.height);
      flowers.forEach(f => { f.update(); f.draw(); });
      requestAnimationFrame(animateFlowers);
    }
    animateFlowers();
  }

  /* ================= Cartoon Character ================= */
  const character = document.getElementById('cartoon-character');
  if (character) {
    setInterval(() => {
      character.style.animation = 'none';
      void character.offsetWidth;
      character.style.animation = 'moveCharacter 18s linear forwards';
    }, 3000);
  }

  /* ================= Dynamic Color Change on Click ================= */
  document.addEventListener('click', () => {
    const allElements = document.querySelectorAll('body, header, section, .skill-category, .project-card, .download-card, footer, .contact-form button');
    const colorsDynamic = ['#ff6b6b', '#6bcB77', '#4d96ff', '#c77dff', '#ff7fbf'];

    const randomColor = () => colorsDynamic[Math.floor(Math.random()*colorsDynamic.length)];

    allElements.forEach(el => {
      const bg = `linear-gradient(135deg, ${randomColor()}, ${randomColor()})`;
      el.style.background = bg;
      el.style.color = randomColor();
      el.style.boxShadow = `0 8px 20px ${randomColor()}50`;
    });

    if(flowers){
      flowers.forEach(f => f.color = randomColor());
    }
  });

});

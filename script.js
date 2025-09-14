// ===============================
// Final Responsive Portfolio JavaScript
// With Rain, Thunder & Cartoon Character
// ===============================

/**
 * Animate header title with subtle 3D scale and tilt.
 */
window.addEventListener('DOMContentLoaded', () => {
  const siteTitle = document.getElementById('site-title');
  if (!siteTitle) return;

  function animateTitle() {
    siteTitle.style.transition = 'transform 0.6s ease-out';
    siteTitle.style.transform = 'scale3d(1.05, 1.05, 1) translateZ(10px)';

    setTimeout(() => {
      siteTitle.style.transform = 'scale3d(1, 1, 1) translateZ(0)';
    }, 800);
  }

  siteTitle.addEventListener('mouseenter', () => {
    siteTitle.style.transition = 'transform 0.3s ease';
    siteTitle.style.transform =
      'perspective(500px) rotateX(5deg) rotateY(10deg) scale3d(1.1, 1.1, 1.1)';
  });

  siteTitle.addEventListener('mouseleave', () => {
    siteTitle.style.transition = 'transform 0.5s ease';
    siteTitle.style.transform = 'scale3d(1, 1, 1) translateZ(0)';
  });

  animateTitle();
});

/**
 * Gallery 3D hover effect.
 */
window.addEventListener('DOMContentLoaded', () => {
  const galleryFigures = document.querySelectorAll('.gallery figure');

  galleryFigures.forEach((figure) => {
    figure.style.transition = 'transform 0.35s ease, box-shadow 0.35s ease';

    figure.addEventListener('mouseenter', () => {
      figure.style.transform = 'scale(1.05) translateZ(20px)';
      figure.style.boxShadow = '0 15px 25px rgba(139, 0, 0, 0.35)';
    });

    figure.addEventListener('mousemove', (e) => {
      const rect = figure.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * 8;

      figure.style.transform = `scale(1.07) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(25px)`;
    });

    figure.addEventListener('mouseleave', () => {
      figure.style.transform = 'scale(1) rotateX(0) rotateY(0) translateZ(0)';
      figure.style.boxShadow = '0 10px 20px rgba(139, 0, 0, 0.15)';
    });
  });
});

/**
 * Hamburger menu toggle for mobile navigation.
 */
window.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
});

/**
 * Rain + Thunder Effect
 */
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('rain-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Raindrop class
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
      ctx.strokeStyle = 'rgba(30, 144, 255, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  const raindrops = [];
  for (let i = 0; i < 180; i++) {
    raindrops.push(new Raindrop());
  }

  function animateRain() {
    ctx.clearRect(0, 0, width, height);
    raindrops.forEach((drop) => {
      drop.fall();
      drop.draw();
    });
    requestAnimationFrame(animateRain);
  }
  animateRain();

  // Thunder effect every 4s
  setInterval(() => {
    document.body.classList.add('flash');
    setTimeout(() => {
      document.body.classList.remove('flash');
    }, 150);
  }, 4000);
});

/**
 * Cartoon character pointer movement
 */
window.addEventListener('DOMContentLoaded', () => {
  const character = document.getElementById('cartoon-character');
  if (!character) return;

  // Re-trigger animation every 3 seconds to keep looping from start
  setInterval(() => {
    character.style.animation = 'none';
    void character.offsetWidth; // trigger reflow
    character.style.animation = 'moveCharacter 18s linear forwards';
  }, 3000);
});

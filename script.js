/**
 * Animate header title with subtle 3D scale on load
 * and add slight tilt effect on hover.
 */
const siteTitle = document.getElementById('site-title');

function animateTitle() {
  siteTitle.style.transition = 'transform 0.6s ease-out';
  siteTitle.style.transform = 'scale3d(1.05, 1.05, 1) translateZ(10px)';
  
  setTimeout(() => {
    siteTitle.style.transform = 'scale3d(1, 1, 1) translateZ(0)';
  }, 800);
}

siteTitle.addEventListener('mouseenter', () => {
  siteTitle.style.transition = 'transform 0.3s ease';
  siteTitle.style.transform = 'perspective(500px) rotateX(5deg) rotateY(10deg) scale3d(1.1, 1.1, 1.1)';
});

siteTitle.addEventListener('mouseleave', () => {
  siteTitle.style.transition = 'transform 0.5s ease';
  siteTitle.style.transform = 'scale3d(1, 1, 1) translateZ(0)';
});

window.addEventListener('load', animateTitle);


/**
 * Gallery 3D hover effect:
 * Subtle rotation and scaling on mouse move.
 */
const galleryFigures = document.querySelectorAll('.gallery figure');

galleryFigures.forEach(figure => {
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

    // Calculate rotation angles (max 8 degrees)
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    figure.style.transform = `scale(1.07) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(25px)`;
  });

  figure.addEventListener('mouseleave', () => {
    figure.style.transform = 'scale(1) rotateX(0) rotateY(0) translateZ(0)';
    figure.style.boxShadow = '0 10px 20px rgba(139, 0, 0, 0.15)';
  });
});


/**
 * Hamburger menu toggle for mobile navigation.
 */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active'); // Toggle hamburger animation state if styles exist
  });
});

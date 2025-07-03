const gallery = document.querySelector('.gallery');
let scrollAmount = 0;

function slideGallery() {
  scrollAmount += 1;
  if (scrollAmount >= gallery.scrollWidth - gallery.clientWidth) {
    scrollAmount = 0;
  }
  gallery.scrollLeft = scrollAmount;
  requestAnimationFrame(slideGallery);
}

slideGallery();

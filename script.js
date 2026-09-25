const flower = document.getElementById('bgFlower');

window.addEventListener('scroll', () => {
  const rotation = window.scrollY * 0.15;
  flower.style.transform = `rotate(${rotation}deg)`;
});

const aboutSection = document.getElementById('about');
const catPop = document.getElementById('catPop');
const lilyPop = document.getElementById('lilyPop');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      catPop.classList.add('visible');
      lilyPop.classList.add('visible');
    } else {
      catPop.classList.remove('visible');
      lilyPop.classList.remove('visible');
    }
  });
}, {
  threshold: 0.3   // triggers once 30% of the About section is visible
});

observer.observe(aboutSection);
const cursorDot = document.getElementById('cursorDot');
const cursorHalo = document.getElementById('cursorHalo');

let mouseX = 0, mouseY = 0;   // real mouse position
let haloX = 0, haloY = 0;     // halo's current (lagging) position

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = `${mouseX}px`;
  cursorDot.style.top = `${mouseY}px`;
});

function animateHalo(){
  // "lerp" — move the halo a fraction of the remaining distance each frame,
  // instead of snapping straight to the mouse. That's what creates the trailing feel.
  haloX += (mouseX - haloX) * 0.15;
  haloY += (mouseY - haloY) * 0.15;
  cursorHalo.style.left = `${haloX}px`;
  cursorHalo.style.top = `${haloY}px`;
  requestAnimationFrame(animateHalo);
}
animateHalo();

/* halo grows slightly over clickable things, like a little "ready to click" cue */
document.querySelectorAll('a, button, .card, .gallery-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorHalo.style.width = '52px';
    cursorHalo.style.height = '52px';
    cursorHalo.style.opacity = '0.35';
  });
  el.addEventListener('mouseleave', () => {
    cursorHalo.style.width = '32px';
    cursorHalo.style.height = '32px';
    cursorHalo.style.opacity = '0.25';
  });
});
const copyToast = document.getElementById('copyToast');
let toastTimeout;

document.querySelectorAll('.copyable').forEach(el => {
  el.addEventListener('click', (e) => {
    const textToCopy = el.getAttribute('data-copy');

    navigator.clipboard.writeText(textToCopy).then(() => {
      copyToast.style.left = `${e.clientX}px`;
      copyToast.style.top = `${e.clientY}px`;
      copyToast.classList.add('show');

      clearTimeout(toastTimeout);   // cancel any previous fade-out still pending
      toastTimeout = setTimeout(() => {
        copyToast.classList.remove('show');
      }, 1500);
    });
  });
});
document.querySelectorAll('.skill-chip').forEach(chip => {
  chip.addEventListener('click', (e) => {
    const isAlreadyOpen = chip.classList.contains('open');

    document.querySelectorAll('.skill-chip.open').forEach(openChip => {
      openChip.classList.remove('open');
    });

    if(!isAlreadyOpen){
      chip.classList.add('open');
    }

    e.stopPropagation();
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.skill-chip.open').forEach(chip => {
    chip.classList.remove('open');
  });
});

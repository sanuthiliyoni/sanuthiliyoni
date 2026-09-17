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
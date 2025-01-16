const moonElement = document.getElementById('moon');
const moonWidth = moonElement.offsetWidth;

const rocketElement = document.getElementById('rocket');
const rocketWidth = rocketElement.offsetWidth;
var maxTranslateX = window.innerWidth - rocketWidth - moonWidth;

document.addEventListener('scroll', function () {
  const translateX = Math.min(window.scrollY * 2, maxTranslateX);
  rocketElement.style.transform = `translateX(${translateX}px)`;
});

window.addEventListener('resize', function () {
  const rocketWidth = rocketElement.offsetWidth;
  maxTranslateX = window.innerWidth - rocketWidth;
});

const moonElement = document.getElementById('moon');
const moonWidth = moonElement.offsetWidth;

const rocketElement = document.getElementById('rocket');
const rocketWidth = rocketElement.offsetWidth;
var maxTranslateX = window.innerWidth - rocketWidth - moonWidth;

document.addEventListener('scroll', function () {
  const scrollY = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const progress = Math.min(scrollY / maxScroll, 1);
  // เส้นโค้งแบบ parabolic
  const translateX = progress * maxTranslateX;
  const curveHeight = 120; // ปรับความสูงของโค้งได้
  const translateY = -Math.sin(progress * Math.PI) * curveHeight;
  rocketElement.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
  // ป้องกันไม่ให้เกิดพื้นที่ขาวด้านขวา
  document.body.style.overflowX = 'hidden';
});

window.addEventListener('resize', function () {
  const rocketWidth = rocketElement.offsetWidth;
  maxTranslateX = window.innerWidth - rocketWidth - moonWidth;
});
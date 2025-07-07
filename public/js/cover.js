const moonElement = document.getElementById('moon');
const rocketElement = document.getElementById('rocket');

function updateMaxTranslateX() {
  const moonWidth = moonElement.offsetWidth;
  const rocketWidth = rocketElement.offsetWidth;
  return window.innerWidth - rocketWidth - moonWidth;
}

let maxTranslateX = updateMaxTranslateX();

function getCoverBottom() {
  const cover = document.getElementById('cover');
  const rect = cover.getBoundingClientRect();
  return rect.top + window.scrollY + cover.offsetHeight;
}

function updateRocketPosition() {
  const scrollY = window.scrollY;
  const coverBottom = getCoverBottom();
  const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight - coverBottom, 1); // ป้องกันหาร 0
  if (scrollY < coverBottom) {
    // ก่อนถึง coverBottom rocket อยู่ที่จุดเริ่มต้น
    rocketElement.style.transform = 'translateX(0px) translateY(0px)';
  } else {
    // หลัง coverBottom rocket เคลื่อนที่เป็นเส้นโค้ง
    const progress = Math.min((scrollY - coverBottom) / maxScroll, 1);
    const translateX = progress * maxTranslateX;
    const curveHeight = 120;
    const translateY = -Math.sin(progress * Math.PI) * curveHeight;
    rocketElement.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
  }
  document.body.style.overflowX = 'hidden';
}

document.addEventListener('scroll', updateRocketPosition);

window.addEventListener('resize', function () {
  maxTranslateX = updateMaxTranslateX();
  updateRocketPosition();
});

// initial position
updateRocketPosition();

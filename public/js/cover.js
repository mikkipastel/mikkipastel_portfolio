const moonElement = document.getElementById('moon');
const rocketElement = document.getElementById('rocket');

function getMaxTranslate() {
  const moonRect = moonElement.getBoundingClientRect();
  const rocketRect = rocketElement.getBoundingClientRect();
  const rocketX = rocketRect.left + window.scrollX;
  const moonX = moonRect.left + window.scrollX;
  const rocketY = rocketRect.top + window.scrollY;
  const moonY = moonRect.top + window.scrollY;
  return {
    x: moonX - rocketX,
    y: moonY - rocketY
  };
}

function animateRocketToMoon(duration = 30000) {
  const maxTranslate = getMaxTranslate();
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const t = Math.min(elapsed / duration, 1);
    // เดินทางเป็นเส้นตรงจาก rocket ไป moon
    const x = maxTranslate.x * t;
    const y = maxTranslate.y * t;
    rocketElement.style.transform = `translate(${x}px, ${y}px)`;
    document.body.style.overflowX = 'hidden';
    if (t < 1) {
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
}

animateRocketToMoon(10000);
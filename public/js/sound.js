// TODO: to be continue with lottie
const audioElement = document.querySelector("audio");
const toggleSound = document.getElementById("toggle-sound");

audioElement.volume = 0.5;

toggleSound.addEventListener("click", function () {
    if (audioElement.paused == false) {
        toggleSound.src = "https://cdn.glitch.global/9737b693-af83-452d-a9df-854f39d63332/sound_off.webp?v=1736783236059";
        toggleSound.alt ="sound off";
        audioElement.pause();
    } else {
        toggleSound.src = "https://cdn.glitch.global/9737b693-af83-452d-a9df-854f39d63332/sound_on.webp?v=1736783322993";
        toggleSound.alt ="sound on";
        audioElement.currentTime = 0;
        audioElement.play();
    }
});

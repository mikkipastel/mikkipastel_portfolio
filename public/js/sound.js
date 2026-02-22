// TODO: to be continue with lottie
const audioElement = document.querySelector("audio");
const toggleSound = document.getElementById("toggle-sound");

audioElement.volume = 0.5;

toggleSound.addEventListener("click", function () {
    if (audioElement.paused == false) {
        toggleSound.src = "image/portfolio/sound_off.webp";
        toggleSound.alt ="sound off";
        audioElement.pause();
    } else {
        toggleSound.src = "image/portfolio/sound_on.webp";
        toggleSound.alt ="sound on";
        audioElement.currentTime = 0;
        audioElement.play();
    }
});

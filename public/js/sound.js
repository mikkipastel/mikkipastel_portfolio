// TODO: to be continue with lottie
const audioElement = document.querySelector("audio");
const toggleSound = document.getElementById("toggle-sound");

audioElement.volume = 0.5;

toggleSound.addEventListener("click", function () {
    if (audioElement.paused == false) {
        toggleSound.src = "https://cdn.glitch.global/9737b693-af83-452d-a9df-854f39d63332/sound_off.png?v=1735541964445";
        toggleSound.alt ="sound off";
        audioElement.pause();
    } else {
        toggleSound.src = "https://cdn.glitch.global/9737b693-af83-452d-a9df-854f39d63332/sound_on.png?v=1735541962522";
        toggleSound.alt ="sound on";
        audioElement.currentTime = 0;
        audioElement.play();
    }
});

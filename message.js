// Array of tracks
const tracks = [
    {
        name: "Message 1",
        album: "Message 1",
        src: "voicemessage.mp3",// Replace with your MP3 file path
        image: "a64.jpg" // Replace with your album art image path
    },
    {
        name: "Track 2",
        album: "Album 2",
        src: "vm2.mp3", // Replace with your MP3 file path
        image: "a40.jpg" // Replace with your album art image path
    }
];

let currentTrackIndex = 0;
const audio = new Audio(tracks[currentTrackIndex].src);
const playPauseButton = document.getElementById("play-pause-button");
const trackName = document.getElementById("track-name");
const albumName = document.getElementById("album-name");
const albumArt = document.getElementById("album-art").querySelector("img");
const currentTimeDisplay = document.getElementById("current-time");
const trackLengthDisplay = document.getElementById("track-length");
const seekBar = document.getElementById("seek-bar");
const seekBarContainer = document.getElementById("seek-bar-container");

function loadTrack(index) {
    audio.src = tracks[index].src;
    trackName.textContent = tracks[index].name;
    albumName.textContent = tracks[index].album;
    albumArt.src = tracks[index].image;
    audio.load();
}

function playTrack() {
    audio.play();
    playPauseButton.querySelector("i").classList.remove("fa-play");
    playPauseButton.querySelector("i").classList.add("fa-pause");
}

function pauseTrack() {
    audio.pause();
    playPauseButton.querySelector("i").classList.remove("fa-pause");
    playPauseButton.querySelector("i").classList.add("fa-play");
}

playPauseButton.addEventListener("click", () => {
    if (audio.paused) {
        playTrack();
    } else {
        pauseTrack();
    }
});

audio.addEventListener("ended", () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    playTrack();
});

audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    currentTimeDisplay.textContent = formatTime(currentTime);
    trackLengthDisplay.textContent = formatTime(duration);
    seekBar.style.width = (currentTime / duration) * 100 + "%";
});

seekBarContainer.addEventListener("click", (event) => {
    const rect = seekBarContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const totalWidth = rect.width;
    const percentage = offsetX / totalWidth;
    audio.currentTime = percentage * audio.duration;
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Load the first track
loadTrack(currentTrackIndex);
function playTrack() {
    audio.play();
    playPauseButton.querySelector("i").classList.remove("fa-play");
    playPauseButton.querySelector("i").classList.add("fa-pause");
    albumArt.classList.add("active"); // Add active class to start rotation
}
function pauseTrack() {
    audio.pause();
    playPauseButton.querySelector("i").classList.remove("fa-pause");
    playPauseButton.querySelector("i").classList.add("fa-play");
    albumArt.classList.remove("active"); // Remove active class to stop rotation
}
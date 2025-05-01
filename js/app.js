
const tracks = {
    battle: "audio/battle.mp3",
    tavern: "audio/tavern.mp3",
    mystery: "audio/mystery.mp3",
    dungeon: "audio/dungeon.mp3",
    victory: "audio/victory.mp3",
    forest_day: "audio/forest_day.mp3",
	forest_night: "audio/forest_night.mp3",
    desert: "audio/desert.mp3",
    city: "audio/city.mp3",
    temple: "audio/temple.mp3",
    ritual: "audio/ritual.mp3",
	long_rest: "audio/long_rest.mp3"
};

let currentPlayer = null;
let fadeInterval = null;

function fadeOutAudio(audio, callback) {
    let volume = audio.volume;
    clearInterval(fadeInterval);
    fadeInterval = setInterval(() => {
        if (volume > 0.05) {
            volume -= 0.05;
            audio.volume = volume;
        } else {
            audio.pause();
            clearInterval(fadeInterval);
            if (callback) callback();
        }
    }, 100);
}

function fadeInAudio(audio) {
    let volume = 0.0;
    audio.volume = volume;
    audio.play();
    clearInterval(fadeInterval);
    fadeInterval = setInterval(() => {
        if (volume < 1.0) {
            volume += 0.05;
            audio.volume = volume;
        } else {
            clearInterval(fadeInterval);
        }
    }, 100);
}

function playMusic(track) {
    const nowPlayingElement = document.getElementById('now-playing');
    if (currentPlayer) {
        fadeOutAudio(currentPlayer, () => {
            currentPlayer = new Audio(tracks[track]);
            currentPlayer.loop = true;
            fadeInAudio(currentPlayer);
            const formattedName = track.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
				nowPlayingElement.textContent = `Now Playing: ${formattedName}`;
        });
    } else {
        currentPlayer = new Audio(tracks[track]);
        currentPlayer.loop = true;
        fadeInAudio(currentPlayer);
        const formattedName = track.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
			nowPlayingElement.textContent = `Now Playing: ${formattedName}`;
    }
}

function stopMusic() {
    const nowPlayingElement = document.getElementById('now-playing');
    if (currentPlayer) {
        fadeOutAudio(currentPlayer, () => {
            currentPlayer = null;
            nowPlayingElement.textContent = 'No track playing';
        });
    } else {
        nowPlayingElement.textContent = 'No track playing';
    }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log("✅ Service Worker Registered"))
    .catch((error) => console.log("❌ Service Worker Failed:", error));
}

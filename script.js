const btn = document.querySelector(".btn");

btn.addEventListener("mouseenter", () => {
    btn.style.transform = "scale(1.05)";
});

btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
});
let cheatVideo = null;
let currentVideoIndex = 0;

const videoPlaylist = [
  "video/part1.mov",
  "video/part2.mov"
];

// a key map of allowed keys
var allowedKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
};

// the 'official' Konami Code sequence
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right'];

// a variable to remember the 'position' the user has reached so far.
var konamiCodePosition = 0;

// add keydown event listener
document.addEventListener('keydown', function(e) {
  // get the value of the key code from the key map
  var key = allowedKeys[e.keyCode];
  // get the value of the required key from the konami code
  var requiredKey = konamiCode[konamiCodePosition];

  // compare the key with the required key
  if (key == requiredKey) {

    // move to the next key in the konami code sequence
    konamiCodePosition++;

    // if the last key is reached, activate cheats
    if (konamiCodePosition == konamiCode.length) {
      activateCheats();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});

function playVideo(src, loop = false) {
  if (cheatVideo) {
    cheatVideo.pause();
    cheatVideo.remove();
  }

  cheatVideo = document.createElement("video");
  cheatVideo.src = src;
  cheatVideo.autoplay = true;
  cheatVideo.muted = false;
  cheatVideo.loop = loop;
  cheatVideo.controls = false;

  cheatVideo.style.position = "fixed";
  cheatVideo.style.bottom = "20px";
  cheatVideo.style.right = "20px";
  cheatVideo.style.width = "1800px";
  cheatVideo.style.zIndex = "9999";

  document.body.appendChild(cheatVideo);
}

function activateCheats() {
  document.body.style.backgroundImage = "url('images/back.png')";

  currentVideoIndex = 0;
  playVideo(videoPlaylist[currentVideoIndex]);

  cheatVideo.addEventListener("ended", playNextVideo);
}

function playNextVideo() {
  currentVideoIndex++;

  // если видео ещё есть — запускаем
  if (currentVideoIndex < videoPlaylist.length) {
    playVideo(videoPlaylist[currentVideoIndex]);

    cheatVideo.addEventListener("ended", playNextVideo);
  } else {
    // если это было последнее видео
    playVideo(videoPlaylist[videoPlaylist.length - 1], true);
  }
}


function stopCheats() {
  if (!cheatVideo) return;

  cheatVideo.pause();       
  cheatVideo.currentTime = 0; 
  cheatVideo.remove();      
  cheatVideo = null;

  document.body.style.backgroundImage = "";
}


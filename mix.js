// JavaScript code to load the episode details from the JSON data
const pageTitle = document.getElementById("page_title");
const mixHeader = document.getElementById("mix-header");
const episodeTitle = document.getElementById("episode-title");
const episodeGenre = document.getElementById("episode-genre");
const episodeArtists = document.getElementById("episode-artists");
const similarMixes = document.getElementById("similar-mixes");
const breadcrumb = document.getElementById("breadcrumb");
const dateReleased = document.getElementById("date-released");
const urlParams = new URLSearchParams(window.location.search);
const episodeId = urlParams.get("id");

// Load the JSON data
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const episode = data.find((episode) => episode.id === episodeId);
    if (episode) {
      const episodeDetails = document.getElementById("episode-details");

      mixHeader.style.background = `linear-gradient(rgba(0, 0, 0, 0.3), #000000d6),url(${episode.thumbnailLg})`;
      mixHeader.style.backgroundSize = "cover";
      mixHeader.style.backgroundPosition = "center";
      mixHeader.style.width = "100%";
      mixHeader.style.height = "100vh";
      pageTitle.innerHTML = `DJ G400 - ${episode.Title}`;
      episodeTitle.innerHTML = `${episode.Title}`;
      episodeGenre.innerHTML = `Similar ${episode.Genre} Mixes`;
      episodeArtists.innerHTML = `${episode.Artists}`;
      similarMixes.innerHTML = `${episode.Title}`;
      dateReleased.innerHTML = `Released: ${episode.date}`;
      breadcrumb.innerHTML = `

            <button onclick="goBack()" 
              class="btn-none hover">DJ G400 Mixes
            </button> 
            / ${episode.Album}
            / Vol 0${episode.Episode}

            `;

      const hoverElements = document.querySelectorAll(".hover");
      console.log("logo");
      const logo = document.getElementById("logo");
      logo.style.fill = `${episode.color}`;
      console.log("done");

      for (let i = 0; i < hoverElements.length; i++) {
        hoverElements[i].style.color = `${episode.color}`; // You can change 'red' to any desired color
      }

      const volumeControlThumb = document.getElementById("mix_progress_bar");
      volumeControlThumb.style.backgroundColor = `${episode.color}`;

      // Set the new audio source URL
      const episodeSource = document.getElementById("song");
      var newAudioSource = `${episode.audio}`;
      episodeSource.setAttribute("src", newAudioSource);
      // Load the new audio source
      audioElement.load();
    } else {
      const episodeDetails = document.getElementById("episode-details");
      episodeDetails.innerHTML =
        "<p class='alert alert-dark text-center'>Episode not found.</p>";
    }
  })
  .catch((error) => {
    console.error(`Error loading JSON data: ${error}`);
  });

document.addEventListener("DOMContentLoaded", function () {
  // Get a reference to the audio element and the progress bar
  var song = document.getElementById("song");
  var progress = document.getElementById("mix_progress_bar");

  // When the audio metadata is loaded, set the progress bar's max value and initial value
  song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = 0; // Start the progress at 0
  };

  // Update progress bar continuously as audio plays
  song.ontimeupdate = function () {
    progress.value = song.currentTime;
  };

  // Seek to a specific time when the user interacts with the progress bar
  progress.oninput = function () {
    song.currentTime = progress.value;
  };

  // Check if the audio is playing and update the progress bar every 500ms
  var interval;
  song.onplay = function () {
    interval = setInterval(() => {
      progress.value = song.currentTime;
    }, 500);
  };

  // When the audio is paused or ends, clear the interval to stop updating the progress bar
  song.onpause = song.onended = function () {
    clearInterval(interval);
  };
});

// Function to play or pause the audio
function playPause() {
  var song = document.getElementById("song");
  var controlIcon = document.getElementById("controlIcon");

  if (song.paused) {
    song.play();
    controlIcon.classList.add("fa-pause");
    controlIcon.classList.remove("fa-play");
  } else {
    song.pause();
    controlIcon.classList.remove("fa-pause");
    controlIcon.classList.add("fa-play");
  }
}

// Function to update the progress bar when the audio is manually seeked
function updateProgressBar() {
  var song = document.getElementById("song");
  var progress = document.getElementById("mix_progress_bar");
  progress.value = song.currentTime;
}

// app.js

function changeVolume() {
  var audioElement = document.getElementById("song");
  var volumeControl = document.getElementById("volume_control");
  var volume = volumeControl.value;

  // Set the volume of the audio element
  audioElement.volume = volume;
}

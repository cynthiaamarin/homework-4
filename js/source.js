
 // *********************************************************************
 // Homework 4 APIs - Faye Webster my favorite artist
 // *********************************************************************

function convertMsToMinSec(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const paddedSeconds = String(seconds).padStart(2, "0");
  return `${minutes}:${paddedSeconds}`;
}

// **************** update code below ****************

localStorage.setItem("artist_id", "5szilpXHcwOqnyKLqGco5j");

localStorage.setItem("track_id_1", "5WbfFTuIldjL9x7W6y5l7R"); // Kingston
localStorage.setItem("track_id_2", "71BWZa1liIRyUiuJ3MB66o"); // I Know You
localStorage.setItem("track_id_3", "2VYnlKxB8jpbCeLUjQsebc"); // In A Good Way

localStorage.setItem("album_id_1", "4vt0V1SmkaK1Y440P5Nsb4"); // Atlanta Millionaires Club
localStorage.setItem("album_id_2", "454yeYs9PxTEwGmZf6OBpa"); // I Know I'm Funny haha
localStorage.setItem("album_id_3", "0FDkRPm9cIRJ8qBkxj2Qny"); // Underdressed at the Symphony
localStorage.setItem("album_id_4", "0pEHMpnX1jA44pzhW3n0JB"); // Faye Webster

// *********************************************************************

async function load() {
  const artistID = localStorage.getItem("artist_id");
  const accessToken = localStorage.getItem("access_token");

  const tracks = [
    localStorage.getItem("track_id_1"),
    localStorage.getItem("track_id_2"),
    localStorage.getItem("track_id_3")
  ];

  const albums = [
    localStorage.getItem("album_id_1"),
    localStorage.getItem("album_id_2"),
    localStorage.getItem("album_id_3"),
    localStorage.getItem("album_id_4")
  ];

  if (!accessToken) {
    console.error(
      "Spotify access token is missing. Set it in localStorage, then reload."
    );
    return;
  }

  async function getSpotifyData(endpoint) {
    const response = await fetch(
      `https://api.spotify.com/v1/${endpoint}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}` // my access token does not work
        }
      }
    );

    if (!response.ok) {
      throw new Error(
        `Spotify API error ${response.status} for ${endpoint}`
      );
    }

    return await response.json();
  }

  try {
    // Update Artist Information
    const artistData = await getSpotifyData(`artists/${artistID}`);

    const artistName = document.querySelector("#artist-name");
    const artistImage = document.querySelector(".artist-image img");

    if (artistName) {
      artistName.textContent = artistData.name;
    }

    if (artistImage && artistData.images.length > 0) {
      artistImage.src = artistData.images[0].url;
      artistImage.alt = artistData.name;
    }

    // Update Popular Tracks
    const trackRows = document.querySelectorAll(".track-list");

    for (let i = 0; i < tracks.length && i < trackRows.length; i++) {
      if (!tracks[i]) continue;

      const trackData = await getSpotifyData(`tracks/${tracks[i]}`);
      const row = trackRows[i];
      const image = row.querySelector("img");

      if (image && trackData.album.images.length > 0) {
        image.src = trackData.album.images[0].url;
        image.alt = trackData.name;
      }

      const title = row.querySelector(".track-title");
      const album = row.querySelector(".track-album");
      const number = row.querySelector(".track-number");
      const duration = row.querySelector(".track-duration");

      if (title) title.textContent = trackData.name;
      if (album) album.textContent = trackData.album.name;
      if (number) number.textContent = trackData.track_number;
      if (duration) {
        duration.textContent = convertMsToMinSec(trackData.duration_ms);
      }
    }

    // Update Albums
    const albumCards = document.querySelectorAll(".album-card");

    for (let i = 0; i < albums.length && i < albumCards.length; i++) {
      if (!albums[i]) continue;

      const albumData = await getSpotifyData(`albums/${albums[i]}`);
      const card = albumCards[i];
      const image = card.querySelector("img");

      if (image && albumData.images.length > 0) {
        image.src = albumData.images[0].url;
        image.alt = albumData.name;
      }

      const title = card.querySelector(".album-title");
      const artist = card.querySelector(".album-artist");
      const releaseDate = card.querySelector(".album-release-date");

      if (title) title.textContent = albumData.name;
      if (artist) artist.textContent = albumData.artists[0].name;
      if (releaseDate) releaseDate.textContent = albumData.release_date;
    }

  } catch (error) {
    console.error("Could not load Spotify information:", error);
  }
}

load();

   
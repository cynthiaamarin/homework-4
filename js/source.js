// *********************************************************************
// Homework 4 APIs
// *********************************************************************

function convertMsToMinSec(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const paddedSeconds = String(seconds).padStart(2, '0');
  return `${minutes}:${paddedSeconds}`;
}

// **************** Update code below  **************** 


// IDs and secret token should come from Spotify
localStorage.setItem("artist_id", "");
localStorage.setItem("access_token", "");
localStorage.setItem("track_id_1", "");
localStorage.setItem("track_id_2", "");
localStorage.setItem("track_id_3", "");
localStorage.setItem("album_id_1", "");
localStorage.setItem("album_id_2", "");
localStorage.setItem("album_id_3", "");
localStorage.setItem("album_id_4", "");


async function load(){
    
    let artistID = localStorage.getItem("artist_id");
    let accessToken = localStorage.getItem("access_token");
    let trackID1 = localStorage.getItem("track_id_1");
    let trackID2 = localStorage.getItem("track_id_2");
    let trackID3 = localStorage.getItem("track_id_3");

    let albumID1 = localStorage.getItem("album_id_1");
    let albumID2 = localStorage.getItem("album_id_2");
    let albumID3 = localStorage.getItem("album_id_3");
    let albumID4 = localStorage.getItem("album_id_4");


    // Update Artist Information
    const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}`,
      {headers: {Authorization: `Bearer ${accessToken}`}
    });

    const artistData = await artistResponse.json();

    document.querySelector(`#artist-name`).textContent = artistData.name;
    document.querySelector(`.artist-image img`).src = artistData.images[0].url;

    const tracks = [trackID1, trackID2, trackID3];
    const trackRows = document.querySelectorAll(`.track-list`);

    // update Popular tracks
    for(let i = 0; i < tracks.length; i++){
      const trackResponse = await fetch(`https://api.spotify.com/v1/tracks/${tracks[i]}`,
        {headers: {Authorization: `Bearer ${accessToken}`}
      });

      const trackData = await trackResponse.json();

      trackRows[i].querySelector(`img`).src = trackData.album.images[0].url;
      trackRows[i].querySelector(`.track-title`).textContent = trackData.name;
      trackRows[i].querySelector(`.track-album`).textContent = trackData.album.name;
      trackRows[i].querySelector(`.track-number`).textContent = trackData.track_number;
      trackRows[i].querySelector(`.track-duration`).textContent = convertMsToMinSec(trackData.duration_ms);
    }

    const albums = [albumID1, albumID2, albumID3, albumID4];
    const albumCards = document.querySelectorAll(`.album-card`);

    // update Albums
    for(let i = 0; i < albums.length; i++){
      const albumResponse = await fetch(`https://api.spotify.com/v1/albums/${albums[i]}`,
        {headers: {Authorization: `Bearer ${accessToken}`}
      });
      const albumData = await albumResponse.json();

      albumCards[i].querySelector(`.album-card`).src = albumData.images[0].url;
      albumCards[i].querySelector(`.album-title`).textContent = albumData.name;
      albumCards[i].querySelector(`.album-artist`).textContent = albumData.artists[0].name;
      albumCards[i].querySelector(`.album-release-date`).textContent = albumData.release_date;
    }
  
}
load();


   
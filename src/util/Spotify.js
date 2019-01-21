let accessToken;
const clientID = 'b0d22c256bd1477ab4f0e0ade6928d26';
const redirectURI = 'http://localhost:3000/'
// const redirectURI = "http://paz-test.surge.sh";

const Spotify = {
    getAccessToken() {
        if(accessToken){
            return accessToken;
        }
        
        if(window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/))
        {
          accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
          let   expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      
          window.setTimeout(() => accessToken = '', expiresIn*1000);
          window.history.pushState('Access Token', null, '/');
      
          return accessToken;
        }
        else
        {
          let url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
          window.location = url;
        }
      },
    
    search(term) {
        accessToken = Spotify.getAccessToken();

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response =>{
              return response.json();
          }).then(jsonResponse => {
              if (jsonResponse) {
                  return jsonResponse.tracks.items.map(track =>({
                      id: track.id,
                      name: track.name,
                      artist: track.artists[0].name,
                      album: track.album.name,
                      uri: track.uri
                  }));
              }
          }, networkError => console.log(networkError.message));
    },

    savePlaylist(playlistName, trackUris){
        accessToken = Spotify.getAccessToken();
        let headers = {Authorization: `Bearer ${accessToken}`};
        let userId;
        let playlistId;
        let userEndpoint = 'https://api.spotify.com/v1/me';
        // let playlistEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
        // let tracksEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;


        if(!playlistName && trackUris === 0){
            return;
        }
        //Generate user ID
        return fetch(userEndpoint, {
            headers: headers
        }).then(response => response.json()).then(jsonResponse =>{
            userId = jsonResponse.id;
        //POST request to create new playlist with playlist name and get a playlist ID
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: 'POST',
                headers:{
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/jsonResponse'
                },
                body: JSON.stringify({
                    name: playlistName
                })
            }).then(response => response.json()).then(jsonResponse => {
                console.log(jsonResponse);
                playlistId = jsonResponse.id
        //POST request to add the tracks to the playlist
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    method: 'POST',
                    headers:{
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/jsonResponse'
                    },
                    body: JSON.stringify({
                        uris: trackUris
                    })
                }).then(response => response.json().then(jsonResponse => {
                    playlistId = jsonResponse.id;
                }));
            });
        }, networkError => console.log(networkError.message));
    }
};

export default Spotify;
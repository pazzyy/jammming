let accessToken;
const clientID = 'b0d22c256bd1477ab4f0e0ade6928d26';
// const redirectURI = 'http://localhost:3000/'
const redirectURI = "http://paz-jammming.surge.sh";

const Spotify = {
    //function to get the token. 
    getAccessToken() {
        if(accessToken){
            return accessToken;
        }
        //get the accesstoken in the url and set the timeout
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
    
      //Search method
    search(term) {
        accessToken = Spotify.getAccessToken();
        //API call to the search endpoint to get the result and return an array
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response =>{
              return response.json();
          }).then(jsonResponse => {
              if (jsonResponse) {
                  //return the array of tracks from the jsonresponse
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

    //Save method that takes a name and an array of uris (uris contain the information for the tracks tht Spotify needs)
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
            console.log(jsonResponse.id);
            userId = jsonResponse.id;
        //POST request to create new playlist with playlist name and get a playlist ID then saves the playlist ID
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
                console.log("trackUris", trackUris)
               
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
                    console.log("Jsonresponse", jsonResponse)
                    playlistId = jsonResponse.id; //Not sure why we have to save the playlistID again? It's in the instructions.
                }));
            });
        }, networkError => console.log(networkError.message));
    }
};

export default Spotify;
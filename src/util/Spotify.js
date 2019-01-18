let accessToken;
const clientID = 'b0d22c256bd1477ab4f0e0ade6928d26';
const redirectURI = "http://paz-test.surge.sh";

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
    }
};

export default Spotify;
import SearchBar from "../components/SearchBar/SearchBar";

let accessToken;
const clientID = 'b0d22c256bd1477ab4f0e0ade6928d26';
const redirectURI = "http://localhost:3000/";

const Spotify = {
    getAccessToken() {
        if(accessToken){
            return accessToken;
        } 
        else if(window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/))
        {
          accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
          let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      
          window.setTimeout(() => accessToken = '', expiresIn*1000);
          window.history.pushState('Access Token', null, '/');
      
          return accessToken;
        }
        else
        {
          let url = `https://api.spotify.com/v1/search?type=track&q=TERM
          `;
          window.location = url;
        }
      },
    
    search(term) {
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response =>{
              return response.json();
          }).then(jsonResponse => {
              if (jsonResponse) {
                  return jsonResponse.tracks.map(track =>({
                      id: track.id,
                      name: track.name,
                      artist: track.artist,
                      album: track.album,
                      uri: track.uri
                  }));
              }
          }, networkError => console.log(networkError.message));
    }
};

export default Spotify;
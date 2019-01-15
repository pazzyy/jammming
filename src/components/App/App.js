import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../Playlist/Playlist';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
      {
        name: "Track 1",
        artist: "Artist 1",
        album: "Album 1",
        id: "1",
      },
      {
        name: "Track 1",
        artist: "Artist 1",
        album: "Album 1",
        id: "1",
      },
      {
        name: "Track 1",
        artist: "Artist 1",
        album: "Album 1",
        id: "1",
      }
    ]
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <PlayList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

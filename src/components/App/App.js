import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../Playlist/Playlist';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: 
      [
        {
          name: "Track 1",
          artist: "Artist 1",
          album: "Album 1",
          id: "1",
        },
        {
          name: "Track 2",
          artist: "Artist 3",
          album: "Album 1",
          id: "2",
        },
        {
          name: "Track 3",
          artist: "Artist 1",
          album: "Album 1",
          id: "3",
        }
      ],
      playlistName: 'Paz Playlist',
      playlistTracks: 
      [
        // {
        //   name: "Track 2",
        //   artist: "Artist 1",
        //   album: "Album 1",
        //   id: "2",
        // },
        // {
        //   name: "Track 4",
        //   artist: "Artist 1",
        //   album: "Album 1",
        //   id: "4",
        // },
        // {
        //   name: "Track 1",
        //   artist: "Artist 1",
        //   album: "Album 1",
        //   id: "1",
        // }
      ]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }
  
  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      let currentPlaylist = this.state.playlistTracks.slice();
      currentPlaylist.push(track);
      this.setState({playlistTracks: currentPlaylist});
    }
  }

  removeTrack(track) {
    let currentPlaylist = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({playListTracks: currentPlaylist});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name}); 
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
// import Dialog from '../Dialog/Dialog';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Paz Playlist',
      playlistTracks: [],
      success: false
    };
    
    //Bind this for the multiple methods
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  //Method that adds a track from the Search Result to the Playlist when user clicks on + 
  addTrack(track) {
    if(this.state.playlistTracks.find(currentTrack => currentTrack.id === track.id)) {
      return; // if track.id already exist in playlistTracks, then do nothing.
    } else {
      let tempPlaylist = this.state.playlistTracks.slice(); //create a new variable that store a copy of the playlistTracks current array
      tempPlaylist.push(track); //push the track to the variable
      this.setState({playlistTracks: tempPlaylist}); //update the state with the new content from the variable
      // this.setState({playlistTracks: this.state.playlistTracks.push(track)})
    }
  }

  //Method that removes a track from the Playlist when a user clicks on -
  removeTrack(track) {
    let currentPlaylist = this.state.playlistTracks.filter(trackToRemove => trackToRemove.id !== track.id); //filter out the element if its id matches the track.id in the playlistTrakcs
    this.setState({playlistTracks: currentPlaylist}); //update the state with the new array that has the track removed from it
  }

  //Update the playlist name
  updatePlaylistName(name){
    // console.log('name before change', this.state.playlistName);
    this.setState({playlistName: name}); 
  }

  

  //Save the playlist when clicking on Save button
  savePlaylist() {
    //creates an array of uris that will be sent to Spotify
    let trackURIs = [];
    for (let i = 0; i < this.state.playlistTracks.length; i++){
      trackURIs.push(this.state.playlistTracks[i].uri);
    };

    //calls the save method and passes the playlistname and the array of uri from above
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playlistName: 'New Playlist'});
    this.setState({success: true});
    // console.log('I got triggered');
    // alert(`${this.state.playlistName} has been saved!`);
  }

  //Search method that populate the searchResult array with the tracks returned
  search(term){
    console.log(`Searching with ${term}`);
    Spotify.search(term).then(track =>{
      this.setState({searchResults: track})
    });
  }

  // showDialog(term) {
  //   if(this.state.success){
  //     return <Dialog onSuccess={term}/>;
  //   }
  // }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          {/* {this.showDialog(this.state.playlistName)} */}

          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

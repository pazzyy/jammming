import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    //handle the + or - sign depending on if the value of isRemoval that is defined in SearchResult or Playlist
    renderAction(isRemoval) {
        if (isRemoval) {
            return <a className="Track-action" onClick={this.removeTrack}>-</a>;

        } else {
            return <a className="Track-action" onClick={this.addTrack}>+</a>;}
    }

    //Triggers the addTrack from app that adds the track when the button is clicked
    addTrack() {
        this.props.onAdd(this.props.track);
    }

    //Triggers the removeTrack from app that removes the track when the button is clicked
    removeTrack() {
        this.props.onRemove(this.props.track);
    }




    render () {
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                    <audio ref="audio_tag" src={this.props.track.preview} controls />
                </div>
                {this.renderAction(this.props.isRemoval)}
            </div>
        );
    }
}

export default Track;
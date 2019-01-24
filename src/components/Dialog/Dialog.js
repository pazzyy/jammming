import React from 'react';
import './Dialog.css';

class Dialog extends React.Component{
    render() {
        return (
            <div className="Dialog">
            <p>{this.props.onSuccess} has been saved</p>
            </div>

        );
    }
}

export default Dialog;
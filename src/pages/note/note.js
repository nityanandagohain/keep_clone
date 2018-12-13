import React, { Component } from 'react';

export default class Note extends Component {
    constructor(props) {
        super(props); 
        this.noteTitle = props.noteTitle;
        this.noteData = props.noteData;
        this.noteId = props.noteId;
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
    }
    handleRemoveNote(id){
        this.props.removeNote(id);
    }
    render() {
        return (
            <div className="card" style={{width: 18 + 'rem'}}>
                <div className="card-body">
                    <h5 className="card-title">{this.noteTitle}</h5>
                    <hr></hr>
                    <p className="card-text">{this.noteData}</p>
                    <button onClick={()=> this.handleRemoveNote(this.noteId)} type="submit" className="btn btn-primary">&times;</button>
                </div>
            </div> 
        );
    }
}
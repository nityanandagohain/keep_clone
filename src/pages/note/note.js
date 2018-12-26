import React, { Component } from 'react';
import './note.css';

export default class Note extends Component {
    constructor(props) {
        super(props); 
        this.noteTitle = props.noteTitle;
        this.noteData = props.noteData;
        this.noteId = props.noteId;
        this.cardText = React.createRef();
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
    }
    handleRemoveNote(id){
        this.props.removeNote(id);
    }
    componentDidMount()
    {
        if(this.noteData.src)
            this.cardText.current.appendChild(this.noteData);
        else
            this.cardText.current.appendChild(document.createTextNode(this.noteData));
    }
    render() {
        //alert(this.noteData.src);
        return (
            <div className="card notes" style={{width: 18 + 'rem'}}>
                <button onClick={()=> this.handleRemoveNote(this.noteId)} type="submit" className="cross">&times;</button>
                <div className="card-body cdb">
                    <h5 className="card-title cdt">{this.noteTitle}</h5>
                    <hr className="hr"></hr>
                    <div className="card-text cdte" ref={this.cardText}> </div>
                </div>
            </div> 
        );
    }
}
import React, { Component } from 'react';
import './note.css';

export default class Note extends Component {
    constructor(props) {
        super(props); 
        this.noteTitle = props.noteTitle;
        this.noteList = props.noteList;
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
        if(this.props.noteList === undefined){
            if(this.noteData.src)
            this.cardText.current.appendChild(this.noteData);
        else
            this.cardText.current.appendChild(document.createTextNode(this.noteData));
        }
    }
    render() {
        //alert(this.noteData.src);
        return (
            <div className="card notes" style={{width: 20 + 'rem',display:"inline-block",margin:"1%"}}>
                <button onClick={()=> this.handleRemoveNote(this.noteId)} type="submit" className="cross"><h5>&times;</h5></button>
                <div className="card-body cdb">
                {
                    this.noteTitle === "" ? null
                    :
                    <h5 className="card-title cdt">{this.noteTitle}</h5>
                }
                    
                    <hr className="hr"></hr>
                    {this.props.noteList === undefined ? 
                        <div className="card-text cdte" ref={this.cardText} required> </div>
                        :
                        <div className="card-text cdli">
                            {this.props.noteList.map((val)=>
                            <p className="li">
                                <input type="checkbox"></input>
                                {val}
                            </p>
                            )}
                        </div>
                    }
                </div>
            </div> 
        );
    }
}

                        
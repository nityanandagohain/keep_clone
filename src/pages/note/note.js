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
        this.cardTitle = React.createRef();
        this.cardList = React.createRef();
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
    }
    handleRemoveNote(id){
        this.props.removeNote(id);
    }
    componentDidMount()
    {
        if(this.noteTitle !== "") 
            this.cardTitle.current.innerHTML = this.noteTitle;
        if(this.props.noteList.length)
        {
            this.props.noteList.forEach((val)=>{
                let el = document.createElement("p");
                el.innerHTML = `<input type="checkbox"></input>${val}`;
                this.cardList.current.appendChild(el);
                })
        }
        else
        {
            if(this.noteData.src)
                this.cardText.current.appendChild(this.noteData);
            else if(this.noteData)
                this.cardText.current.innerHTML = this.noteData;
        }
    }
    render() {
        //alert(this.noteData.src);
        return (
            <div className="card notes" style={{width: 20 + 'rem',display:"inline-block",margin:"1%"}}>
                <button onClick={()=> this.handleRemoveNote(this.noteId)} type="submit" className="cross"><h5>&otimes;</h5></button>
                <div className="card-body cdb">
                {
                    this.noteTitle === "" ? <h5 className="card-title cdt" ref={this.cardTitle}>New Note</h5>
                    :
                    <h5 className="card-title cdt" ref={this.cardTitle}>{this.noteTitle}</h5>
                }  
                <hr className="hr"></hr>
                {
                    this.props.noteList.length ?
                        <div className="card-text cdli" ref = {this.cardList}>
                        </div>
                        :    
                        <div>
                            {
                                this.noteData ?
                                    <div className="card-text cdte" ref={this.cardText}></div> 
                                    : 
                                    null
                            }
                        </div>
                }
                {
                    !this.noteTitle && !this.props.noteList.length && !this.noteData ?
                        <div>
                            <div className="empty">THIS NOTE IS EMPTY. PLEASE DELETE IT.</div>
                        </div>
                        :
                        null
                }
                </div>
            </div> 
        );
    }
}

                        
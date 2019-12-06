import React, { Component } from 'react';
import './note.css';
import { Draggable } from 'react-beautiful-dnd';
import EditNode from '../noteEdit/edit';


export default class Note extends Component {
    constructor(props) {
        super(props);
        this.uniqueId=props.uniqueId;
        this.noteTitle = props.noteTitle;
        this.noteList = props.noteList;
        this.noteData = props.noteData;
        this.noteId = props.noteId;
        this.cardText = React.createRef();
        this.cardTitle = React.createRef();
        this.cardList = React.createRef();
        this.editBTN=React.createRef();
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
        this.state={
            show:false,
            nodeIdType:'',
            noteId:''
        }
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
            this.editBTN.current.id=this.uniqueId+"list";
            this.props.noteList.forEach((val)=>{
                let el = document.createElement("p");
                el.innerHTML = `<input type="checkbox"></input>${val}`;
                this.cardList.current.appendChild(el);
                })
        }
        else
        {
            if(this.noteData.src){
                this.editBTN.current.id=this.uniqueId+"image";
                this.cardText.current.appendChild(this.noteData);
            }
            else if(this.noteData){
                this.editBTN.current.id=this.uniqueId+"text";
                this.cardText.current.innerHTML = this.noteData;
            }
        }
    }

    //editnode function
    editNOTE=(e)=>
    {
        const noteIdWithType=e.target.id;
        const noteId=noteIdWithType.substr(0,20);
        const type=noteIdWithType.substr(20, noteIdWithType.length);
        this.setState({ show:true, nodeIdType:type, noteId:noteId })
    }

    handleClose=()=>
    {
        this.setState({ show:false })
    }

    render() {
        //alert(this.noteData.src);
        return (
            <>
            <Draggable draggableId={this.props.noteId} index={this.props.index}>
                {(provided) => (
                    <div 
                        className="card notes" 
                        style={{width: 20 + 'rem', margin:"auto", marginBottom: 8}} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps} 
                        innerref={provided.innerRef} 
                        ref={provided.innerRef}
                    >
                        <div className="buttonbar">
                            <button onClick={()=> this.handleRemoveNote(this.noteId)} type="submit" className="cross">&otimes;</button>
                        </div>
                        <div className="card-body cdb">
                            {
                                this.noteTitle === "" ? <h5 className="card-title cdt" ref={this.cardTitle}>New Note</h5>
                                :
                                <div>
                                    <span className="card-title cdt" ref={this.cardTitle}>{this.noteTitle}</span>
                                    {/* edit not button */}
                                    <button ref={ this.editBTN } className="btn btn-sm btn-warning mt-1 mb-1" onClick={this.editNOTE}>edit</button>
                                </div>
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
                )}
            </Draggable>
            { this.state.show ? <EditNode 
            show={ this.state.show } 
            handleClose={this.handleClose} 
            id={ this.state.noteId }
            type={ this.state.nodeIdType }
            /> : null }
            </>
        );
    }
}

                        
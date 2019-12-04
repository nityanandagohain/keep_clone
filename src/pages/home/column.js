import React, { Component } from 'react';
import Note from '../note/note';
import './home.css';
import { Droppable } from 'react-beautiful-dnd';
import fire from '../../config/fire'

export default class Column extends Component {

    removeNote=(id)=>
    {
        this.props.removeNote(id);
        // fire.database().ref(`${this.props.uid}/notes/${id}`).remove()
        // .then((res)=>
        // {
        //     console.log(res);
        // })
        // .catch((err)=>
        // {
        //     console.log(err);
        // })
        // console.log(fire.auth());
        // console.log(id);
        // fire.database().ref(this.props.uid).child('notes').remove()
        // this.db.ref(`notes/${id}`).remove()
        // .then((res)=>
        // {
        //     console.log(res);
        // })
        // .catch((err)=>
        // {
        //     console.log(err);
        // })
    }
    render() {
        return (
            <div className="notesContainer" style={{width: 400, margin: 'auto'}}>
                <header>
                    <h2>{this.props.column.title}</h2>
                </header>
                <Droppable droppableId={this.props.column.id}>
                    {(provided) => (
                        <div 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        >
                            {this.props.notes.map((note, index) => {
                                console.log(note);
                                return note ?  <Note 
                                    key={note.id} 
                                    noteList={note.noteList} 
                                    noteTitle={note.noteTitle} 
                                    noteData={note.noteData} 
                                    noteId={note.id} 
                                    removeNote={this.removeNote} 
                                    index={index} /> : null
                            })}
                            {provided.placeholder} 
                        </div>
                    )}  
                </Droppable>
            </div>
        )
    }
}
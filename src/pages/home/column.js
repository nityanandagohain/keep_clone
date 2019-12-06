import React, { Component } from 'react';
import Note from '../note/note';
import './home.css';
import { Droppable } from 'react-beautiful-dnd';
import fire from '../../config/fire'

export default class Column extends Component {

    removeNote=(id)=>
    {
        this.props.removeNote(id);
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
                                return note ?  <Note 
                                    key={note.id}
                                    uniqueId={ note.id }
                                    noteList={note.noteList} 
                                    noteTitle={note.noteTitle} 
                                    noteData={note.noteData} 
                                    noteId={note.id} 
                                    removeNote={this.removeNote}
                                    hideForm={this.props.hideForm}
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
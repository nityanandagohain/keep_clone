import React, { Component } from 'react';
import Note from '../note/note';
import './home.css';
import { Droppable } from 'react-beautiful-dnd';


export default class Column extends Component {
    
    render() {
        return (
            <div class="notesContainer" style={{width: 400, margin: 'auto'}}>
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
                                return <Note 
                                    key={note.id} 
                                    noteList={note.noteList} 
                                    noteTitle={note.noteTitle} 
                                    noteData={note.noteData} 
                                    noteId={note.id} 
                                    removeNote={this.removeNote} 
                                    index={index} /> 
                            })}
                            {provided.placeholder} 
                        </div>
                    )}  
                </Droppable>
            </div>
        )
    }
}
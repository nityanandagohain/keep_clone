import React, { Component } from 'react';
import Note from '../note/note';
import './home.css';


export default class Column extends Component {
    render() {
        return (
            <div class="notesContainer">
                <header>
                    <h2>{this.props.column.title}</h2>
                </header>
                <div>
                   {this.props.notes.map(note => <Note key={note.id} noteList={note.noteList} noteTitle={note.noteTitle} noteData={note.noteData} noteId={note.id} removeNote={this.removeNote} /> )} 
                </div>
            </div>
        )
    }
}
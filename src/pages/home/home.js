import React, { Component } from 'react';
import fire from '../../config/fire';
import Note from '../note/note';
import NoteForm from '../noteForm/noteForm';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.uid = props.uid; 
        this.logOut = this.logOut.bind(this);
        this.addNote = this.addNote.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.state = {
            notes: [],
        }
        this.db = fire.database().ref(this.uid).child('notes');
    }

    componentWillMount() {
        //Listen to the database if any new child is added
        this.db.on('child_added', snap => {
            console.log(snap);
            this.setState({
                notes: this.state.notes.concat({id: snap.key, noteTitle: snap.val().noteTitle, noteData: snap.val().noteData })
            })
        })

        this.db.on('child_removed', snap => {
            let prevNotes = this.state.notes;
            for (let i = 0; i < prevNotes.length; i++) {
                if (prevNotes[i].id === snap.key) {
                    prevNotes.splice(i, 1);
                }
            }
            console.log(prevNotes);
            this.setState({
                notes: prevNotes,
            })
        })
    }

    async logOut(e) {
        e.preventDefault();
        try {
            await fire.auth().signOut()
            .then(() => {
              this.setState({
                user: null
              });
            });
            console.log("Signot Successful");
        } catch (err) {
            console.log(err);
        }
    }

    addNote(title,data) {
        //Push the new note to the realtime database
        this.db.push().set({noteTitle: title, noteData: data });
    }

    removeNote(noteId) {
        this.db.child(noteId).remove();
    }
    render() {
        return (
            <div>
                <NoteForm addNote={this.addNote} />
                <div className="NotesArray">
                    <div className="Note">
                        {
                            this.state.notes.map((note) => {
                                return (

                                    <Note key={note.id} noteTitle={note.noteTitle} noteData={note.noteData} noteId={note.id} removeNote={this.removeNote} />
                                );
                            })
                        }
                    </div>
                </div>
                <button onClick={this.logOut} type="submit" className="btn btn-primary">LogOut</button>
            </div>
        );
    }
}
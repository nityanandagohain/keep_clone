import React, { Component } from 'react';
import fire from '../../config/fire';
import Note from '../note/note';
import NoteForm from '../noteForm/noteForm';
import './home.css';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.uid = props.uid; 
        this.logOut = this.logOut.bind(this);
        this.add = this.add.bind(this);
        this.addNote = this.addNote.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.state = {
            notes: [],
            addButton: true,
        }
        this.db = fire.database().ref(this.uid).child('notes');
    }

    componentWillMount() {
        //Listen to the database if any new child is added
        this.db.on('child_added', snap => {
            console.log(snap);
            /*Checking whether the input data is an image or plain text.
            (Although it is possible that this function incorrectly interprets
            the input type since it uses some initial keywords of base64 encoding
            of the image. A plain text maybe interpreted as image, although it
            is highly unlikely.)*/
            if(snap.val().noteData.substring(0,21) === "data:image/png;base64")
            {
                var img = new Image();
                img.src = snap.val().noteData;
                this.setState({
                    notes: this.state.notes.concat({id: snap.key, noteTitle: snap.val().noteTitle, noteData: img})
                })
            }
            else
            {
                this.setState({
                    notes: this.state.notes.concat({id: snap.key, noteTitle: snap.val().noteTitle, noteData: snap.val().noteData})
                })
            }
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

    add(e) 
    {
        if(this.state.addButton === true)
            this.setState({addButton: false});
        else
            this.setState({addButton: true});
    }
    render() {
        return (
            <div>
            <header>
                <h2>KEEP CLONE</h2>
                <button onClick={this.add} className="add"><span>+</span>AddNew</button>
                <button onClick={this.logOut} type="submit" className="logout">LogOut</button>
            </header>
            <div className="contain">
            <div className="card cd">
            {this.state.addButton === true ?
                <NoteForm addNote={this.addNote} />
                :null }
                </div>
                </div>
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
            </div>
        );
    }
}
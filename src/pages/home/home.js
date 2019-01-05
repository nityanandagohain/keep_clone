import React, { Component } from 'react';
import {markdown} from 'markdown';
import fire from '../../config/fire';
import Note from '../note/note';
import NoteForm from '../noteForm/noteForm';
import './home.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.uid = props.uid;
        this.deleteAcc = this.deleteAcc.bind(this);
        this.logOut = this.logOut.bind(this);
        this.add = this.add.bind(this);
        this.addNote = this.addNote.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.state = {
            notes: [],
            addButton: false,
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
                let myNoteTitle = markdown.toHTML(snap.val().noteTitle)
                this.setState({
                    notes: this.state.notes.concat({id: snap.key, noteTitle: myNoteTitle, noteData: img, noteList: []})
                })
            }
            else
            {
                let myNoteData = markdown.toHTML(snap.val().noteData);
                let myNoteTitle = markdown.toHTML(snap.val().noteTitle), myNoteList = [];
                if(snap.val().noteList)
                {
                    let listLen = snap.val().noteList.length;
                    for(let i = 0; i < listLen; i++)
                    {
                        myNoteList.push(markdown.toHTML(snap.val().noteList[i]));
                        console.log(myNoteList[i]);
                    }
                }
                this.setState({
                    notes: this.state.notes.concat({id: snap.key, noteTitle: myNoteTitle, noteData: myNoteData, noteList: myNoteList})
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
    addNote(title,data, list) {
        //Push the new note to the realtime database
        this.db.push().set({noteTitle: title, noteData: data, noteList: list });
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
    async deleteAcc(e) {
        e.preventDefault();
        var r = window.confirm("Are you sure you want to delete your account. All your data will be deleted permanently.");
        if (r == true) {
            var user = fire.auth().currentUser;
            user.delete().then(function() {
            // User deleted.
            alert('Delete successful.')
            }, function(error) {
            alert(error);
            });
        }
        else {
            alert("You pressed Cancel!");
        }
    }
    render() {
        return (
            <div className="bodyapp">
            <header>
                <h2>KEEP CLONE</h2>
                <button onClick={this.add} className="btn add"><span>+</span>AddNew</button>
                <button onClick={this.logOut} type="btn submit" className="logout">LogOut</button>
            </header>
            {this.state.addButton === true ?
                <div className="contain">
                <div className="card cd">
                    <NoteForm addNote={this.addNote} />
                </div>
                </div>
                :null }
                <div className="NotesArray Note">
                    {
                        this.state.notes.map((note) => {
                            return (
                                <Note key={note.id} noteList={note.noteList} noteTitle={note.noteTitle} noteData={note.noteData} noteId={note.id} removeNote={this.removeNote} />
                            );
                        })
                    }
               </div>
               <footer>
               <button onClick={this.deleteAcc} type="submit" className="delete">Delete Acc</button>
               </footer>
            </div>
        );
    }
}
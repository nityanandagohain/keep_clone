import React, { Component } from 'react';
import {markdown} from 'markdown';
import fire from '../../config/fire';
import NoteForm from '../noteForm/noteForm';
import SearchInput, {createFilter} from 'react-search-input';
import './home.css';
import Column from './column'
import { DragDropContext } from 'react-beautiful-dnd';


const KEYS_TO_FILTERS = ['noteData', 'noteList', 'noteTitle'];
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.uid = props.uid;
        this.deleteAcc = this.deleteAcc.bind(this);
        this.logOut = this.logOut.bind(this);
        this.addNote = this.addNote.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.searchUpdated = this.searchUpdated.bind(this)
        this.state = {
            notes: [],
            columns: {
                'column-1': {
                    id: 'column-1',
                    title: 'Notes',
                    noteIds: []
                }
            },
            columnOrder: ['column-1'],
            searchTerm: '',
            showForm: false
        }
        this.db = fire.database().ref(this.uid).child('notes');
        this.hide_form = this.hide_form.bind(this);
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
                    notes: this.state.notes.concat({id: snap.key, noteTitle: myNoteTitle, noteData: img, noteList: []}),
                    columns: {
                        'column-1': {
                            ...this.state.columns['column-1'],
                            noteIds: this.state.notes.map(note=> note.id)
                        }
                    }
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
                    notes: this.state.notes.concat({id: snap.key, noteTitle: myNoteTitle, noteData: myNoteData, noteList: myNoteList}),
                    columns: {
                        'column-1': {
                            ...this.state.columns['column-1'],
                            noteIds: this.state.notes.map(note=> note.id)
                        }
                    }
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
    async deleteAcc(e) {
        e.preventDefault();
        var r = window.confirm("Are you sure you want to delete your account. All your data will be deleted permanently.");
        if (r === true) {
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
    searchUpdated (term) {
        this.setState({searchTerm: term})
        console.log(term);
    }
    hide_form() {
        this.setState(prevState => {
            return {
                showForm: !prevState.showForm
            }
        });
    }

    onDragEnd = result => {
        console.log(result)
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const column = this.state.columns[source.droppableId];
        const newNoteIds = Array.from(column.noteIds);
        newNoteIds.splice(source.index, 1);
        newNoteIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            noteIds: newNoteIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newColumn.id]: newColumn,
            },
        };
        
        this.setState(newState)
    }

    render() {
        const filteredNotes = this.state.notes.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
        const column = this.state.columns['column-1'];
        const notes = column.noteIds.map(noteId => filteredNotes.find((note) => note.id === noteId))
        return (
            <div className="bodyapp">
            <header>
                <h2>Keep Clone</h2>
                <button onClick={this.hide_form} className="add"><span>&oplus;</span>Add New</button>
                <button onClick={this.logOut} type="submit" className="logout">Logout</button>
            </header>
            {
                this.state.showForm &&
                <div className="contain">
                <div className="card cd">
                    <NoteForm addNote={this.addNote} hideForm={this.hide_form} />
                </div>
                </div>
            }
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="NotesArray Note">
                    <Column key={column.id} column={column} notes={notes}/>
                </div>
            </DragDropContext>

            <footer>
                <SearchInput className="search-input" onChange={this.searchUpdated} />
                <button onClick={this.deleteAcc} type="submit" className="delete">Delete Acc</button>
            </footer>
            </div>
        );
    }
}
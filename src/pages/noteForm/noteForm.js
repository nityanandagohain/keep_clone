import React, { Component, Fragment } from 'react';
import WriteByHand from '../inputMethods/WriteByHand';
import WriteByKeyboard from '../inputMethods/WriteByKeyboard';
// element is defined but never used, so I commented it out.
// import { element } from 'prop-types';
import './noteForm.css';

export default class NoteForm extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.addNote = this.addNote.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.state = {
            noteList: [],
            newNoteData: "",
            newNoteTitle: "",
            inputMode: "WriteByKeyboard", // Loading standard keyboard input as default.
            closeButton: false,
            notesType:''
        }
        this.closeForm = this.closeForm.bind(this);
    }

    //set if user typing notes in list or text
    setNotesType=(type)=>
    {
        this.setState({ notesType: type})
    }

    addNote(e) {
        e.preventDefault();
        //Passing the title and data to the function in home.js
        console.log(this.state.notesType);
        if (!this.state.newNoteTitle) {
            alert('Please add title');
        } else if (this.state.newNoteData==='' && this.state.notesType==='text') {
            alert('Please fill all fields');
        } else if (this.state.noteList.length===0 && this.state.notesType==='list') {
            alert('Please fill all fields');
        } else {
            this.props.addNote(this.state.newNoteTitle, this.state.newNoteData, this.state.noteList);
            //Clearing the data form the inputs
            this.setState({
                noteList: [],
                newNoteData: "",
                newNoteTitle: ""
            })
        }
    }
    handleChange(e) {
        // console.log(e.target.value);
        if(e.target.id === "can")           // If description is hand drawn then converting it in dataURL.
            this.setState({newNoteData: e.target.toDataURL()});
        else
            this.setState({ [e.target.name]: e.target.value });
    }
    changeMode(e)             // Switching input methods.
    {
        if(this.state.inputMode === "WriteByKeyboard")
            this.setState({inputMode: "WriteByHand", newNoteData: ""});
        else
            this.setState({inputMode: "WriteByKeyboard", newNoteData: ""});
    }
    closeForm() {
        this.setState(prevState => {
            return {
                closeButton: !prevState.closeButton
            };
        });
    }
    render() {
        return (
            
            <Fragment>
            <div className="card-header">
                <button onClick={this.props.hideForm} type="submit" className="cross"><i class="fas fa-times-circle"></i></button>
            </div>
            <div className="card-body">
            <form>
                <div className="form-group fcontrol">
                    <label htmlFor="exampleFormControlInput1">Title</label>
                    <input value={this.state.newNoteTitle} onChange={this.handleChange} name="newNoteTitle" className="form-control" id="exampleFormControlInput1" placeholder="title"/>
                </div>
                {this.state.inputMode === "WriteByKeyboard" ?
                <WriteByKeyboard setNotesType={ this.setNotesType } noteList={this.state.noteList} val={this.state.newNoteData} addNote={this.addNote} changeMode={this.changeMode} onChange={this.handleChange}/>
                : <WriteByHand onChange = {this.handleChange} addNote={this.addNote} changeMode={this.changeMode}/>}
             </form>
            </div>
            </Fragment>
        );
    }
}
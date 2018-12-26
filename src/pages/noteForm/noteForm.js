import React, { Component } from 'react';
import WriteByHand from '../inputMethods/WriteByHand';
import WriteByKeyboard from '../inputMethods/WriteByKeyboard';
import { element } from 'prop-types';
import './noteForm.css';
export default class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.addNote = this.addNote.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.state = {
            newNoteData: "",
            newNoteTitle: "",
            inputMode: "WriteByKeyboard" // Loading standard keyboard input as default.
        }
    }
    
    addNote(e) {
        e.preventDefault();
        //Passing the title and data to the function in home.js
        this.props.addNote( this.state.newNoteTitle, this.state.newNoteData);
        //Clearing the data form the inputs
        this.setState({
            newNoteData: "",
            newNoteTitle: ""
        })
    }
    handleChange(e) {
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
    render() {
        return (
            <form>
                <div className="form-group fcontrol">
                    <label htmlFor="exampleFormControlInput1">Title</label>
                    <input value={this.state.newNoteTitle} onChange={this.handleChange} name="newNoteTitle" className="form-control" id="exampleFormControlInput1" placeholder="title"/>
                </div>
                {this.state.inputMode === "WriteByKeyboard" ?
                <WriteByKeyboard val = {this.state.newNoteData} addNote={this.addNote} changeMode={this.changeMode} onChange={this.handleChange}/>
                : <WriteByHand onChange = {this.handleChange} addNote={this.addNote} changeMode={this.changeMode}/>}
            </form>
        );
    }
}
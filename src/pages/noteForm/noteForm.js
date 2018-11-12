import React, { Component } from 'react';

export default class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.addNote = this.addNote.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            newNoteData: "",
            newNoteTitle: ""
        }
    }
    addNote(e) {
        e.preventDefault();
        //Passing the title and data to the function in home.js
        this.props.addNote(this.state.newNoteTitle, this.state.newNoteData);

        //Clearing the data form the inputs
        this.setState({
            newNoteData: "",
            newNoteTitle: ""
        })
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Title</label>
                    <input value={this.state.newNoteTitle} onChange={this.handleChange} name="newNoteTitle" className="form-control" id="exampleFormControlInput1" placeholder="title" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                    <textarea value={this.state.newNoteData} onChange={this.handleChange} name="newNoteData" className="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="new note ..."></textarea>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <button onClick={this.addNote} type="submit" className="btn btn-primary">Add Note</button>
                    </div>
                </div>
            </form>
        );
    }
}
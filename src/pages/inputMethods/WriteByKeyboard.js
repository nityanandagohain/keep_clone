import React, {Component} from 'react';
import handWrite from '../inputMethods/handWrite.png';

export default class WriteByKeyboard extends Component
{
    render()
    {
        var mystyle = {marginLeft: "95%"};
        return (<div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Description</label>
        <textarea onChange={this.props.onChange} value = {this.props.val} name="newNoteData" className="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="new note ..."></textarea>
        <button style={mystyle} onClick={this.props.changeMode}><img width="40" height="40" title="Write By Hand" src={handWrite} alt="Write By Hand"/></button>
        <div className="form-group row">
            <div className="col-sm-10">
                <button onClick={this.props.addNote} type="submit" className="btn btn-primary">Add Note</button>
            </div>
        </div>
        </div>);
    }
}
import React, {Component} from 'react';
import handWrite from '../inputMethods/handWrite.png';
import './Write.css';
export default class WriteByKeyboard extends Component
{
    render()
    {
        return (<div className="form-group fcontrol">
        <a href="#" className="option noteb" onClick={this.props.changeMode}><img width="30" height="20" title="Write By Hand" src={handWrite} alt="Write By Hand"/></a>
        <label htmlFor="exampleFormControlTextarea1">Description</label>
        <textarea onChange={this.props.onChange} value = {this.props.val} name="newNoteData" className="form-control des" id="exampleFormControlTextarea1" rows="7" placeholder="new note ..."></textarea>
                <button onClick={this.props.addNote} type="submit" className="btn btn-block">Add Note</button>
        </div>);
    }
}
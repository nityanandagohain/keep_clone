import React, {Component} from 'react';
import handWrite from '../inputMethods/handWrite.png';
import './Write.css';

export default class WriteByKeyboard extends Component
{
    constructor(props)
    {
        super(props);
        this.addListB = this.addListB.bind(this);
        this.state = {
            list: false,
            userinput: '',
        };
    }

    addListB(e) 
    {
        if(this.state.list === true)
            this.setState({list: false,});
        else
            this.setState({list: true,});
    }
    changeUserInput(input){
        this.setState({
            userinput: input, 
        })
    }
    addList(input){
        let listArray = this.props.noteList;
        listArray.push(input);
        this.setState({
            noteList: listArray,
            userinput: "",
        })
    }
    render()
    {
        return ( 
            <div className="form-group fcontrol">
            <a href="#" className="option noteb" onClick={this.props.changeMode}><img width="30" height="20" title="Write By Hand" src={handWrite} alt="Write By Hand"/></a>
            {this.state.list === false ? 
                <a href="#" onClick={this.addListB} className="btn clear">List</a>  
            :
                <a href="#" onClick={this.addListB} className="btn clear">Text</a>
            }
            <label htmlFor="exampleFormControlTextarea1">Description</label>
            {this.state.list === false ? 
                <textarea onChange={this.props.onChange} value={this.props.val} name="newNoteData" className="form-control des" id="exampleFormControlTextarea1" rows="7" placeholder="new note..."></textarea>
            :   
                <div class="form-group listf">
                    <div className="listd">
                    <a href="#" onClick={()=>this.addList(this.state.userinput)} className="addl">+</a>
                        <input 
                            onChange={ (e)=>this.changeUserInput(e.target.value)} 
                            type="text" 
                            value={this.state.userinput} 
                            name="noteList" 
                            className="forml" 
                            id="exampleFormControlTextarea1" 
                            placeholder="new note..."
                        />
                    </div>
                    <div className="card-title">
                       {this.props.noteList.map((val)=>
                       <li className="linote"><span className="hh">&rarr;</span> {val}</li>
                       )} 
                    </div>
                </div>
            }
            <button onClick={this.props.addNote} type="submit" className="btn btn-block">Add Note</button>
        </div>);
    }
}
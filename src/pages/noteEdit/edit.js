import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import handWrite from '../inputMethods/handWrite.png';
import fire,{ auth } from '../../config/fire';
import EditDraw from './editDRAW';
import EditNrmlNote from './editNrmlNote';
import './edit.css'



class EditNode extends React.Component
{
    state={
        list:[],
        listTitle:'',
        text:'',
        textTitle:'',
        image:'',
        imageTitle:'',
        newList:[],
        newListItem:''
    }

    componentDidMount(){
        const userid=fire.auth().currentUser.uid;
        fire.database().ref(userid+"/notes/"+this.props.id).on('value',(snap)=>
        {
            let data=snap.val();
            this.setState({ list:data.noteList, listTitle:data.noteTitle })
        })
    }

    listRemove=(e, item)=>{
        e.target.parentElement.parentElement.remove();
        this.state.list=this.state.list.filter((f)=>{ return f!==item })
    }

    addNewList=(e)=>{
        this.setState({ newList:[...this.state.newList,this.state.newListItem] })
    }

    updateNew=(e)=>
    {
        this.setState({ newListItem:e.target.value })
    }

    updateExist=(e,index)=>{
        let newList=[...this.state.list];
        newList[index]=e.target.value;
        this.setState({ list:newList });
    }

    submitNote=()=>
    {
        let pushableNotes=[];
        pushableNotes=[...this.state.newList, ...this.state.list];
        const userid=fire.auth().currentUser.uid;
        const updates={
            noteData:'',
            noteList:pushableNotes,
            noteTitle:this.state.listTitle
        }
        fire.database().ref(userid+"/notes/"+this.props.id).update(updates);
    }

    render(){
        return(
            <React.Fragment>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        <div className="form-group fcontrol">
                            <label htmlFor="exampleFormControlInput1">Title</label>
                            <input value={this.state.listTitle} name="newNoteTitle" className="form-control" id="exampleFormControlInput1" placeholder="title"/>
                        </div>
                            {
                                this.props.type==='list' ?  <div className="form-group fcontrol">
            
                                <label htmlFor="exampleFormControlTextarea1">Description</label>
                                <div className="des-options">
                                    <a href="#" className="option noteb"><img width="30" height="20" title="Write By Hand" src={handWrite} alt="Write By Hand"/></a>
                                        <a href="#" className="btn">List</a>  
                                </div>  
                                    <div className="form-group listf">
                                        <div className="listd">
                                        <a href="#" className="addl" onClick={ this.addNewList }>+</a>
                                        <input type="text" name="noteList" className="forml" placeholder="new note" onChange={this.updateNew} />
                                        { this.state.list.length>0 ? this.state.list.map((item, i)=>
                                        {
                                            return(
                                                <div key={ i }>
                                                    <input onChange={ (e)=>{ this.updateExist(e,i) } } type="text" name="noteList" className="forml" id="exampleFormControlTextarea1" placeholder={ item } />
                                                    <button className="mb-5" onClick={ (e)=>{ this.listRemove(e,item) } }>
                                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            )
                                        }) : null }
                                        </div>
                                        <div className="card-title">
                                           {this.state.newList.map((val)=>
                                           <li className="linote"><span className="hh">&rarr;</span> {val}</li>
                                           )} 
                                        </div>
                                    </div>
                                <button 
                                onClick={this.submitNote}
                                type="submit" 
                                className="btn btn-block">Update Note</button>
                            </div> : null
                            }
                            {
                                this.props.type==='image' ? <EditDraw imageId={ this.props.id } /> : null
                            }
                            {
                                this.props.type==='text' ? <EditNrmlNote textId={ this.props.id } /> : null
                            }
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

export default EditNode;
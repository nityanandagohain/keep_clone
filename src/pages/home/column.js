import React, { Component, Fragment } from 'react';
import Note from '../note/note';
import './home.css';
import { Droppable } from 'react-beautiful-dnd';
import fire from '../../config/fire';

export default class Column extends Component {

    removeNote=(id)=>
    {
        this.props.removeNote(id);
    }
    render() {
        return (
          <Fragment>
                
                    
            <div className="card"  style={{width : '40%', marginTop : '15px'}}>
                <div className="card-header">
                    <button type="button" className="btn1 btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                        <h2 style={{fontSize: '25px'}}>{this.props.column.title}</h2>
                    </button>
                </div> 
            </div>
          
              
                <Droppable droppableId={this.props.column.id}>
                    {(provided) => (
                        <div 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        >
                        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h2 className="modal-title" id="exampleModalCenterTitle">Notes</h2>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
     <div className="row">
                        
                        {
                        this.props.notes.map((note, index) => {
                            return note ? (
                               
                                <div className="col-lg-9 col-md-9 col-sm-8" style={{ margin : '2px auto'}}>
                                            <Note 
                                                key={note.id}
                                                uniqueId={ note.id }
                                                noteList={note.noteList} 
                                                noteTitle={note.noteTitle} 
                                                noteData={note.noteData} 
                                                noteId={note.id} 
                                                removeNote={this.removeNote}
                                                hideForm={this.props.hideForm}
                                                index={index} /> 
                                </div>): null
                        })}
                         </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>
                            
                        
                            {provided.placeholder}   
                         
                            </div> 
                            
                        
                    )}  
                      </Droppable>
              
  </Fragment>
        )
    }
}
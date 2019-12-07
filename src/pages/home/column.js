import React, { Component } from 'react';
import Note from '../note/note';
import './home.css';
import { Droppable } from 'react-beautiful-dnd';
import fire from '../../config/fire'

export default class Column extends Component {

    removeNote=(id)=>
    {
        this.props.removeNote(id);
    }
    render() {
        return (
            <div className="container">
                
                    
            <div className="card"  style={{width : '60%'}}>
            <div className="card-header">
                <h2>{this.props.column.title}</h2>
            </div>
               <div className="card-body">
                <Droppable droppableId={this.props.column.id}>
                    {(provided) => (
                        <div 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        >
                            
                                <div className="row">
                        
                            {
                            this.props.notes.map((note, index) => {
                                return note ? (
                                    <div className="col-md-8 col-sm-8" style={{margin : '0 auto'}}>
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
                            
                            {provided.placeholder}   
                         
                            </div> 
                            
                        
                    )}  
                      </Droppable>
                </div>
                </div>
               
            </div> 
           
           
        )
    }
}
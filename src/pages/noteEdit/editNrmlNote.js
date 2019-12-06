import React,{ useState, useEffect } from 'react';
import './edit.css';
import fire from '../../config/fire'

const EditNrmlNote=(props)=>
{
    const [ noteText, setNoteText ]=useState('');
    const [ noteTitle, setNoteTitle ]=useState('');

    useEffect(()=>
    {
        const userid=fire.auth().currentUser.uid;
        fire.database().ref(userid+"/notes/"+props.textId).on('value',(snap)=>
        {
            let data=snap.val();
            setNoteText(data.noteData);
            setNoteTitle(data.noteTitle);
        })
    },[])

    const addNote=()=>
    {
        const userid=fire.auth().currentUser.uid;
        const updates={
            noteData:noteText,
            noteTitle:noteTitle
        }
        console.log(updates);
        fire.database().ref(userid+"/notes/"+props.textId).update(updates);
    }

    const updateNote=(e)=>
    {
        setNoteText(e.target.value);
    }

    return(
        <React.Fragment>
            <div className="form-group control">
                <textarea 
                onChange={ updateNote } 
                value={ noteText } 
                name="newNoteData" 
                className="form-control des" 
                id="exampleFormControlTextarea1" 
                rows="7" 
                placeholder="new note..."></textarea>
            </div>
            <button onClick={ addNote } type="submit" className="btn btn-block">Update Note</button>
        </React.Fragment>
    )
}


export default EditNrmlNote;
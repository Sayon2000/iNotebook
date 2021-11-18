import React, {useState , useContext} from 'react'
import noteContext from '../context/notes/noteContext'



export const Addnote = (props) => {
    const context = useContext(noteContext)
    const {Addnotes} = context
    const initialNote = {
        "title" : "",
        "description" : "",
        "tag" : ""
    }
    const [note, setNote] = useState(initialNote)
    const handleChange = (e)=>{
        setNote({...note , [e.target.name] : e.target.value})
    }
    const addNote = (e)=>{
        
        e.preventDefault();
        Addnotes(note)
        setNote(initialNote)
        props.showAlert("Notes added", "success")

    }
    return (
        <div className="container my-3">
        <h2>Add a note</h2>
        <form className="my-3"> 
        <div className="form-group">
            <label htmlFor="title">Enter title</label>
                <input type="text" name="title" className="form-control shadow-none" id="title" value={note.title} placeholder="Enter title" onChange={handleChange}/>
            
        </div>
        <div className="form-group">
            <label htmlFor="description">Enter Description</label>
            <input type="text" className="form-control shadow-none" value={note.description} name="description" id="description" placeholder="Enter description" onChange={handleChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="tag">Enter Tag</label>
            <input type="text" value={note.tag} className="form-control shadow-none" name="tag" id="tag" placeholder="Enter tag" onChange={handleChange}/>
        </div>

        <button disabled={!note.title} type="submit" className="btn btn-primary mt-2" onClick={addNote}>Submit</button>
        </form>
        
        </div>
    )
}

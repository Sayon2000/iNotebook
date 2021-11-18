
import React, { useContext, useEffect, useRef ,useState} from 'react'
import noteContext from '../context/notes/noteContext'
import { Noteitem } from './Noteitem'
import { Addnote } from './Addnote'
import { useHistory } from 'react-router-dom'
export const Notes = (props) => {
    let history = useHistory();
    
    const [edit, setedit] = useState(false)
    const context = useContext(noteContext)
    const { getAllNotes, notes , updateNotes} = context;

    const initialNote = {
        "id" : "",
        "title" : "",
        "description" : "",
        "tag" : ""
    }
    
    const [note, setNote] = useState(initialNote)
    useEffect(() => {
        if(localStorage.getItem('token')){

            getAllNotes()
        }else{
            history.push("/login")
        }

        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const cbtn = useRef(null)
    const editNote = (cNote) => {

        ref.current.click()
        setNote({
            "eid" : cNote._id,
            "etitle" : cNote.title,
            "edescription" : cNote.description,
            "etag" : cNote.tag
        })

    }
    
    
    const updateNote = ()=>{
        
        updateNotes(note)
        cbtn.current.click()
        props.showAlert("Notes updated", "success")        

        

    }

    const handleChange = (e)=>{
        e.preventDefault()
        setedit(true)
        setNote({...note , [e.target.name] : e.target.value})
    }


    return (
        <>
            <Addnote showAlert={props.showAlert}/>

            <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{
                display: 'none'
            }}>
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="form-group">
                                    <label htmlFor="etitle">Enter title</label>
                                    <input type="text" name="etitle" className="form-control shadow-none" id="etitle" value={note.etitle} placeholder="Enter title" onChange={handleChange} />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="edescription">Enter Description</label>
                                    <input type="text" className="form-control shadow-none" value={note.edescription} name="edescription" id="edescription" placeholder="Enter description" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="etag">Enter Tag</label>
                                    <input type="text" value={note.etag} className="form-control shadow-none" name="etag" id="etag" placeholder="Enter tag" onChange={handleChange} />
                                </div>

                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={cbtn} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" disabled={!edit} onClick={updateNote}>Update note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h3>Your Notes</h3>
                {notes.length ===0 && "No notes to display"}
                <div className="row">

                    {

                        notes.map((note) => {



                            return <Noteitem showAlert={props.showAlert} key={note._id} editNote={editNote} note={note} />

                        })
                    }


                </div>
            </div>
        </>
    )
}

import React , {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

export const Noteitem = (props) => {
    const {note , editNote} = props;
    const {title , description} = note;
    const context = useContext(noteContext)
    const {DeleteNote} = context;
    return (
        <div className="col-md-3 my-3">
            <div className="card ">
                
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    
                    <i className="fa fa-trash-o mx-3" onClick={()=>{
                        DeleteNote(note._id)
                        props.showAlert("Notes deleted", "success")
                    }}></i>
                        
                    <i className="fa fa-pencil mx-3" onClick={()=>{
                        editNote(note)
                        
                    }}></i>
                </div>
            </div>
        </div>
    )
}

import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"


    const [notes, setNotes] = useState([])

    //adding a note

    const Addnotes = async(note) => {
        const {title,description , tag} = note;
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            
            headers: {
              'Content-Type': 'application/json',
              "auth-token" : localStorage.getItem('token')
              
            },
            
            body: JSON.stringify({title,description,tag}) 
          });
        await response.json()
        
        getAllNotes()
    }

    //Deleting a note

    const DeleteNote = async(id)=>{
        //API call

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", 
            
            headers: {
              'Content-Type': 'application/json',
              "auth-token" : localStorage.getItem('token')
              
            }            
            
          });
          const json = await response.json()
          

        // let newNotes = notes.filter(note => note._id !== id);
        await getAllNotes()
    }

    //editing a note
    const updateNotes =async (note)=>{
      const id = note.eid;
      const {etitle, edescription , etag} = note;
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        
        headers: {
          'Content-Type': 'application/json',
          "auth-token" : localStorage.getItem('token')
          
        },
        
        body: JSON.stringify({title : etitle,description : edescription,tag : etag}) 
      });
    const json = await response.json()
    await getAllNotes()

    

      


    }

    const getAllNotes = async ()=>{
        
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", 
            
            headers: {
              'Content-Type': 'application/json',
              "auth-token" : localStorage.getItem('token')
              
            }
            
            
          });
          const json = await response.json()
         
          setNotes(json)
    }
    


    // const postData = async(url,  data) =>{
        
    //     const response = await fetch(url, {
    //       method: "POST",
          
    //       headers: {
    //         'Content-Type': 'application/json',
    //         "auth-token" : localStorage.getItem('token')
            
    //       },
          
    //       body: JSON.stringify(data) 
    //     });
    //     const json = await response.json()
    //     return json
    //   }
    

    return (
        <NoteContext.Provider value={{ notes, setNotes , Addnotes , DeleteNote , updateNotes , getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;
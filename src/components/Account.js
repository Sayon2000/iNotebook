import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router'

export const Account = () => {
    let history = useHistory()
    if(!localStorage.getItem('token')){
        history.push("/login")
    }
    const [data, setdata] = useState({
        name:"",
        email:""
    })
    
    const fetchdata= async()=>{
        console.log(data.name)



   
        await fetch("http://localhost:5000/api/auth/getuser", {
            method: "POST",

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')

            }


        }).then(elem =>{
            
            elem.json().then(json => {
               
                    setdata({
                        name:json.name,
                        email : json.email
                    })
                
            })
            
        }).catch(err =>{
            console.log(err.message)
        })
    }
   useEffect(() => {
       fetchdata()

   }, [])
    
        
   


    return (
        <div className="container">
            <h2>Profile</h2>
            <strong>Name : </strong><p>{data.name}</p>
            <strong>Email : </strong><p>{data.email}</p>
        </div>
    )
}

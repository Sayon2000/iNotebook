import React , {useState}from 'react'
import { useHistory } from "react-router-dom";

export const Login = (props) => {
    let history = useHistory();
    const [credentials, setcredentials] = useState({
        email : "",
        password : ""
    })
    const handleChange = (e)=>{
        setcredentials({...credentials , [e.target.name] : e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 
            
            headers: {
              'Content-Type': 'application/json'
              
            },
            body : JSON.stringify({email : credentials.email , password : credentials.password})
            
            
          });
          const json = await response.json()
          console.log(json)
          if(json.success){

          
          localStorage.setItem('token' , json.token)
          
          console.log(json)
          history.push("/")
          props.showAlert("Logged in" , "success")
          }
          else{
            props.showAlert(json.message, "danger")
          }
    }
    return (
        <div style={{
            position: "relative",
            top :"50px"
        }}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" value={credentials.email} onChange={handleChange} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" value={credentials.password} onChange={handleChange} className="form-control" id="exampleInputPassword1" name="password" placeholder="Password"/>
                </div>

                <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
        </div>
    )
}

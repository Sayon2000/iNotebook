import React , {useState} from 'react'
import { useHistory } from 'react-router';
export const Signup = (props) => {
    let history = useHistory();
    const [credentials, setcredentials] = useState({
        name:"",
        email : "",
        password : "",
        cpassword: ""

    })
    const handleChange = (e)=>{
        setcredentials({...credentials , [e.target.name] : e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/create", {
            method: "POST", 
            
            headers: {
              'Content-Type': 'application/json'
              
            },
            body : JSON.stringify({name : credentials.name,email : credentials.email , password : credentials.password})
            
            
          });
          const json = await response.json()
          if(json.success){

          
          localStorage.setItem('token' , json.token)
          
          console.log(json)
          history.push("/")
          props.showAlert("Signned in" , "success")
          }
          else{
            props.showAlert("email in use " , "success")
          }
    }
    return (
        <div style={{
            position: "relative",
            top :"50px"
        }}>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text"  onChange={handleChange} className="form-control" id="name" name="name" value={credentials.name} placeholder="Enter your name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" value={credentials.email} onChange={handleChange} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" required minLength={5} value={credentials.password} onChange={handleChange} className="form-control" id="password" name="password" placeholder="Password"/>
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" required minLength={5} value={credentials.cpassword} onChange={handleChange} className="form-control" id="cpassword" name="cpassword" placeholder="Password"/>
                </div>


                <button disabled={credentials.password !== credentials.cpassword} type="submit" className="btn btn-primary mt-2" >Submit</button>
            </form>
        </div>
    )
}

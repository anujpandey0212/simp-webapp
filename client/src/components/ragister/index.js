import React from "react";
import "./ragister.css";

export default function Ragister(){

    const [data,setData]=React.useState(null);

    React.useEffect(()=>{
        fetch("/signin")
            .then((res)=>res.json())
            .then((data)=>{setData(data)})
    })

    function handelsubmit(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: document.getElementById('usernamefield').value,
            password:document.getElementById('userpasswordfield').value,
            ragistered:true,
            })
        };
        fetch('/signin', requestOptions)
        localStorage.setItem("isAuthenticated", "true");
    }
    return (
        <div>
            <form>
                <div className="form-group">
                    <label>Name</label>
                    <input type="email" className="form-control" id="usernamefield" aria-describedby="emailHelp" placeholder="Enter name"></input>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" id="userpasswordfield" placeholder="Password"></input>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handelsubmit}>Submit</button>
                </form>
        </div>
    )
}
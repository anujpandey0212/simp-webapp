import React from "react";
import "./signin.css";

export default function Login(){

    const [data,setData]=React.useState(null);

    React.useEffect(()=>{
        fetch("/signin")
            .then((res)=>res.json())
            .then((data)=>{
                setData(data)
            })
    })

    function handelsubmit(){
        console.log(data);
        if(document.getElementById("usernamefield").value==""){
            window.alert("enter fields brother")
        }
        else{
            data.forEach(element => {
                if(element.name==document.getElementById("usernamefield").value){
                    window.alert("name matched")
                    localStorage.setItem("isAuthenticated", "true");
                }
            }); 
        }
    }
    return (
        <div>
            <form>
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" id="usernamefield" aria-describedby="emailHelp" placeholder="Enter name"></input>
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
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "./AppContext";
function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const [login, setLogin] = useState(false);
    const {setUserInfo} = useContext(AppContext);
    function changedIt(event){
        const name = event.target.name;
        const value = event.target.value;
        if(name === "emailField"){
            setEmail(value);
        }
        else{
            setPassowrd(value);
        }
    }
    async function clickedIt(event){
        event.preventDefault();
        const response = await fetch("http://localhost:4000/login",{
            method :"POST",
            body: JSON.stringify({email : email, password: password}),
            headers : {"Content-Type" : "application/json"},
            credentials: "include"
        });
        if(response.ok){
            response.json().then((info)=>{
                setUserInfo(info);
                setLogin(true);
            }
            );
        }
        else{
            alert("Login unsuccessful. Try again");
        }  
    }
    if(login){
        return <Navigate to = {"/"} />;
    }
    return (<div className="formParent">
    <h1>Welcome back</h1>
        <form className = "forms">
        <input type = "text" onChange = {changedIt} value = {email} name = "emailField" className="topInput" placeholder="Enter your email"/>
        <input type = "password" onChange = {changedIt} value = {password} name = "passwordField" className = "bottomInput" placeholder="Enter your password"/>
        <button type = "submit" onClick = {clickedIt}>Login</button>
        </form>
    </div>)
}

export default Login;
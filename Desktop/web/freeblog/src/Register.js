import { useState, useContext} from "react";
import UserContext from "./AppContext";
import { Navigate } from "react-router-dom";
function Register(){
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const {userInfo ,setUserInfo} = useContext(UserContext);
    const [leave, setLeave] = useState(false);
    async function regClicked(event){
        event.preventDefault();
        const response = await fetch("http://localhost:4000/register",{
            method :"POST",
            body: JSON.stringify({email : email, password: password}),
            headers : {"Content-Type" : "application/json"}
        });
        if(response.ok){
            response.json().then((info)=>{
                setUserInfo(info);
                setLeave(true);
            }
            );
        }
        else{
            alert("Registration unsuccessful. Try again")
        }

    }
    if(leave){
        return <Navigate to = {"/"} />;
    }
    function fieldClicked(event){
        const fieldName = event.target.name;
        const value = event.target.value;
        fieldName === "emailField" ? setEmail(value) : setPassword(value);
    }
    return (<div className="formParent">
    <h1>Welcome to FreeBlog</h1>
        <form className = "forms">
        <input type = "text" name = "emailField" onChange = {fieldClicked} value = {email} className="topInput" placeholder="Enter your email"/>
        <input type = "password" name = "passwordField" onChange = {fieldClicked} value = {password}  placeholder="Enter your password"/>
        <input type = "password" className = "bottomInput" placeholder="Confirm your password"/>
        <button type = "submit" onClick = {regClicked}>Register</button>
        </form>
    </div>)
}

export default Register;
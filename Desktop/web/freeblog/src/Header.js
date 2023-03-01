import { useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AppContext from "./AppContext";
function Header(){
const{userInfo, setUserInfo} = useContext(AppContext);
  useEffect(()=>{
    fetch("http;//localhost:4000/profile",{
      credentials : "include"
    }).then(response=>{
    
        response.json().then(
          items=>{
            setUserInfo(items);
          }
        )
    })
  },[])

  async function logout(){
    await fetch("http://localhost:4000/logout",{
    method : "POST",
    credentials : "include"
    });
    setUserInfo(null);
  }
    const userName = userInfo?.email;

    return (
        <header>
        <span><strong><Link to = "/" className="links">FreeBlog</Link></strong></span>
        { userName &&
        <ul>
          <li className="links">Hey {userName}</li>
          <li onClick = {logout}><Link to="" className="links">Logout</Link></li>
          <li><Link to = "/create" className="links">Create a new post</Link></li>
        </ul>
        }
        { !userName &&
        <ul>
          <li> <Link to = "/login" className="links">Login</Link></li>
          <li><Link to = "/register" className="links">Register</Link></li>
        </ul>
        }
       
      </header>
    );
}
export default Header;
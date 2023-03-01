import UserContext from "./AppContext";
import { useState } from "react";
const DetailsProvider = ({children})=>{
    const [userInfo, setUserInfo] = useState("");
    return(
       <UserContext.Provider value = {{userInfo, setUserInfo}}>
            {children}
       </UserContext.Provider>
    );
}
export  {DetailsProvider,UserContext};
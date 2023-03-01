import { useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import AppContext from "./AppContext";
const format = require("date-fns");
const parser = require("html-react-parser");

function PostPage(){
    const[info, setInfo] = useState(false);
    const {userInfo, setUserInfo} = useContext(AppContext);
    const {id} = useParams();
    useEffect(()=>{
        console.log(id);
        fetch(`http://localhost:4000/posts/${id}`).then(
            response => {
                response.json().then(
                    items =>{
                        setInfo(items);
                    }
                )
            }
        )
    }, []);

    return info && <div className="onePost">
        <h1>{info.title}</h1>
        <span>by {info.author.name} <time>{format.format(new Date(info.createdAt),"MMM d, yyyy HH:mm")}</time></span>
        {info.author._id === userInfo.id && <button class = "edit"><Link to = {`/edit/${info._id}`}>Edit this post</Link></button>}
        <img src = {"http://localhost:4000/"+info.image} alt = ""/>
        <p>{parser(info.text)}</p>
    </div>
}

export default PostPage;
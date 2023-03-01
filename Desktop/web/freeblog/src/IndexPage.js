import React, { useEffect, useState } from "react";
import Post from "./Post";
 function IndexPage(){
    const [posts, setPosts] = useState(null);
    useEffect(()=>{
        fetch("http://localhost:4000/post").then(
            response=> {
                response.json().then(
                    items=> setPosts(items)
                )
            }
        )
    },[]);
    return (
        <div>
            {posts && posts.map((item)=><Post title = {item.title} text = {item.text} time = {item.createdAt} author = {item.author}  image = {item.image} id = {item._id} />)}
        </div>
    )
 }
 export default IndexPage;
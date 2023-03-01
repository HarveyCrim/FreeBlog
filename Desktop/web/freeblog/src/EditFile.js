import ReactQuill from 'react-quill';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import "react-quill/dist/quill.snow.css"
const Parser = require("date-fns");

function EditPost(){
    const[title, setTitle] = useState("");
    const[summary, setSummary] = useState("");
    const[text, setText] = useState("");
    const[file, setFile] = useState("");
    const[redirect, setRedirect] = useState(false);
    const {pageId} = useParams();
    useEffect(()=>{
        fetch(`http://localhost:4000/edit/${pageId}`).then(response=>
            response.json().then( items =>{
                setTitle(items.title);
                setText(items.text);
                setSummary(items.summary);
            }
            )
        )
    },[])
    async function editIt(event){
        event.preventDefault();
        const data = new FormData();
        data.set("title", title);
        data.set("summ" , summary);
        data.set("text" , text);
        data.set("_id" , pageId)
        data.set("file" ,file[0]);
        const response = await fetch(`http://localhost:4000/post`,{
            method: "PUT",
            body : data,
            credentials : "include"
        });
        if(response.ok){
            console.log("done");
            setRedirect(true);
        }
    }
    function changedIt(event){
        const name = event.target.name;
        const value = event.target.value;
        if(name === "postTitle"){
            setTitle(value);
        }
        else if(name === "postSummary"){
            setSummary(value);
        }
    }
    if(redirect){
        return <Navigate to = {"/"} />
    }
    return (
        <div>
        <form onSubmit={editIt}>
        <input className = "createArea"type = "title" name = "postTitle" onChange = {changedIt} value = {title} placeholder = "title"/>
        <input className = "createArea"type = "summary" name = "postSummary" onChange = {changedIt} value = {summary} placeholder = "summary"/>
        <p className = "imgSec">Pick an image</p>
        <input className= "imgSec" onChange={(event)=>{
            const upload = event.target.files;
            setFile(upload);
        }}  type = "file" enctype="multipart/form-data"/>
       <ReactQuill theme= "snow" name = "postText" onChange = {(newValue)=>{console.log(newValue);setText(newValue)}} value = {text} style = {{margin: "1rem 0 0 2rem"}}/>
        <button className = "imgSec postButton" type = 'submit'>Post</button>
        </form>
        </div>
    );
}
export default EditPost;
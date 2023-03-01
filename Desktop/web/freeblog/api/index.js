const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../mongoose/user");
const jwt = require("jsonwebtoken"); 
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer({dest : "upload/"});
const fs = require("fs");
const Post = require("../mongoose/PostModel");
const PostModel = require("../mongoose/PostModel");
let salt = bcrypt.genSaltSync(10);

let secret = "egewo489wthfn290jr0m528352jnsfjkfnq9h48923fn293";

app.use(cors({credentials : true, origin: "http://localhost:3000"}));
app.use(express.json());
app.use(cookieParser());
app.use("/upload",express.static(__dirname + "/upload"));

mongoose.connect("mongodb+srv://harwinsodhi33:c1013333@cluster0.zcilypo.mongodb.net/?retryWrites=true&w=majority");

app.post("/register", async (req,res)=>{
    const {email, password} = req.body;
    try{
        const newUser = await User.create({
            name : email,
            password : bcrypt.hashSync(password, salt)
        });
        jwt.sign({email : newUser.email, id : newUser._id}, secret, {}, (err, token)=>{
            if(err){
                throw err;
            }
            res.cookie("token",token).json({
                email : email,
                id : newUser._id
            });
        })
    }
    catch(err){
        res.status(400).json(err);
    }
});
app.put("/post", upload.single("file"), async (req,res)=>{
    const postId = req.body._id;
    if(req.file){
        const{originalname, path} = req.file;
        const breakIt = originalname.split(".");
        const ext = breakIt[breakIt.length - 1];
        const pathNew = path + "."+ ext;
        fs.renameSync(path, pathNew);
        PostModel.updateOne({_id : postId},{
            title : req.body.title,
            text : req.body.text,
            summary : req.body.summ,
            image : pathNew
       }).then(item => res.json(item));
    }
    else{
        const ogPost = await PostModel.findById(postId);
        PostModel.updateOne({_id : postId},{
             title : req.body.title,
             text : req.body.text,
             summary : req.body.summ
        }).then(item => res.json(item));
    }
})
app.post("/login", async (req, res)=>{
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});
    const matched = bcrypt.compare(password, userDoc.password);
    if(matched){
        jwt.sign({email, id : userDoc._id}, secret, {}, (err, token)=>{
            if(err){
                throw err;
            }
            res.cookie("token",token).json({
                email : email,
                id : userDoc._id
            });
        })
    }
    else{
        res.status(400).json("The credentials are incorrect");
    }
});
app.post("/post",upload.single("file"), async (req,res)=>{
    const {originalname, path} = req.file;
    const breakIt = originalname.split(".");
    const ext = breakIt[breakIt.length - 1];
    const newPath = path+"."+ext;
    fs.renameSync(path, newPath);
    const {title, summ, text} = req.body;
    const {token} = req.cookies;
    jwt.verify(token, secret,async (err, info)=>{
        if(err) throw err;
        const postDoc = await Post.create({
            title, summary:summ, text, image : newPath, author: info.id
        });
        res.json(req.body);
    })
   

})
app.get("/post", async (req,res)=>{
    res.json(await PostModel.find().populate("author").sort({createdAt : -1}));
})


app.post("/logout", (req, res)=>{
    res.cookie("token" , "");
    res.json(req.cookies);
})
app.get("/edit/:pageId", async (req,res) =>{
    const pageId = req.params.pageId;
    const myDoc = await PostModel.findById(pageId);
    res.json(myDoc);

})
app.get("/posts/:id", async (req, res)=>{
    const id = req.params.id;
    const postDoc = await PostModel.findById(id).populate("author");
    res.json(postDoc);
})
app.get("/profile",(req, res)=>{
const {token} = req.cookies;
jwt.verify(token, secret,{}, (err, info)=>{
    app.json(info);
})
});
app.listen(4000);
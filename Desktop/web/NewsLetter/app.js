const express = require("express");
const app = express();
const parser = require("body-parser");
const https = require("https");
app.use(express.static("public"));
app.use(parser.urlencoded({extended: true}))
app.get("/" , (req, res) =>{
    res.sendFile(__dirname+"/signup.html");
});
app.post("/", (req,res)=>{
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    let data = {
        members :[
            {
                email_address : email,
                status: "subscribed",
                merge_fields : {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };
    const ddata = JSON.stringify(data);
    const url = "https://us11.api.mailchimp.com/3.0/lists/1e8449ce37"
    const options = {
        auth : "harwin:b6b47a2c42c668404c5d9593593513aa-us11",
        method: "POST"
    }
    const conn = https.request(url, options,(response) =>{
        if(response.statusCode == 200){
            res.sendFile(__dirname+"/failure.html");
        }
        else{
            res.sendFile(__dirname_+"/failure.html");
        }
        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        });
    });
    conn.write(ddata);
    conn.end();

});
app.post("/failure", (req, res) =>{
    res.redirect("/");
});
app.listen(3000);
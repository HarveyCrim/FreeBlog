const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://harwinsodhi33:c1013333@cluster0.zcilypo.mongodb.net/?retryWrites=true&w=majority");
const schema = new mongoose.Schema({
    title : String,
    summary : String,
    text : String,
    image : String,
    author : {type : mongoose.Schema.Types.ObjectId ,ref : "User"}
},
{
    timestamps: true
});

const PostModel = mongoose.model("Post", schema);
module.exports = PostModel;
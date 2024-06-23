const mongoose=require('mongoose');

//database
mongoose.connect("mongodb://localhost:27017/slate");

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String
})

module.exports=mongoose.model("user",userSchema);
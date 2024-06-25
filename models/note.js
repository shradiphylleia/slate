const mongoose=require('mongoose');

//database
mongoose.connect("mongodb://localhost:27017/slate");

const noteSchema=mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        default:"untitled"
    },
    data:{
        type:String
    }
})

module.exports=mongoose.model("note",noteSchema);
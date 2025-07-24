const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  desc:{
type:String,
required:true
  },
  image:{
type:String,
required:true
  },
  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Comment'
  }]
},{timestamps:true})

const PostModel = mongoose.model('Posts',blogSchema)

module.exports=PostModel
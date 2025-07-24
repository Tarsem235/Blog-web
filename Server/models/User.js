const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
username:{
  type:String,
},
email:{
type:String
},
profile:{
  type:String
},
password:{
  type:String
},
role:{
  type:String,
  enum:['admin','user'],
  default:'user'
}
},{timestamps:true})

const userModel = mongoose.model("User",userSchema)
module.exports=userModel
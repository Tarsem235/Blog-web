const mongoose= require('mongoose')

const commentsSchema  = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Posts',
        required:true
    },
   userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false
    },
   comment:{
        type:String,
          required: true
    },
    
},{timestamps:true})

const CommentModel = mongoose.model('Comment',commentsSchema)
module.exports=CommentModel
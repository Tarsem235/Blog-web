const PostModel = require("../models/Blog");


const getSinglepost = async(req , res)=>{
    try{
        const postId = req.params.id.trim();
        
const FindPost = await PostModel.findById(postId)
.populate({
    path:'comments',
    populate:{
        path:"userId"
    }
    });
    if(!FindPost){
        return res.status(401).json({success:false , message:"Post Not Found"})
    }
   return res.status(200).json({success:true , Post:FindPost})

    }
    catch(error){
        console.log(error)
 return res.status(500).json({success:false,message:"Internal Server Error"})
    }
}
module.exports=getSinglepost
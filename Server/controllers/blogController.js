const PostModel = require("../models/Blog");
const fs = require('fs')
const path = require('path')
// Create new blog
const createBlog = async (req, res) => {
  try {
    const { title, desc } = req.body;
    if (!title || !desc) {
      return res.status(400).json({ success: false, message: "Title and description are required" });
    }
    const imagePath = req.file.filename
    const create = new PostModel({
      title,
      desc,
      image: imagePath
    });
    await create.save();
    return res.status(200).json({
      success: true,
      message: 'Post Created Successfully',
      post: create
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePost = async(req , res)=>{
try{
const postId = req.params.id

const FindPost= await PostModel.findById(postId)
if(!FindPost){
  return res.status(404).json({sucess:false,message:'Post not found'})
}
if(FindPost.image){
  const profilepath= path.join('public/images',FindPost.image)
  fs.promises.unlink(profilepath)
  .then(()=>  console.log('Post image deleted'))
  .catch(error => console.log('error deleting post ' , error))
}
const deletedPost = await PostModel.findByIdAndDelete(postId)
return res.status(200).json({success:true,message:'Post Delete Sucessfully',post:deletedPost})
}
catch(error){
  console.log(error)
  res.status(500).json({sucess:false , message:'Internal server error'})
}
}

const getPost = async (req,res)=>{
  try{
const posts = await PostModel.find()
if(!posts){
  return res.status(404).json({sucess:false,message:'Post not found'})
}

return res.status(200).json({sucess:true , posts})
  }
  catch(error){
    console.log(error)
    res.status(500).json({sucess:false,message:'Internal server error'})
  }
}
const Update = async(req,res)=>{
  try{
const {title , desc} = req.body
const postId=req.params.id;

const findpost = await PostModel.findById(postId)
if(!findpost){
  return res.status(404).json({sucess:false,message:'Post not found'})
}
if(title){
  findpost.title=title
}
if(desc){
  findpost.desc= desc
}
if(req.file){
  findpost.image=req.file.filename
}
await findpost.save();
return res.status(200).json({success:true,message:'Post Update Sucessfully',post:findpost})
  }
  catch(error){
    console.log(error)
    res.status(500).json({success:false,message:'Internal server error'})
  }
}

module.exports =  {createBlog, deletePost ,getPost , Update}
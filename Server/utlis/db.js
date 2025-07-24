const mongoose= require('mongoose');

const DBcon =(()=>{
    try{
mongoose.connect(process.env.MONGO_URI)
console.log('mongoDB connected sucessfully')
    }
    catch(error){
        console.log('error connection',error)

    }
})
module.exports= DBcon
import mongoose, { Types } from "mongoose";


photoSchema=new mongoose.Schema({
    titel:String,
    image:String
   
},
{
      //  this is for opptine   _vt and  createdAt and  apdateAT 
      timestamps: true 
}
)



export  const photoSchema=mongoose.model("photo",photoSchema)
import mongoose, { Types } from "mongoose";


massageSchema=new mongoose.Schema({
    content:{
        type:  String,
        required: true ,
        min:10 ,
        max:100
    },
    receiverId:{
        type: Types.ObjectId , ref: "user", required:true

    }
},
{
      //  this is for opptine   _vt and  createdAt and  apdateAT 
      timestamps: true 
}
)



export  const MassageModel=mongoose.model("massage",massageSchema)
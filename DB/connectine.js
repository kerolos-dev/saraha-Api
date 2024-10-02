import  mongoose  from "mongoose";

 export    const connectdb=async()=>{
    return  await mongoose.connect(process.env.CONNECTION_URL).then(()=>{
        console.log(" database connection  success ");
         }).catch(()=>{
             console.log("error for database connection ");
     
         })
 }
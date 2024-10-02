import { userModel } from "../../../DB/model/user.model.js";
import { catchError } from "../../middleWare/catshError.js";
import randomstring  from"randomstring"
import { sendMassega } from "../../utility/sendEmail.js";
import  Jwt  from 'jsonwebtoken';
import  bcrypt  from 'bcrypt';
import { AppError } from "../../utility/appError.js";
import { resetPassTemp } from "../../utility/htmlTamolet.js";




const  signUp=catchError(async(req,res,next)=>{
    // creat  user 
    const  user= await userModel.create(req.body)

    // token 

    const  token=Jwt.sign({email:user.email},process.env.TOKENSECRAT)

    //  send email  
  const  sendEM =  await sendMassega({
    to: user.email ,
    subject:"Account Acttivation",
    text:"hellow  user  i  db signUp",
    html:`<a href ='http://localhost:3300/user/activate_account/${token}'>Activate your  account </a>`,
  })
  if(!sendEM)  return next(new AppError('email  is not Activation',401))
    // send  ressponse 
    res.json({success:true ,massage:'success',user})
})

// active email
const activateAccount=catchError(async(req,res,next)=>{
  const {token}=req.params
  // payload
  const  payload= Jwt.verify(token , process.env.TOKENSECRAT)
  console.log(payload.email); 
  // update 
  await userModel.findOneAndUpdate({email:payload.email , isConfirmed:true ,new:true})


  return res.send("Account Acctivated successFully!   Try to  login ")


})

// login
const   login=catchError(async(req,res,next)=>{
   const token=req.token
   console.log(token);
   // send  ressponse 
   res.json({success:true  , massage:'success ,  user exies',token})
})

// sendForgetCode


const  sendForgetCode=catchError(async(req,res,next)=>{
  // chek    user 
    const  isUser= await userModel.findOne({email: req.body.email})
    if(!isUser)return next(new AppError('Email is not found exists',401))
    res.json 

    // chek  activatione
  if (!isUser.isConfirmed) return next (new  AppError('isConfirmed Folse   '))
  // generate forget  code
  const code=randomstring.generate({
    length:5,
    charset:'numeric'
   })
  //  save code 
   console.log(code);
   isUser.forgetCode= code;
   await isUser.save();
  // send  email
  const html=resetPassTemp(code)
  const  sendEM=await sendMassega({
    to: isUser.email ,
    subject:"Account Acttivation",
    text:"hellow  user  i  db signUp",
    html,
  })

  // send  ressponse 
  res.json({success:true  , massage:'success ,  user exies'})


})

const  resetPassSchema=catchError(async(req,res,next)=>{
   // chek    user 
   const  isUser= await userModel.findOne({email: req.body.email})
   if(!isUser)return next(new AppError('Email is not found exists',401))
   // check   code 
  if(isUser.forgetCode !==  req.body.code)return   next(new Error("Invalid  code!"))
  // delet forget code  
  // await  isUser.findOneAndUpdate({email:req.boby.email},{$unset:{forgetCode:1}})
  // hachPassword 
  isUser.password = bcrypt.hashSync(req.body.password,parseInt(10))
  await isUser.save();
  
  // invalidate  tokens 
  // const  tokens= await  tokenSechrma.find({isUser:  user._id})  
  // tokens.forEach(async( token)=>{
  //   token.isValid = false;
  //   await token.save()
  // });

   // sed  resposen
   return res.json({success: true , massage: "try  to  login  now ! "})

  





})


const  uploadFile=catchError(async(req,res,next)=>{
  // const id = req.userModel._id
  // const user=  await  userModel.findByIdAndUpdate({profillePic: req.file.path})
  return  res.json({success:true , massage:"succes"})
})


 

export{
    signUp,
    login,
    activateAccount,
    sendForgetCode,
    resetPassSchema,
    uploadFile
    
}


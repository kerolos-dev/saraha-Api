import  bcrypt  from 'bcrypt';
import  Jwt  from 'jsonwebtoken';
import { catchError } from "./catshError.js"
import { AppError } from "../utility/appError.js"
import { userModel } from '../../DB/model/user.model.js';

const checkEmailHashPassSiUp=catchError(async(req,res,next)=>{
    // data  
    const {email,password,rePassword}=req.body
    // check  passwoed  for  rePassword 
    if(password !== rePassword) return  next(new  AppError('password not  matched',405 ))
    //  check  email  and  send    request  
    const  Isuser= await userModel.findOne({email})
    if(Isuser)return next(new AppError('Email already exists',401))
    // hash   passwoed for  rePassword 
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    next(); 
})



const checkEmailPassToken=catchError(async(req,res,next)=>{
    // data
    const {email,password}=req.body
    // check  email  and password 
    const user =  userModel.findOne({email})
    // check  for  isConfirmed Email 
    //  if(!isConfirmed) return  next(new AppError('Confirma email '))
    if(!user  && bcrypt.compareSync(password ,  user.password))return next(new AppError('email and password  is  not afound',401))
    //  send  token  form  user  front   //  generate  token  
    const  token=Jwt.sign({uers:user._id , user: user.email},process.env.TOKENSECRAT)
    req.token=token
    next()
})


export{
    checkEmailHashPassSiUp,
    checkEmailPassToken
}
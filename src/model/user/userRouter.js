import  { Router } from "express";
import  *  as user from './userControlier.js'
import { validation } from './../../middleWare/validation.js';
import { forgetCodeShema, loginSchema, singUpSchema, tokenSchema ,resetPassSchema } from "./userValidation.js";
import {  checkEmailHashPassSiUp, checkEmailPassToken } from "../../middleWare/userModel.js";
import { fileUpload } from "../../utility/uploadFile.js";


const userRouter=Router()
userRouter.post('/signup',validation(singUpSchema),checkEmailHashPassSiUp,user.signUp)
userRouter.post('/login' ,validation(loginSchema) ,checkEmailPassToken,user.login)
userRouter.get('/activate_account/:token',validation(tokenSchema),user.activateAccount)
userRouter.patch('/forgetpassword',validation(forgetCodeShema),user.sendForgetCode)
userRouter.patch('/resetPassword',validation(resetPassSchema),user.resetPassSchema)
userRouter.post('/profile_pic',fileUpload().single('img'),user.uploadFile)



export  default userRouter;

import Joi  from "joi";
const  singUpSchema= Joi.object({
    name:
    Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
        email: 
        Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password:
     Joi.string()
     .min(3)
     .max(30)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    rePassword:Joi.string().valid(Joi.ref('password')).required(),
})
const  loginSchema= Joi.object({
        email: 
        Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password:
     Joi.string()
     .min(3)
     .max(30)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})

const  tokenSchema =Joi.object({
    token:Joi.string().required()
}) 

const  forgetCodeShema=Joi.object({
    email: 
    Joi.string().email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
})
const resetPassSchema =Joi.object({
    email: 
    Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password:
    Joi.string()
    .min(3)
    .max(30)
   .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
   rePassword:Joi.string().valid(Joi.ref('password')).required(),
   code:Joi.string().length(5).required()



})
 

export{
    singUpSchema,
    loginSchema,
    tokenSchema,
    forgetCodeShema,
    resetPassSchema
}
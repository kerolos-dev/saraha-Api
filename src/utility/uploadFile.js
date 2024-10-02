import multer , {diskStorage}from "multer";
import { nanoid } from "nanoid/non-secure";


// export   function uploadFile(){
//   const  storagr=multer.diskStorage({destination:"uploads/"
// ,filename: (req,file,cb)=>{
//   console.log(file);
//   cb(null , nanoid()+'/'+file.originalname)
//   },
//   });

//   const multerUpload = multer({ storagr })
//   return  multerUpload


// }


export const fileUpload =(fieldName)=>{
  const storage = multer.diskStorage({
      destination:  (req, file, cb)=> {
        cb(null,  'uploads/' )
      },
      filename:  (req, file, cb)=> {
        cb(null,nanoid()+"-"+ file.originalname)
      }
    }) 
  
    function fileFilter (req, file, cb) {
      if(file.mimetype.startsWith('image')){
          cb(null, true)
      }else{
          cb(new AppError('Image only'),false)
  
      }
    
    }
  
    const upload = multer({ storage  ,fileFilter  })
      return upload
}

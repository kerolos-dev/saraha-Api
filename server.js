import express from  "express"
import { connectdb } from "./DB/connectine.js";
import { globalError } from './src/middleWare/globalError.js';
import userRouter from "./src/model/user/userRouter.js";
import dotenv  from 'dotenv';

dotenv.config()
const port = process.env.PORT
const app = express()
//   express parse
app.use(express.json());
// start db
await connectdb()
// start  express
app.get('/', (req, res) => res.send('Hello World!'))
//  user  router
app.use('/user', userRouter)
// globalError
app.use(globalError)
//  not  found page  hander 
app.use("*", (req, res, next) => {
    next(new Error(`not found endPoint${req.originalUrl}`, 400));
  });

app.use((err,req,res,next)=>{
    res.status(err.statusCode).json({error : err.message})
})
app.listen(port, () => console.log(`  app listening on port ${port}!`))



import dotenv from "dotenv";
import connectionDB from "./db/index.js";
import { app } from "./app.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";




//home testing route
app.get("/",(req,res)=>res.json({message:"this is home route"}))

//user router
app.use('/api/user',userRouter)

//product router
app.use('/api/product',productRouter)

//cart router
app.use('/api/cart',cartRouter)


dotenv.config({
  path: "./.env",
});

connectionDB()
.then(()=>{
  app.listen(process.env.PORT || 5000 , ()=>{
    console.log(`server is running at :${process.env.PORT}`);
    
  })
})
.catch((err)=>{
  console.log("mongodb connection faild",err);
})

import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();

import Product from './models/product.js'

const app = express();
app.use(express.json())

//mongodb connection
const connectMongoDB = async () =>{
  const conn = await mongoose.connect(process.env.MONGODB_URI)

  if(conn){
    console.log('MongoDB connected successfully.');
  }
};
connectMongoDB();

app.get('/products',async (req,res)=>{

const findigproduct = await Product.find()
    res.json({
      
      data: findigproduct
      
    })
});

app.post('/product',async (req, res)=>{
   const {name, description, price, productImage,brand}= req.body;
   if(!name){
    return res.json({
        sucess:false,
        message:'name is required',

    })
   }


   if(!description){
    return res.json({
        sucess:false,
        message:'description is required',

    })
   }

   if(!price){
    return res.json({
        sucess:false,
        message:'price is required',

    })
   }

   if(!productImage){
    return res.json({
        sucess:false,
        message:'productImage is required',

    })
   }

   if(!brand){
    return res.json({
        sucess:false,
        message:'brand is required',

    })
   }
   
//model object

   const newProduct = new Product({
    name:name,
    description:description,
    price:price,
    productImage:productImage,
    brand:brand
   })

const savedProduct = await newProduct.save();

   res.json({
    sucess:true,
    data:savedProduct,
    message:'Sucessfully fetched product'
})
});

app.get('/product',(req,res)=>{
    const {id} = req.query;
    let product = null;

   const newProduct = {
    'id':id,
    "name":name,
    "description":description,
    "price":price,
    "productImage":productImage,
    "brand":brand
   }


if(product == null){
    return res.json({
        sucess:false,
        message:'Product not found',
    })
}

})

const PORT=8080;
 
app.listen(PORT, ()=>{
     console.log(`Server is running on port ${PORT}`)
})
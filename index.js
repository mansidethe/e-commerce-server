import express from 'express'
import mongoos from 'mongoos'

const app = express();
app.use(express.json())

const MONGODB_URI ='mongodb+srv://mansidethe18:mansi@7378582489@cluster0.8zctcw4.mongodb.net/'

const students = [];

app.get('/health',(req, res)=>{
    res.json({
        status:'all good all set'
    })
})

app.get('/students',(req,res)=>{
    res.json({
      sucess: true,
      data:students,
      message: 'successfully fetch all students'
    })
});

app.post('/student',(req, res)=>{
   const {name, age, mobile, email}= req.body;
   if(!name){
    return res,json({
        sucess:false,
        message:'name is required',

    })
   }


   if(!age){
    return res,json({
        sucess:false,
        message:'age is required',

    })
   }

   if(!mobile){
    return res,json({
        sucess:false,
        message:'mobile is required',

    })
   }

   if(!email){
    return res,json({
        sucess:false,
        message:'email is required',

    })
   }

   const id = Math.floor(Math.random()* 100000)+1;


   const newStudent = {
    'id':id,
    'name':name,
    'age':age,
    'email':email
   }

   students.push(newStudent);

   res.json({
    sucess:true,
    data:newStudent,
    message:'Successfully added new student'
   })
})

app.get('/student',(req,res)=>{
const {id} = req.query;
let student = null;

student.forEach((stud)=>{
    if(stud.id== id){
        student = stud;
    }
})

if(student == null){
    return res.json({
        sucess:false,
        message:'Student not found',
    })
}

res.json({
    sucess:true,
    data:student,
    message:'Sucessfully fetched student',
})
})

const PORT=5000;
 
app.listen(PORT, ()=>{
     console.log(`Server is running on port ${PORT}`)
})
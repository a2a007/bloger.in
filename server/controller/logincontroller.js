const express=require('express')
const cors=require('cors')
const app=express();
app.use(express.json());
app.use(cors());
const newusermodel = require('../schema/newuser'); 

const registercheck={
    login:async (req,res)=>{
    try{
        console.log('entered server')
        const { email, password } = req.body; 
      //  console.log(email,password)
        const data = await newusermodel.findOne( { email : email }); 
      //  console.log(data)
        if (!data) {
            return res.status(200).json({ message: 'No user exists' ,data:false});
        }
       
        if(data.email === email)
        {
               if(data.pass != password) 
               {
                res.status(200).json({message:'Password mismatchs',data:false})
                return;
               }
               else
               {            
                console.log('password verified');
                res.status(200).json({message:'Login Successful....', data:true});
                return;
               }
        }
        else{
            res.status(200).json({message:'User doesn`t exists'},{data:false});
            return ;
        }
    }
    catch(err){
        console.log('error')
        res.status(500).json({ error: "Error fetching data"})
    }
},

fetch:async (req,res)=>{
    try{
        console.log('entered server fetch')
        const email=req.params.email;
        const data= await newusermodel.findOne({email:email});
        if(!data)
           { res.status(200).json({message:'No user exists'});
            return;}
        const name=data.lastname;
        const role=data.role;
        res.status(200).json({data:{name,role,email}});
    }
    catch(err){
        console.log('error from fetch')
        res.status(500).json({ error: "Error fetching data from get"
        })
    }
}

}
module.exports=registercheck;
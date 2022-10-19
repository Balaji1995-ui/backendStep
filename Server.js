// const { json } = require("express");
const express= require("express");
const app = express();
const cors = require("cors")
const mysql = require("mysql");


const dotenv = require('dotenv');
const { response } = require("express");
const { rootShouldForwardProp } = require("@mui/material/styles/styled");


dotenv.config({
    path:"./.env",
})

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());





app.post("/register",(req,res)=>{


const { BusinessName:BusinessName,personName:PersonName,phoneNumber:phoneNumber,password:password,confirmPassword:confirmPassword}=req.body;
console.log(req.body);
db.query("Insert into ecgst_register set ?",{BusinessName,PersonName,phoneNumber,password,confirmPassword},
(err,result)=>{
    if (err) {
       res.send({err:err});
    }
    if(PersonName==""||password=="" ){
        return res.status(401).send({message:"Please enter the vaild details..!!!"})
    }
 else{
    return res.status(403).send({message:"successfully"});
 }
   
});

//    res.send("Hi welcome back")
});

app.post("/" ,(req,res)=>{
    const{personName:personName,password:password}=req.body;
console.log(req.body);
db.query("SELECT*FROM ECGST_REGISTER WHERE PERSONNAME='"+personName+"' AND PASSWORD='"+password+"';",
[personName,password],
async(err,result)=>{
    if(err){
res.send({err: err});
    }
    if(personName==""|| password==""){
 return res.send({message:"Please enter the vaild details..!!!"})
    
    }
  else if(result.length>0){
        

    
return res.send({message:"Login Successfully..!!!"});
  
    }
    else {
   return res.send({message:"wrong username and Password combination..!!!"});   
    }

    
}

);
});
app.post("/forget",(req,res)=>{
    const{personName:personName,password:password}=req.body;
    console.log(req.body);
    db.query("SELECT*FROM ECGST_REGISTER WHERE PERSONNAME='"+personName+"';",
    [personName],
    async(err,result)=>{
        if(err){
    res.send({err: err});
        }
        if(personName==""){
     return res.status(202).send({message:"Please enter the vaild details..!!!"})
        
        }
      else if(result.length>0){
            
    
        
    return res.status(200).send({message:"User Data Found..!!!"});
        
        }
        else {
       return res.status(202).send({message:"User doesn't exist..!!!"});   
        }
       
        
    }
    
    );
    

})
app.post("/backup",(req,res)=>{
    const{personName:personName,password:password,confirmPassword:confirmPassword}=req.body;
    console.log(req.body);
    db.query("UPDATE ECGST_REGISTER SET PASSWORD='"+password+"',CONFIRMPASSWORD='"+confirmPassword+"'WHERE PERSONNAME='"+personName+"';",
    [personName,password,confirmPassword],
    async(err,result)=>{
        if(err){
    res.send({err: err});
        }
        if(personName==""||password==""||confirmPassword==""){
     return res.status(202).send({message:"Please enter the vaild details..!!!"})
        
        }
      else if(result.length>0){
            
    
        
    return res.status(200).send({message:"Password reset successfully..!!!"});
        
        }
        else {
       return res.status(200).send({message:"Password reset successfully..!!!"});   
        }
       
        
    }
    
    );
    

})
app.get("/login" ,(req,res)=>{
    const{personName:personName}=req.body;
console.log(req.body);
db.query("SELECT * FROM ECGST_REGISTER WHERE PERSONNAME='"+personName+"'",
[personName],
async(err,result)=>{
    if(err){
res.send({err: err});
    }
    if(!personName){
 return res.status(202).send(result)
    
    }
  else if(result){
        

    
return res.status(200).send({message:"Login Successfully..!!!"});
    
    }
    else {
   return res.status(202).send(result);   
    }
   
    
}

);
});


const port = process.env.PORT || 5000;
const host = '0.0.0.0'
app.listen(port, host, ()=> console.log(`server is running on port ${port}`));

const db= mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE,cd
    // host:'localhost',
    // user:'root',
    // password:'root',
    // database:'visual',
    // host:'sql6.freesqldatabase.com',
    // user:'sql6527670',
    // password:'jphXaqipxP',
    // database:'sql6527670',
    
})
db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Mysql server connected");
    }
})

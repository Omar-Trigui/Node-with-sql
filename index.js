const mysql = require('mysql');
const express = require ('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host : 'localhost' , 
    user : 'root',
    password : '' ,
    database : 'employee'

});

mysqlConnection.connect((err) =>{
    if (!err){
        console.log("DB connected");
        
    }else{
        console.log("error");
        
    }
})
app.listen(3000);
//get all employee
app.get('/employees' , (req,res)=>{
   mysqlConnection.query('SELECT * from client',(err,rows,fields) => {
    if(!err){
        res.send(rows);
        
    }else{
        console.log(err);
    }
   })
});
//get a employee
app.get('/employees/:id' , (req,res)=>{
    mysqlConnection.query('SELECT * from client where id = ?',[req.params.id],(err,rows,fields) => {
     if(!err){
         res.send(rows);
         
     }else{
         console.log(err);
     }
    })
 });
 //delete a employee
 app.delete('/employees/delete/:id' , (req,res)=>{
    mysqlConnection.query('Delete from client where id = ?',[req.params.id],(err,rows,fields) => {
     if(!err){
         res.send("deleted");
         
     }else{
         console.log(err);
     }
    })
 });
 // insert a employee
 let client = {
      name : 'ahmed' , 
      salary : '3000',
      code : '12'
 }
 app.put('/employees/add' , (req,res)=>{
    mysqlConnection.query('Insert Into client (`name`,`salary`,`code`) values (?,?,?)',[client.name , client.salary , client.code],(err,rows,fields) => {
     if(!err){
         res.send("client added");
         
     }else{
         console.log(err);
     }
    })
 });
// update a employee
let clientName = "mohamed"
app.put('/employees/update/:id' , (req,res)=>{
  mysqlConnection.query('update client  set name = ? where id = ?',[clientName , req.params.id],(err,rows,fields) => {
   if(!err){
       res.send("client modified");
       
   }else{
       console.log(err);
   }
  })
});
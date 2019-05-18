const express = require('express');
const router = express.Router();

const fs = require('fs');

const randomString = require('../extras/randomString');

router.post('/signin',(req, res, next) => {
  fs.readFile('./data_files/users.json',(error,data) => {
    if(error){
      res.json({status:false,userId:null});
    }
    else{
      let fileData = JSON.parse(data.toString());
      let isAlready = false;
      let userId;
      for(let i = 0; i < fileData.userList.length;i++){
        if(req.body.username == fileData.userList[i].username && req.body.password == fileData.userList[i].password){
          isAlready = true;
          userId = fileData.userList[i].userId;
        }
      }
      if(isAlready){
        res.json({status:true,userId:userId});
      }
      else{
        res.json({status:"not already",userId:null});
      } 
    }
  });
});

router.post('/signup',(req,res,next) => {
  fs.readFile('./data_files/users.json',(error,data) => {
    if(error){
      res.json({status:false,userId:null});
    }
    else{
      let fileData = JSON.parse(data.toString());
      let isAlready = false;
      let userId;
      for(let i = 0; i < fileData.userList.length;i++){
        if(req.body.username == fileData.userList[i].username){
          isAlready = true;
          userId = fileData.userList[i].userId;
        }
      }
      if(isAlready){
        res.json({status:"already",userId:null});
      }
      else{
        userId = randomString();
        fileData.userList.push({userId:userId,username:req.body.username,password:req.body.password});
        fs.writeFile('./data_files/users.json',JSON.stringify(fileData),(error) => {
          if(error){
            res.json({status:false,userId:null});
          }
          else{
            res.json({status:true,userId:userId});
          }
        })
      } 
    }
  });
})

module.exports = router;

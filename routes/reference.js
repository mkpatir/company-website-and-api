const express = require('express');
const router = express.Router();

const fs = require('fs');

router.get('/',(req,res,next) => {
    res.render('references');
})

router.get('/getReferences',(req,res,next) => {
    fs.readFile('./data_files/references.json',(error,data) => {
        if(error){
            res.json({ status: false,referencesList : [null]});
        }
        else{
            res.json(JSON.parse(data.toString()));
        }
    })
});

router.post('/addReference',(req,res,next) => {
    fs.readFile('./data_files/references.json',(error,data) => {
        if(error){
            res.json(false);
        }
        else{
            let fileData = JSON.parse(data.toString());
            let isAlready = false;
            for(let i = 0; i < fileData.referencesList.length;i++){
                if(req.body.name == fileData.referencesList[i].name){
                    res.json("References already exists");
                    isAlready = true;
                }
            }
            if(!isAlready){
                fileData.referencesList.push({"name":req.body.name,"description":req.body.description})
                fs.writeFile('./data_files/references.json',JSON.stringify(fileData),(error) => {
                    if(error){
                        res.json(false);
                    }
                    else{
                        res.json(true);
                    }
                })
            }
        }
    })
});

router.delete('/deleteReference',(req,res,next) => {
    fs.readFile('./data_files/references.json',(error,data) => {
        if(error){
            res.json(false);
        }
        else{
            let fileData = JSON.parse(data.toString());
            fileData.referencesList = fileData.referencesList.filter((item) => {
                return item.name != req.body.name
            });
            fs.writeFile('./data_files/references.json',JSON.stringify(fileData),(error) => {
                if(error){
                    res.json(false);
                }
                else{
                    res.json(true);
                }
            })
        }
    })
});

module.exports = router;
const express = require('express');
const router = express.Router();

const fs = require('fs');

router.get('/',(req,res,next) => {
    res.render('news');
})

router.get('/getNews',(req,res,next) => {
    fs.readFile('./data_files/news.json',(error,data) => {
        if(error){
            res.json({ status: false,newsList : [null]});
        }
        else{
            res.json(JSON.parse(data.toString()));
        }
    })
});

router.post('/addNew',(req,res,next) => {
    fs.readFile('./data_files/news.json',(error,data) => {
        if(error){
            res.json(false);
        }
        else{
            let fileData = JSON.parse(data.toString());
            let isAlready = false;
            for(let i = 0; i < fileData.newsList.length;i++){
                if(req.body.name == fileData.newsList[i].name){
                    res.json("References already exists");
                    isAlready = true;
                }
            }
            if(!isAlready){
                fileData.newsList.push({"name":req.body.name,"description":req.body.description})
                fs.writeFile('./data_files/news.json',JSON.stringify(fileData),(error) => {
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
})

router.delete('/deleteNew',(req,res,next) => {
    fs.readFile('./data_files/news.json',(error,data) => {
        if(error){
            res.json(false);
        }
        else{
            let fileData = JSON.parse(data.toString());
            fileData.newsList = fileData.newsList.filter((item) => {
                return item.name != req.body.name;
            });
            fs.writeFile('./data_files/news.json',JSON.stringify(fileData),(error) => {
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
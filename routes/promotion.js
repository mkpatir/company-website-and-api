const express = require('express');
const router = express.Router();

const fs = require('fs');
const randomString = require('../extras/randomString');

router.get('/',(req,res,next) => {
    res.render('promotions');
})

router.get('/getPromotions',(req,res,next) => {
    fs.readFile('./data_files/promotions.json',(error,data) => {
        if(error){
            res.json({ status: false,promotionsList : [null]});
        }
        else{
            res.json(JSON.parse(data.toString()));
        }
    })
});

router.post('/addPromotion',(req,res,next) => {
    fs.readFile('./data_files/promotions.json',(error,data) => {
        if(error){
            res.json(false);
        }
        else{
            let fileData = JSON.parse(data.toString());
            fileData.promotionsList.push({"promotionId" : randomString(),"promotionName" : req.body.promotionName,"promotionDescription":req.body.promotionDescription});
            fs.writeFile('./data_files/promotions.json',JSON.stringify(fileData),(error) => {
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

router.delete('/deletePromotion',(req,res,next) => {
    fs.readFile('./data_files/promotions.json',(error,data) => {
        if(error){
            res.json(false);
        }
        else{
            let fileData = JSON.parse(data.toString());
            fileData.promotionsList = fileData.promotionsList.filter((item) => {
                return item.promotionId != req.body.promotionId;
            });
            fs.writeFile('./data_files/promotions.json',JSON.stringify(fileData),(error) => {
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
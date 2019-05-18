const express = require('express');
const router = express.Router();

const fs = require('fs');

router.get('/',(req,res,next) => {
    res.render('contact');
})

router.get('/getContact',(req,res,next) => {
    fs.readFile('./data_files/contact.json',(error,data) => {
        if(error){
            res.json(error)
        }
        else{
            res.json(JSON.parse(data.toString()));
        }
    })
});

router.post('/updateContact',(req,res,next) => {
    fs.writeFile('./data_files/contact.json',JSON.stringify(req.body),(error) => {
        if(error){
            res.json(false);
        }
        else{
            res.json(true);
        }
    })
});

module.exports = router;
const path=require('path')

const express=require('express');

const rootDir=require('../util/path')

const router=express.Router();

router.get('/products',(req,res,next)=>{
    // res.send('<h1>hello from express using express routes</h1>');
    // res.sendFile(path.join(__dirname,'../','views','shop.html'))
    res.sendFile(path.join(rootDir,'views','shop.html'))

});


module.exports=router;
const path=require('path')

const express=require('express');

const rootDir=require('../util/path');

const router=express.Router();

router.get('/login',(req,res,next)=>{
    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><input type="text" name="title1"><button type="submit">add product</submit></form>');
    // res.sendFile(path.join(__dirname,'../','views','add-product.html'));
    res.sendFile(path.join(rootDir,'views','login.html'))
});

router.post('/chat-box',(req,res,next)=>{
    const userData=req.body
    console.log(userData);
    res.redirect('/');
})



module.exports=router;
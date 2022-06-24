const express=require('express');

const router=express.Router();
//  /admin/add-product=>GET
router.get('/add-product',(req,res,next)=>{
    res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><input type="text" name="title1"><button type="submit">add product</submit></form>');
});

//   /admin/add-product=>POST
router.post('/add-product',(req,res,next)=>{
    res.redirect('/');
    // const {title,title1}=req.body;
    // console.log(title)
    // console.log(title1);
    console.log(req.body);
});


module.exports=router;
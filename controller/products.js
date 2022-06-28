const path=require('path')

const rootDir=require('../util/path')
const Products=require('../model/product')


exports.getAddProducts=(req,res,next)=>{
    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><input type="text" name="title1"><button type="submit">add product</submit></form>');
    // res.sendFile(path.join(__dirname,'../','views','add-product.html'));
    res.sendFile(path.join(rootDir,'views','add-product.html'))
}

exports.postAddProducts=(req,res,next)=>{
    // products.push(req.body.title)
    const product=new Products(req.body.title)
    product.save();
    res.redirect('/admin/add-product');
    // const {title,title1}=req.body;
    // console.log(title)
    // console.log(title1);
    // console.log(req.body);
}

exports.getProducts=(req,res,next)=>{
    // res.send('<h1>hello from express using express routes</h1>');
    // res.sendFile(path.join(__dirname,'../','views','shop.html'))
    Products.fetchAll(products=>{
        console.log("from model",products);
        res.sendFile(path.join(rootDir,'views','shop.html'))
    })
    

}
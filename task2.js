const bodyParser=require('body-parser');
const express=require('express');

const app=express();


app.use(bodyParser.urlencoded({extended:false}));

//we can also tarse the incoming request like below without installing 
//body-parser library or not need to import body-parser or require
// const a=express.urlencoded();
// app.use(a);

app.get('/add-product',(req,res,next)=>{
    res.send(`<form action="/product" method="POST">
                <input type="text" name="title">
                <input type="text" name="size">
                <button type="submit">add product</submit>
            </form>`);
});

app.post('/product',(req,res,next)=>{
    res.redirect('/');
    const {title,size}=req.body;
    console.log(req.body);
    console.log(title);
    console.log(size);
});

app.use('/',(req,res,next)=>{
    res.send('<h1>hello from express</h1>');

})


app.listen(3000);
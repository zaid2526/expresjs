const path=require('path');

const express =require('express');
const bodyParser=require('body-parser');

const adminRouter=require('./routes/admin')
const shopRouter=require('./routes/shop')
const contactRouter=require('./routes/contact')



const rootDir=require('./util/path')

const app=express()

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRouter);
app.use(shopRouter);
app.use(contactRouter);

app.use('/',(req,res,next)=>{
    // res.sendFile(path.join(__dirname,'views','404.html'));
    res.sendFile(path.join(rootDir,'views','404.html'))
})



app.listen(3031,()=>{
    console.log("server in listening on 3031");
});
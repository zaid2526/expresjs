const path=require('path');

const express =require('express');
const bodyParser=require('body-parser');

const adminRouter=require('./routes/admin');
const shopRouter=require('./routes/shop');
const contactRouter=require('./routes/contact');
const errorController=require('./controller/error')

const app=express()

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRouter);
app.use(shopRouter);
app.use(contactRouter);

app.use('/',errorController.get404Page)



app.listen(3031,()=>{
    console.log("server in listening on 3031");
});
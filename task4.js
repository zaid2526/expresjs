const path=require('path');

const express =require('express');
const bodyParser=require('body-parser');


const loginRouter=require('./routes/login')
const chatBoxRouter=require('./routes/chat')


const rootDir=require('./util/path')

const app=express()

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin',adminRouter);
// app.use(shopRouter);
app.use(loginRouter);
app.use(chatBoxRouter)


app.use('/',(req,res,next)=>{
    // res.sendFile(path.join(__dirname,'views','404.html'));
    res.sendFile(path.join(rootDir,'views','chat-form.html'))
})



app.listen(3031,()=>{
    console.log("server in listening on 3031");
});
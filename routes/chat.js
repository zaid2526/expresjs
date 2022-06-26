const fs =require('fs');

const express=require('express');

const router=express.Router();

router.post('/chats',(req,res,next)=>{
    
    const chatData=req.body
    console.log(`${chatData.username} : ${chatData.msg} `);
    // fs.writeFileSync('chats.txt',`${chatData.username} : ${chatData.msg} `);
    fs.appendFile('chat.txt', `${chatData.username} : ${chatData.msg} `, function (err) {
        if (err) console.log("error writing file");
      });
    res.redirect('/');
})


module.exports=router;
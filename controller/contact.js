const path=require('path')

const rootDir=require('../util/path')

exports.getContact=(req,res,next)=>{
    // res.sendFile(path.join(__dirname,'../','views','contact-us.html'));
    res.sendFile(path.join(rootDir,'views','contact-us.html'))
}

exports.postContact=(req,res,next)=>{
    // res.redirect('/success');
    res.sendFile(path.join(rootDir,'views','success.html'))
    console.log(req.body);
}
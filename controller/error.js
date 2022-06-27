const path=require('path')

const rootDir=require('../util/path')

exports.get404Page=(req,res,next)=>{
    // res.sendFile(path.join(__dirname,'views','404.html'));
    res.sendFile(path.join(rootDir,'views','404.html'))
}
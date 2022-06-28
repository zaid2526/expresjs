const fs = require('fs');
const path = require('path');

const rootDir=require('../util/path')

const p = path.join(
    rootDir,
    'data',
    'products.json'
  );

// const products=[]

module.exports= class Product{
    constructor(title){
        this.title=title;
    }
    save(){
        fs.readFile(p,(err,fileContent)=>{
            // console.log("err",err);
            let products=[]
            if(!err){
                products=JSON.parse(fileContent)
            }
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err);
            })
        })
    }

    static fetchAll(cb){
        fs.readFile(p,(err,fileContent)=>{
            if(err){
                cb([]);
            }
            cb(JSON.parse(fileContent)) ;

        })
    }
}

//for more refactoring the code see the lec 103 on udemy
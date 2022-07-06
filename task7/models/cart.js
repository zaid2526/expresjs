
/*-- with sequelize------ */

const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Cart= sequelize.define('cart',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    }
});

module.exports=Cart









/* witgh file system

const fs = require('fs');
const path = require('path');

const rootDir=require('../util/path')

const p = path.join(
  rootDir,
  'data',
  'cart.json'
);

module.exports = class Cart{
    static addProduct(id,productPrice,productName,productSize){
        //// Fetch the previous cart....
        fs.readFile(p,(err,fileContent)=>{
            let cart={ products:[], totalPrice:0 }
            if(!err){
                cart=JSON.parse(fileContent);
                // console.log("cart",cart);
            }
            //anylyzethe product that it present or not..
            const existingProductIndex= cart.products.findIndex(
                prod=>prod.id==id && prod.size==productSize);
            const existingProduct=cart.products[existingProductIndex];
            // console.log("existingProduct",existingProduct);
            let updatedProduct;
            if(existingProduct){
                updatedProduct={ ...existingProduct }
                updatedProduct.qty=updatedProduct.qty+1;
                updatedProduct.size=updatedProduct.size=productSize;
                cart.products=[ ...cart.products];
                cart.products[existingProductIndex]=updatedProduct;
            }else{
                updatedProduct= {id:id,productName:productName,size:productSize,qty:1};
                cart.products=[ updatedProduct]
                // cart.products=[ ...cart.products,updatedProduct]
                //executing else condition time cart.products always empty
                //so we do not need to use spread operator ... 
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p,JSON.stringify(cart),err=>{
                console.log('err',err);
            });

        })
    }
}

*/   



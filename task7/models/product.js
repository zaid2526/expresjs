/*
const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
  
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id=Math.floor(Math.random() * 1000).toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static update(id, prodDetails) {
    getProductsFromFile(products => {
      const existingProductIndex= products.findIndex(
        prod=>prod.id==id );
      console.log("existingProductIndex", existingProductIndex);
      const updatedProduct = [...products]
      updatedProduct[existingProductIndex] = prodDetails;
      // console.log("updated....",updatedProduct);
      fs.writeFile(p, JSON.stringify(updatedProduct), err => {
        console.log('err', err);
      });
    });
  }

  static delete(id){
    getProductsFromFile(products => {
      const existingProductIndex= products.findIndex(
        prod=>prod.id==id );
      // console.log("existingProductIndex",existingProductIndex);
      const updatedProduct=[...products]
      updatedProduct.splice(existingProductIndex,1);
      // updatedProduct[existingProductIndex]=prodDetails;
      fs.writeFile(p, JSON.stringify(updatedProduct), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id,cb) {
    getProductsFromFile(products => {
      const product =products.find(p=> p.id === id)
      cb(product);
    });
  }
};
*/

// const db=require('../util/database');

// module.exports = class Product {
//   constructor(title, imageUrl, description, price) {
  
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return db.execute(
//       'INSERT INTO products (title, price, imageUrl,description) values(?,?,?,?)',
//       [this.title,this.price, this.imageUrl,this.description]
//     )
    
//   }

//   static update(id,productdetails) {
//     // return db.execute('UPDATE products SET title = ?, price = ?, description=?, imageUrl=? WHERE id = ?',
//     //   [productdetails.id,productdetails.price,productdetails.description,productdetails.imageUrl],
//     //   [id]

//     // )
    
//   }

//   static delete(id){
//     return db.execute(`DELETE FROM products WHERE id=?`,[id])  
//   }

//   static fetchAll() {
//     return db.execute('SELECT * FROM products');
    
//   }

//   static findById(id) {
//     return db.execute(`SELECT * FROM products WHERE id=?`,[id])
  
//   }
// }

/* --with sequelize...... */
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imageUrl: Sequelize.STRING,
  description: Sequelize.STRING
});

module.exports = Product;
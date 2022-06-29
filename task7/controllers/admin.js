const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  // const prodId=req.body.productId; we send productID in params.. not in the body
  //i.e. inejs file using the <a> tag not form and submit button.. 
  const prodId=req.params.productId
  Product.findById(prodId,product=>{
    console.log("editProduct",product);
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      product:product
  });
  })
};
exports.postEditProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  console.log(prodId);
  const product={
    id:req.body.productId,
    title : req.body.title,
    imageUrl: req.body.imageUrl,
    description : req.body.description,
    price : req.body.price
  }
  Product.update(prodId,product);
  res.redirect('/admin/products')
};

exports.deleteProduct=(req,res,next)=>{
  const prodId=req.body.productId
  console.log(prodId);
  Product.delete(prodId)
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

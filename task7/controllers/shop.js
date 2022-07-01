const Product = require('../models/product');
const Cart=require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, prod=>{
    res.render('shop/product-detail',{
      product:prod,
      pageTitle:'Product Details',
      path:'/'
    })
    
  })
  // console.log(prod);
  //   res.redirect('/')
  
  // Product.findById(prodId, prod => {
  //   console.log("prod", prod);
  //   res.render('shop/product-detail',
  //     {
  //       product: prod,
  //       pageTitle: prod.title,
  //       path: '/product'

  //     })
  // })

}

exports.getIndex = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('shop/index', {
  //     prods: products,
  //     pageTitle: 'Shop',
  //     path: '/'
  //   });
  // });

  Product.fetchAll()
    .then(([row,fieldData])=>{
      // console.log(row);
      res.render('shop/index', {
            prods: row,
            pageTitle: 'Shop',
            path: '/'
          });
    })
    .catch(err=>console.log(err));
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};
exports.postCart =(req,res,next)=>{
  
  const prodId=req.body.productId;
  // console.log("postCart",prodId);
  Product.findById(prodId,product=>{
    const productSize=req.body.size;
    Cart.addProduct(prodId,product.price,product.title,productSize);
    res.redirect('/cart')
  })
  
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

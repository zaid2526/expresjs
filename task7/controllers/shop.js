const Product = require('../models/product');
const Cart=require('../models/cart')

exports.getProducts = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('shop/product-list', {
  //     prods: products,
  //     pageTitle: 'All Products',
  //     path: '/products'
  //   });
  // });

  /*---- with mySql----*/
  // Product.fetchAll()
  //   .then(([products])=>{
  //     console.log("all",products);
  //     res.render('shop/product-list', {
  //           prods: products,
  //           pageTitle: 'All Products',
  //           path: '/products'
  //         });
  //   })
  //   .catch();

  /*-------- with sequelize ------*/
  Product.findAll()
    .then(products=>{
      res.render('shop/product-list', {
                  prods: products,
                  pageTitle: 'All Products',
                  path: '/products'
                });
    })
    .catch(err=>{console.log(err);})
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  
  /*----- with file System ------*/
  //  Product.findById(prodId, prod=>{
  //   res.render('shop/product-detail',{
  //     product:prod,
  //     pageTitle:'Product Details',
  //     path:'/'
  //   })
    
  // })
  
  /*------ ony with mysql-----*/
  // Product.findById(prodId)
  //   .then(([product])=>{
  //     console.log("sajdgs",product);
  //     res.render('shop/product-detail', {
  //           product:product[0],
  //           pageTitle: 'Product Details',
  //           path: '/products',
  //       });
  //   })
  //   .catch(err=>console.log(err));

    /*---with sequelize------*/
    //1... 
    // Product.findByPk(prodId)
    // .then((product)=>{
    //   console.log("sajdgs",product);
    //   res.render('shop/product-detail', {
    //         product:product,
    //         pageTitle: 'Product Details',
    //         path: '/products',
    //     });
    // })
    // .catch(err=>console.log(err));

    //2...... findAll return an array of result, even a single element is.. in array
    // Product.findAll( { where: { id: prodId } })
    // .then((products)=>{
    //   console.log("sajdgs",products[0]);
    //   res.render('shop/product-detail', {
    //         product:products[0],
    //         pageTitle: 'Product Details',
    //         path: '/products',
    //     });
    // })
    // .catch(err=>console.log(err));
    //3.......
    Product.findOne( { where: { id: prodId } })
    .then((products)=>{
      console.log("sajdgs",products);
      res.render('shop/product-detail', {
            product:products,
            pageTitle: 'Product Details',
            path: '/products',
        });
    })
    .catch(err=>console.log(err));

  

}

exports.getIndex = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('shop/index', {
  //     prods: products,
  //     pageTitle: 'Shop',
  //     path: '/'
  //   });
  // });

  /*------- with only MySql----*/
  // Product.fetchAll()
  //   .then(([row,fieldData])=>{
  //     // console.log(row);
  //     res.render('shop/index', {
  //           prods: row,
  //           pageTitle: 'Shop',
  //           path: '/'
  //         });
  //   })
  //   .catch(err=>console.log(err));

  /*----- with sequelize -----*/
  Product.findAll()
    .then(products=>{
      res.render('shop/index', {
                  prods: products,
                  pageTitle: 'Shop',
                  path: '/'
                });
    })
    .catch(err=>{console.log(err);})
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart=>{
      cart.getProducts()
        .then(products=>{
            // console.log("products from cart",products);
            res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products:products
          });
        })
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
  
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart=cart;
      return cart.getProducts({where:{id:prodId}})
    })
    .then(products=>{
      let product;
      if(products.length>0){
        product=products[0];
      }
      newQuantity=1;
      if(product){
        //... if already exist then increase the quantity only...
        // console.log("already Products",product.cartItem);
        // if we cpomments theese block of code then product quantity does not 
        //increase .....
        let oldQuantity=product.cartItem.quantity;
        newQuantity=oldQuantity+1;
        return product;
      }
      return Product.findAll({where:{id:prodId}});
    })
    .then(product=>{
      return fetchedCart.addProduct(product,{
        through:{quantity:newQuantity}
      })
    })
    .then((data)=>{
      // console.log("datdatdtadtad",data);// print [1] ie. one item added 
      res.redirect('/cart')
    })
    .catch(err => { console.log(err); })

  

  // with file System
  // Product.findById(prodId,product=>{
  //   const productSize=req.body.size;
  //   Cart.addProduct(prodId,product.price,product.title,productSize);
  //   res.redirect('/cart')
  // })

}

exports.postDeleteCartProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  console.log(prodId);
  let newQuantity;
  let fetchedCart;
  let product;
  req.user
    .getCart()
    .then(cart=>{
      fetchedCart=cart;
      return cart.getProducts({where:{id:prodId}})
    })
    .then(products=>{
      product=products[0];
      let oldQuantity=product.cartItem.quantity;
      newQuantity=oldQuantity-1;
      if(newQuantity<=0){
        return product.cartItem.destroy();
      }
      return fetchedCart.addProduct(product,{through:{quantity:newQuantity}})
    })
    .then(result=>{
      res.redirect('/cart')
    })
    .catch(err=>{console.log(err);})
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

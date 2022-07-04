
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false,
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

  
  // const product = new Product(title, imageUrl, description, price);
  // product.save();
  // res.redirect('/');

  /*..........with database...........*/
  // const product = new Product(title, imageUrl, description, price);
  // product.save()
  //   .then(()=>res.redirect('/'))
  //   .catch(err=>console.log(err));
  
  /*----- with sequelize-----------*/
  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  })
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products')
    })
    .catch(err => {
      console.log(err);
    });

};

exports.getEditProduct = (req, res, next) => {
  // const prodId=req.body.productId; we send productID in params.. not in the body
  //i.e. inejs file using the <a> tag not form and submit button.. 
  const prodId=req.params.productId
  // Product.findById(prodId,product=>{
  //   console.log("editProduct",product);
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     product:product
  // });
  // })
  /*----- with mysql-----*/
  // Product.findById(prodId)
  //   .then(([product])=>{
  //     console.log('find to edit ',product[0]);
  //     res.render('admin/edit-product', {
  //           pageTitle: 'Edit Product',
  //           path: '/admin/edit-product',
  //           product:product[0]
  //       });

  //   })
  //   .catch(err=>console.log(err));

  /*------ only with sequelize ------*/
  Product.findAll({where:{id:prodId}})
  .then((product)=>{
    console.log('find to edit ',product);
    res.render('admin/edit-product', {
          pageTitle: 'Edit Product',
          path: '/admin/edit-product',
          product:product[0]
      });

  })
  .catch(err=>console.log(err));
};

// exports.getEditProduct = (req, res, next) => {
//   // const prodId=req.body.productId; we send productID in params.. not in the body
//   //i.e. inejs file using the <a> tag not form and submit button.. 
//   const prodId=req.body.productId
//   Product.findById(prodId,product=>{
//     console.log("editProduct",product);
//     res.render('admin/edit-product', {
//       pageTitle: 'Edit Product',
//       path: '/admin/edit-product',
//       product:product
//   });
//   })
// };

// //with quiry param
// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   console.log(editMode);
//   if (!editMode) {
//     return res.redirect('/')
//   }
//   const prodId = req.params.productId
//   console.log("prodID",prodId);
//   Product.findById(prodId, product => {
//     if(!product){
//       res.send("product not found..!!!!!")
//     }
//     res.render('admin/edit-product', {
//       pageTitle: 'Edit Product',
//       path: '/admin/edit-product',
//       product: product,
//       editing: editMode
//     });
//   })
// };

exports.postEditProduct = (req, res, next) => {
  /*--- with mysql-----*/
  // const prodId = req.body.productId;
  // console.log("iddddd",prodId);
  // const product = {
  //   id: prodId,
  //   title: req.body.title,
  //   imageUrl: req.body.imageUrl,
  //   description: req.body.description,
  //   price: req.body.price,
    
  // }
  // Product.update(prodId, product)
  //   .then(()=>res.redirect('/admin/products'))
  //   .catch(err=>{console.log(err);});
  /*---  with sequellize----*/
  const prodId = req.body.productId;
  const updatedTitle=req.body.title;
  const updatedPrice=req.body.price;
  const updatedImageUrl=req.body.imageUrl;
  const updatedDescription=req.body.description;
  Product.update({
    title:updatedTitle,
    price:updatedPrice,
    imageUrl:updatedImageUrl,
    description:updatedDescription
  },{
    where:{id:prodId}
  })
  .then(()=>{
    console.log('updated');
    res.redirect('/admin/products')
  })
  .catch(err=>console.log(err))
  

};

exports.deleteProduct=(req,res,next)=>{
  const prodId=req.body.productId
  // console.log(prodId);
  /*---- with mysql----*/
  // Product.delete(prodId)
  // .then(()=>res.redirect('/admin/products'))
  // .catch(err=>console.log(err))
  // // res.redirect('/admin/products')

  /*----with sequilize-----*/
  // Product.findAll({where:{id:prodId}})
  //   .then(product=>{
  //     return product.destroy();
  //   })
  //   .then(result=>{
  //     console.log('product destroy');
  //     res.redirect('/admin/products')
  //   })
  //   .catch(err=>console.log(err))
  
  Product.destroy({where:{id:prodId}})
    .then(result=>{
          console.log('product destroy');
          res.redirect('/admin/products')
        })
    .catch(err=>console.log(err))
};

exports.getProducts = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // });

  /*----- only with mysql------*/
  // Product.fetchAll()
  //   .then(([row,fieldData])=>{
  //     // console.log(row);
  //     res.render('admin/products', {
  //           prods: row,
  //           pageTitle: 'Admin Products',
  //           path: '/admin/products'
  //     });
  //   })
  //   .catch(err=>console.log(err));

  /*----- with sequelize------*/
  Product.findAll()
  .then(products=>{
    // console.log(row);
    res.render('admin/products', {
          prods: products,
          pageTitle: 'Admin Products',
          path: '/admin/products'
    });
  })
  .catch(err=>console.log(err));
};

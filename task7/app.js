const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const db = require('./util/database');
const sequelize = require('./util/database');
const Product= require('./models/product')
const User= require('./models/user');
const Cart= require('./models/cart');
// const CartItem= require('./models/cart-item');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//adding middleware for User  model to attached their id into product model
app.use((req,res,next)=>{
  User.findByPk(1)
    .then(user=>{
      req.user=user; // it is a sequelize object 
                    // (i.e. req.user has the value of user from the User table)
      next();
    })
    .catch(err=>{console.log(err);})
  
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);

Product.belongsTo(User,{ constraints:true, onDelete:'CASCADE'});
User.hasMany(Product);

User.hasOne(Cart);//a user has only one cart
Cart.belongsTo(User);// it is optional and just opposite of above..

// Cart.belongsToMany(Product,{through:CartItem});
// Product.belongsToMany(Cart,{through:CartItem});

sequelize
  .sync({force:true})
  // .sync()
  .then(()=>{
    // console.log(result);
    return User.findByPk(1);
  })
  .then(user=>{
    if(!user){
      return User.create({name:'zaid',email:'zaid@gmail.com'})
    }
    console.log('user already exist');
    return user;// even then() return a simple object, it will be wrapup in promise 
  })
  .then((user)=>{
    return user.createCart();
    
  })
  .then((cart)=>{
    // console.log("cart", cart);
   app.listen(3033); 
  })
  .catch(err=>console.log(err))


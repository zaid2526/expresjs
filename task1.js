
//1..............
// Express was created to make APIs and web applications with ease,
// It saves a lot of coding time almost by half and still makes
// web and mobile applications are efficient.
// The reason behind creating an express framework for node js is:
// Time-efficient
// Fast 
// Asynchronous

// Features of Express JS
// Fast Server-Side Development 
// The features of node js help express saving a lot of time.

// Middleware
// Middleware is a request handler that has access to the application's request-response cycle.
        // without express.js it will be very complex
// Routing 
// It refers to how an application's endpoint's URLs respond to client requests.

// Templating 
// It provides templating engines to build dynamic content on the web pages by creating HTML templates on the server.

// Debugging 
// Express makes it easier as it identifies the exact part where bugs are.

//2... install express.js
// npm install --save express

//3................
// Middleware
// Middleware is a request handler that has access to the application's 
//request-response cycle. it provide some function that can access the 
//request-response object and next middleware function used to modify req and res objects for 
//tasks like parsing request bodies, adding response headers, etc.

//4................
// next middleware function in the application’s request-response cycle. 
// are used to modify req and res objects for tasks like parsing 
// request bodies, adding response headers, etc.

//5... What is res.send used for?
// it is used for sendding the response, due to this we don't need to setHeaders
// manually, it will ne done in the behind sceane.

//6... If i do res.send('<h1> hello to node js </h1>') . 
// What will be the content-type header equal to.
// it is....  Content-Type:text/html

//7... If I do res.send( { key1: value }) . 
//What will be the content-type header equal to.
// it is...  Content-Type: application/json;


//8.... What does app.listen(3000) do behind the scenes ?
//it is similar to...
//server=http.createServer(routes.handler)
//server.listen(3000);

const expres= require('express')

const app=expres();// we call as a method because express export as a method.

app.use((req,res,next)=>{
    console.log("in the middleware");
    next();// travell to the next middleware
});

app.use((req,res,next)=>{
    console.log("in the another middleware");
    res.type('html') 
    res.send('<h1> hello from express.!</h1>');
    
    
    // res.send(`{ key1: value }`);
    //when use send() does not need to setHeaders.
});

app.listen(3030);
//it is same as these below line..
//server=http.createServer(routes.handler)
//server.listen(3000);
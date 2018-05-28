'use strict';
var express = require('express');
var app = express();
var routers = require('./routers');
var jsonParser =  require('body-parser').json;
var logger = require('morgan');

var jsonCheck = function(req,res,next){
    if(req.body){
        console.log(req.body.color);
    }else{
        console.log('no body');
    }
    next();
}

app.use(logger('dev'));

//app.use(jsonCheck);
app.use(jsonParser());
//app.use(jsonCheck);

app.use("/questions",routers);

// app.use(function(req,res,next){
//     req.myMess = 'hello';
//     console.log('middleware');
//     next();
// })
// app.use(function(req,res,next){
//     console.log('middleware,again',req.myMess);
//     next();
// })

//catch 404 error
app.use(function(req,res,next){
    var error = new Error("not found");
    error.status = 404;
    next(error);
})
//error handle
app.use(function(err,req,res,next){
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
})

var port = process.env.PORT || 3000;
app.listen(port,function(){
    console.log('listening',port);
});
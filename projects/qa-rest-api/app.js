'use strict';
var express = require('express');
var app = express();
var routers = require('./routers');
var jsonParser =  require('body-parser').json;
var logger = require('morgan');
var mongoose = require('mongoose');

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

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	if(req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
		return res.status(200).json({});
	}
	next();
});

mongoose.connect('mongodb://localhost:27017/sandbox');
var db = mongoose.connection;
db.on("error",function(error){
    console.error("connection error", error);
})
db.once('open',function(){
    console.log("connection start");
})

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
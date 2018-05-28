'use strict';
var express = require('express');
var router = express.Router();

//GET /questions/
router.get('/',function(req,res){
    //return all the questions
    res.json({response: "you sent a GET"});
})

//POST /questions/
router.post('/',function(req,res){
    //create a question
    res.json({
        response: "you sent a post",
        body: req.body
    });
})

//GET /questions/:id
router.get('/:id',function(req,res){
    //return the questions
    res.json({response: "you sent a GET" + req.params.id});
})

//POST /questions/:id/answers
router.post('/:id/answers',function(req,res){
    //create a answer
    res.json({
        response: "you sent a post",
        questionID: req.params.id,
        body: req.body
    });
})

//PUT /questions/:id/answers/:id
router.put('/:id/answers/:aid',function(req,res){
    //update a answer
    res.json({
        response: "you sent a PUT",
        questionID: req.params.id,
        answerID: req.params.aid,
        body: req.body
    });
})

//DELETE /questions/:id/answers/:id
router.delete('/:id/answers/:aid',function(req,res){
    //delete a answer
    res.json({
        response: "you sent a DELETE",
        questionID: req.params.id,
        answerID: req.params.aid
    });
})

//POST /questions/:id/answers/:id/vote-up
//POST /questions/:id/answers/:id/vote-down
router.post('/:id/answers/:aid/vote-:dir',function(req,res,next){
    if(req.params.dir.search(/^(up|down)$/) === -1){
        var err = new Error("not found");
        err.status = 404;
        next(err);
    }else{
        next();
    }
},function(req,res){
    res.json({
        response: "you sent a POST"+req.params.dir,
        questionID: req.params.id,
        answerID: req.params.aid,
        vote: req.params.dir
    });
})

// //POST /questions/:id/answers/:id/vote-down
// router.post('/:id/answers/:aid/vote-down',function(req,res){
//     //vote down  a answer
//     res.json({
//         response: "you sent a POST",
//         questionID: req.params.id,
//         answerID: req.params.aid
//     });
// })

//GET /questions/5/answer
//router.get('/5/answer')

module.exports = router;
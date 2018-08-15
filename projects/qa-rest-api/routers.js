'use strict';
var express = require('express');
var router = express.Router();
var Question = require("./models").Question;

router.param("id",function(req,res,next,id){
    Question.findById(id,function(err,doc){
        if(err) return next(err);
        if(!doc){
            err = new Error("not found");
            err.status = 404;
            return next(err);
        }
        req.question = doc;
        return next();
    });
});
router.param("aid",function(req,res,next,aid){
    req.answer = req.question.answers.id(aid);
    if(!req.answer){
        err = new Error("not found");
        err.status = 404;
        return next(err);
    }
    next();
});
//GET /questions/
router.get('/',function(req,res,next){
    // Question.find({},null,{sort: {createdAt : -1}},function(err,questions){
    //     if(err) return next(err);
    //     res.json(questions);
    // })
    //return all the questions
    //res.json({response: "you sent a GET"});
    Question.find({})
            .sort({createdAt : -1})
            .exec(function(err,questions){
                if(err) return next(err);
                res.json(questions);
            })
})

//POST /questions/
router.post('/',function(req,res,next){
    var question = new Question(req.body);
    question.save(function(err,question){
        if(err) return next(err);
        res.status(201);
        res.json(question);
    })
    //create a question
    // res.json({
    //     response: "you sent a post",
    //     body: req.body
    // });
})

//GET /questions/:id
router.get('/:id',function(req,res,next){
    //return the questions
    //res.json({response: "you sent a GET" + req.params.id});

    // Question.findById(req.params.id,function(err,doc){
    //     if(err) return next(err);
    //     res.json(doc);
    // });

    res.json(req.question);
})

//POST /questions/:id/answers
router.post('/:id/answers',function(req,res,next){
    //create a answer
    // res.json({
    //     response: "you sent a post",
    //     questionID: req.params.id,
    //     body: req.body
    // });
    req.question.answers.push(req.body);
    req.question.save(function(err,question){
        if(err) return next(err);
        res.status(201);
        res.json(question);
    })
})

//PUT /questions/:id/answers/:id
router.put('/:id/answers/:aid',function(req,res,next){
    //update a answer
    // res.json({
    //     response: "you sent a PUT",
    //     questionID: req.params.id,
    //     answerID: req.params.aid,
    //     body: req.body
    // });
    req.answer.update(req.body,function(err,result){
        if(err) return next(err);
        res.json(result);
    });
})

//DELETE /questions/:id/answers/:id
router.delete('/:id/answers/:aid',function(req,res,next){
    //delete a answer
    // res.json({
    //     response: "you sent a DELETE",
    //     questionID: req.params.id,
    //     answerID: req.params.aid
    // });
    req.answer.remove(function(err){
        req.question.save(function(err,question){
            if(err) return next(err);
            res.json(question);
        });
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
        req.vote = req.params.dir;
        next();
    }
},function(req,res,next){
    // res.json({
    //     response: "you sent a POST"+req.params.dir,
    //     questionID: req.params.id,
    //     answerID: req.params.aid,
    //     vote: req.params.dir
    // });
    req.answer.vote(req.vote,function(err,question){
        if(err) return next(err);
        res.json(question);
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
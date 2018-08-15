'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sortAnswer = function(a,b){
    //- negative a before b
    //0 no change
    //+ positive b before a
    if(b.votes === a.votes){
        // if(a.updatedAt > b.updatedAt){
        //     return -1;
        // }else if(a.updatedAt = b.updatedAt){
        //     return 0;
        // }else{
        //     return 1;
        // }
        return b.updatedAt - a.updatedAt
    }else{
        return b.votes - a.votes;
    }  
}
//mongoose.connect('mongodb://localhost:27017/sandbox');
var AnswerSchema = new Schema({
    text: String,
    createdAt: {type:Date,default:Date.now},
    updatedAt: {type:Date,default:Date.now},
    votes: {type:Number,default:0}
});
// AnswerSchema.methods.update = function(updates,callback){
//     //this = document
//     //return this.model('animal').find({color:this.color},callback);
// };
AnswerSchema.method("update", function(updates,callback){
    //this = document
    Object.assign(this,updates,{updatedAt:new Date()});
    this.parent().save(callback);

});
AnswerSchema.method("vote", function(vote,callback){
    //this = document
    if(vote === "up"){
        this.votes += 1;
    }else{
        this.votes -= 1;
    }
    this.parent().save(callback);

});
var QuestionSchema = new Schema({
    text: String,
    createdAt: {type:Date,default:Date.now},
    answers: [AnswerSchema]
});

QuestionSchema.pre('save',function(next){
    this.answers.sort(sortAnswer);//[object object]
    next();
})

var Question = mongoose.model('Question',QuestionSchema);
module.exports.Question = Question;
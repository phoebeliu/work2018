'use strict';
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sandbox');
var db = mongoose.connection;
db.on("error",function(error){
    console.error("connection error", error);
})
db.once('open',function(){

    var Schema = mongoose.Schema;
    var AnimalSchema = new Schema({
        type:{type:String,default:'bird'},
        color:{type:String,default:'blue'},
        size: String
    });
    AnimalSchema.pre('save',function(next){
        if(this.color =='yellow'){
            this.size = 'small';
        }else{
            this.size = 'medium';
        }
        next();
    })
    AnimalSchema.statics.findSize = function(size,callback){
        //this = Animal
        return this.find({size:size},callback);
    };
    AnimalSchema.methods.findColor = function(color,callback){
        //this = document
        return this.model('animal').find({color:color},callback);
    };
    var Animal = mongoose.model('animal',AnimalSchema);
    
    var elephant = new Animal({
        type: 'ele',
        color: 'red'
    });
    var animalData = [{
        type: 'ele',
        color: 'red'
    },{
        type: 'tete',
        color: 'yellow'
    },{
        type: 'sgsgsg',
        color: 'blue'
    },elephant];
    // elephant.save(function(err){
    //     if(err){
    //         console.error('save error',err);
    //     }else{
    //         console.log('save');
    //     }
    //     db.close(function(){
    //         console.log('close');
    //     });
    // });
    Animal.remove({},function(err){
        if(err){
            console.error('save error',err);
        }
        Animal.create(animalData,function(err,animals){
            if(err){
                console.error('save error',err);
            }else{
                console.log('save');
                // animals.forEach(function(animal){
                //     console.log(animal.size);
                // });
                Animal.findSize('medium',function(err,animals){
                    animals.forEach(function(animal){
                        console.log(animal.size + ' '+animal.type);
                    });
                    db.close(function(){
                        console.log('close');
                    });
                })
            };
            
        })
    
    })
    
    
})
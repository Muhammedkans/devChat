const mongoose = require("mongoose");
const validator = require("validator");

const userschema =new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    minLength:4,
    maxLength:50,
  },
  lastName:{
    type:String,
    
  },
  emailId:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("user validation failed " + value)
      }
    }
   
  },
  password:{
    type:String,

    validate(value){
      if(!validator.isStrongPassword(value)){
        throw  new Error("user validation failed " + value)
      }
    },


  },

  age:{
    type:Number,
    min:18,

  },
  gender:{
    type:String,
    validate(value){
     if(!["male" , "female" , "others"].includes(value)){
      throw new Error("Gender data is not valid");
     }
    },
  },

  photoUrl: {
    type:String,
    validate(value){
      if(!validator.isURL(value)){
        throw  new Error("user validation failed " + value)
      }
    },
  },

  about:{
    type:String,
    default: "this is a adefault of the user",
  },
  skills:{
    type:[String],
  },

},{
   timestamps:true,
},)

const User = mongoose.model('User',userschema);

module.exports = User;
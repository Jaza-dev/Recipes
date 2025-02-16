import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({

    name:{
        type:String
    },
    surname:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    createdAt:{
        type:Date
    }

})

export default mongoose.model('UserModel', User, 'users')
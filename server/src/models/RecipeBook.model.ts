import mongoose from "mongoose";

const Schema = mongoose.Schema;

let RecipeBook = new Schema({

    name: {
        type:String
    },
    description: {
        type:String
    },
    color: {
        type:String
    },
    createdAt:{
        type:Date
    },
    userId: {
        type:String
    }

});

export default mongoose.model('RecipeBookModel', RecipeBook, 'recipeBooks');
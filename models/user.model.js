const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating user schema
const userSchema = new Schema({
    //I am using lot of validation for usename hence multiple lines
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
}, { timestamps: true});

//creating the user model with the schema defined above
const User = mongoose.model('User', userSchema);

//exproting the user model
module.exports = User;
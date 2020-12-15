const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//defining exercise schema
const exerciseSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
},{timestamps: true});

//creating exercise model with schema defined above
const Exercise = mongoose.model('Exercise', exerciseSchema);

//exporting the model exercise model
module.exports = Exercise;
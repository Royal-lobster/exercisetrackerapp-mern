//importing stuff
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

//middlewares
dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

//setting mongodb
const uri = process.env.ATLAS_URL;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully");
})

//routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//heroku production client build
if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'));
    const path = require('path');
    app.get("*", (req, res) =>{
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
    });
}
//listen to port
app.listen(port, ()=>{
    console.log(`Server started on port: ${port}`);
});
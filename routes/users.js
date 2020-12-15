const router = require('express').Router();
let User = require('../models/user.model');

//if we get GET request sent the data
router.route('/').get((req,res)=>{
    //find the user list and sent to client
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

//if we get POST request recieve the data
router.route('/add').post((req,res)=>{
    //taking the new user name form client
    const username = req.body.username;
    //adding the user to database
    const newUser = new User({username});
    //saving the database with new user
    newUser.save()
        .then(()=> res.json('user added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
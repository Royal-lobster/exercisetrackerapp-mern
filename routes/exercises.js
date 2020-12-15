const router = require("express").Router();
let Exercise = require("../models/exercise.model");

//if we get GET request sent the data
router.route("/").get((req,res) => {
  //find the exercise list and sent to client
  Exercise.find()
    .then((exercise => res.json(exercise)))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//if we get POST request recieve the data
router.route("/add").post((req, res) => {
  //taking the new exercise form client
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  //adding the new exercise to database
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });
  //saving the database with new exercise
  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//get request with specific param
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

//delete with specific param with delete request
router.route("/:id").delete((req, res) => {
  //find the excercise by id in param and delete
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//update a excercise by POST request and save to database
router.route("/update/:id").post((req, res) => {
  //find the exercise by the id in params and update with the info in body of post req
  Exercise.findById(req.params.id)
    .then((exercise) => {
      //overwriting the excercise information
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);
      //saving the modified information
      exercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

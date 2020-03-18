const router = require("express").Router();
const db = require("../models");


// const res = await fetch("/api/workouts", {
  // method: "POST",
router.post("/api/workouts", ({ body }, res) => {
  console.log(body);
  db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/transaction/bulk", ({ body }, res) => {
  Transaction.insertMany(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//res = await fetch("/api/workouts");
router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .sort({ date: -1 })
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


// const res = await fetch("/api/workouts/" + id, {

  // addExercise() PUT "/api/workouts"
  router.put("/api/workouts/:id", (req, res, next) => {
    let body = req.body;
    // console.log(body);    
    let id = req.params.id;
    console.log(body)
   db.Workout.findByIdAndUpdate(id, { $push: { exercises: body } })
      .then(dbWorkout => {
        console.log(dbWorkout)
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

module.exports = router;

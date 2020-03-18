const router = require("express").Router();
const db = require("../models");

// const res = await fetch("/api/workouts", {
router.post("/api/transaction", ({ body }, res) => {
  Transaction.create(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
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
    // .sort({ date: -1 })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


// const res = await fetch("/api/workouts/" + id, {



module.exports = router;

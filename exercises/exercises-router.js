const router = require('express').Router();
const db = require('../database/dbConfig');


router.post("/", async (req, res, next) => {
    const newExercise = req.body
  
    db("exercises")
    .insert(newExercise)
    .then(exercise => {
        res.json(exercise);
    })
    .catch(err => {
      console.log
      res.status(500).json({ message: "Failed to submit exercise" + err });
    });
  });

module.exports = router;
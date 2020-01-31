const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../database/dbConfig");
const secrets = require("../config/secrets");const exercisesRouter = require("../exercises/exercises-router");


router.use("/exercises", exercisesRouter);

// Adds new workout

router.post("/", async (req, res, next) => {
  const newWorkout = req.body;

  db("workouts")
    .insert(newWorkout)
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      console.log;
      res.status(500).json({ message: "Failed to submit workout" + err });
    });
});

// Gets all workouts

router.get("/", (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, secrets.jwt);

  const user_id = decoded.subject;

  db("workouts")
    .where({ user_id })
    .then(workouts => {
      res.json(workouts);
    })
    .catch(err => {
      console.log;
      res.status(500).json({ message: "Failed to retrieve workouts" + err });
    });
});

// Gets all exercises for a workout

router.get(`/:id`, (req, res) => {
  const id = req.params.id;
  db("exercises")
    .where({ id })
    .then(exercises => {
      res.json(exercises);
    })
    .catch(err => {
      console.log;
      res.status(500).json({ message: "Failed to retrieve exercises" + err });
    });
});

// Updates workouts

router.put(`/:id`, (req, res) => {
  const id = req.params.id;
  db("workouts")
    .where({ id })
    .update( req.body )
    .then(workouts => {
      res.json(workouts);
    })
    .catch(err => {
      console.log;
      res.status(500).json({ message: "Failed to update workout" + err });
    });
});

// Deletes workouts

router.delete(`/:id`, (req, res) => {
  const id = req.params.id;
  db("workouts")
    .where({ id })
    .del()
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      console.log;
      res.status(500).json({ message: "Failed to delete workout" + err });
    });
});

module.exports = router;

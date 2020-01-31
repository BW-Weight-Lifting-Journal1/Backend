# Backend
    Author: https://github.com/mwoodiwiss
    Product Canvas: https://docs.google.com/document/d/1V1VXbNNbilVNaGUc1eWgsgP4IOaMADXYmWf1ZdFQoCw/edit#

## Description

This is the back end for a Weight lifting journal. It's hard to keep track of how many reps you can do or how much you usually deadlift. This app keeps it all organized and tracked for you.

## Endpoints

| Method | Endpoint                      | Description                                                                                  |
| ------ | ----------------------------  | -------------------------------------------------------------------------------------------- |
| POST   | /api/auth/register            | Creates a `user` using the information sent inside the `body` of the request. password is    |
|        |                               | hashed before saving the user to the database.                                               |

| POST   | /api/auth/login               | Uses the credentials sent inside the `body` to authenticate the user. On successful login    |
|        |                               | creates a new JWT with the user id as the subject and sends it back to the client. If login  |
|        |                               | fails, respond with the correct status code.                                                 |

| POST   | /api/workouts                 | Uses the JWT sent inside the `header` to authorize the user. On successful authorization, it |
|        |                               | adds the workout to the users database. If the user is not logged in, or if the workout      |
|        |                               | schema isn't correct, it responds with the appropriate status code.                          |

| POST   | /api/workouts/exercises       | Uses the JWT sent inside the `header` to authorize the user. On successful authorization, it |
|        |                               | adds the exercise to the users database, under the workout. If the user is not logged in,    |
|        |                               | or if the exercise schema isn't correct, it responds with the appropriate status code.       |

| PUT    | /api/workouts/:id             | Uses the JWT sent inside the `header` to authorize the user. On successful authorization, it |
|        |                               | updates the workout with provided data. If the user is not logged in, or if the workout      |
|        |                               | schema isn't correct, it responds with the appropriate status code.                          |

| DELETE | /api/workouts/:id             | Uses the JWT sent inside the `header` to authorize the user. On successful authorization, it |
|        |                               | updates the workout with provided data. If the user is not logged in, or if the workout      |
|        |                               | schema isn't correct, it responds with the appropriate status code.                          |

| GET    | /api/workouts                 | Uses the JWT sent inside the `header` to authorize the user. On successful authorization, it |
|        |                               | responds with an array of all the workouts for that user. If the user is not logged in       |
|        |                               | it responds with the correct status code.                                                    |

| GET    | /api/workouts/:id             | Uses the JWT sent inside the `header` to authorize the user. On successful authorization,    |
|        |                               | it responds with an array of all the exercises for that workout. If the user is not logged   |
|        |                               | in it responds with the correct status code.                                                 |

## User schema

| Field            | Data Type | Metadata                                                                                               |
| ---------------- | --------- | ------------------------------------------------------------------------------------------------------ |
| id               | number    | no need to provide it when creating users, the database will generate it                               |
| username         | string    | unique, required.                                                                                      |
| password         | string    | required.                                                                                              |

## workout schema

| Field            | Data Type | Metadata                                                                                               |
| ---------------- | --------- | ------------------------------------------------------------------------------------------------------ |
| id               | number    | no need to provide it when creating workouts, the database will automatically generate it.             |
| workout_notes    | string    | no size limit, required. Used to record additional notes for workout.                                  |
| workout_date     | date      | required.                                                                                              |
| user_id          | number    | required, must be the id of an existing user.                                                          |

## Exercise schema

| Field            | Data Type | Metadata                                                                                               |
| -------------    | --------- | ------------------------------------------------------------------------------------------------------ |
| id               | number    | no need to provide it when creating exercises, the database will automatically generate it.            |
| exercise_name    | string    | required.                                                                                              |
| exercise_reps    | string    | required.                                                                                              |
| exercise_weight  | string    | required.                                                                                              |
| muscles_targeted | string    | required.                                                                                              |
| workout_id       | number    | required, must be the id of an existing workout.                                                       |
| user_id          | number    | required, must be the id of an existing user.                                                          |
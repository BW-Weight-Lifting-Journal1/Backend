exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();

      tbl.string("username", 255)
        .notNullable()
        .unique();
      tbl.string("password", 255).notNullable();
    })

    .createTable("workouts", tbl => {
      tbl.increments();

      tbl.string("workout_note", 255)
        .notNullable();
      tbl.string("workout_date", 255)
        .notNullable();
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
    })

    .createTable("exercises", tbl => {
      tbl.increments();
  
        
      tbl.string("exercise_name", 255)
        .notNullable();
      tbl.string("exercise_reps", 255);
      tbl.string("exercise_weight", 255);
      tbl.string("muscles_targeted", 255);
      tbl.integer('workout_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('workouts')
        .onDelete('CASCADE');
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
      })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTableIfExists("exercises")
  .dropTableIfExists("workouts")
  .dropTableIfExists("users")
};

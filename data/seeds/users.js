// replace the .del with .truncate
// replace table name with the name of the table in both lines

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Denise', password:'pw', role:'Student'},
        {id: 2, username: 'John', password:'pw', role:'Student'},
        {id: 3, username: 'Gabriel', password:'pw', role:'Student'}
      ]);
    });
};

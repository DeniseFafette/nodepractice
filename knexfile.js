// Update with your config settings.
// We only need the development part ... you delete below
// Add useNullAsDefault: true,
// filename is the name of your database

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      // location and name of the database
      filename: './data/users.db3'
    },
    migrations: {
      // location of migrations for the database
      directory: './data/migrations'
    },
    seeds: {
      // location of seed data for the database
      directory: './data/seeds'
    }
  }
};

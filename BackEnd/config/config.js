config =
{
  development: {
    username: "postgres",
    password: "1234",
    // password: "75utjgmbvfr4",
    database: "postgres",
    host: "localhost",
    dialect: "postgres",
    // port: "5433"
  },
  test: {
    username: "postgres",
    password: "1234",
    database: "postgres",
    host: "localhost",
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password: "1234",
    database: "postgres",
    host: "localhost",
    dialect: "postgres"
  }
}

module.exports = config;
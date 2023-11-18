const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "weatherApp",
    password: "5s2zdphj",
    port: 5432,
});

module.exports = pool;
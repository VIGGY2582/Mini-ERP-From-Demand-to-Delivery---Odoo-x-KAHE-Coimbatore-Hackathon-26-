const { Pool } = require("pg");

const pool = new Pool({
    user: "kaarthikrishaanth",
    host: "localhost",
    database: "mini_erp",
    password: "",
    port: 5432,
});

module.exports = pool;
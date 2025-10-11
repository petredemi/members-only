
const { Pool } = require("pg");

module.exports = new Pool({  
    host: process.env.SERV_HOST,
    user: process.env.USER_NAME,
    database: process.env.DATA_BASE,
    password: process.env.PSWORD,
    port: process.env.DEFAULT_PORT 
});

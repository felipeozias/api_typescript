const database = {
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    port: Number(process.env.DBPORT),
    max: 20,
    idleTimeoutMillis: 100,
};

export { database };

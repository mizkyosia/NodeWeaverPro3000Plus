import mysql from "mysql";

export const connection = mysql.createConnection({
    port: parseInt(process.env.MYSQLDB_DOCKER_PORT ?? "3306"),
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect((e) => {
    if (e) {
        console.log("Error connecting to the database : ", e);
    } else {
        console.log("Successfully connected to database as " + process.env.MYSQLDB_USER);
    }
});
// import mysql from "mysql2";
import { MongoClient, Db } from "mongodb";

const config = {
    host: 'db',
    port: parseInt(process.env.DB_DOCKER_PORT ?? "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_ROOT_PASSWORD,
    database: process.env.DB_NAME
};

console.log("Current config : ", config);

const client = new MongoClient(`mongodb://${config.user}:${config.password}@localhost:${config.port}`);

console.log("created client");

const db = client.db(config.database);

console.log("Successfully connected to database : ", db.databaseName);

interface Profile {
    name: string,
    joined_ts: string,
}

// db.createCollection<Profile>("profiles").then(v => {
//     console.log(
//         "Successfully created", v.collectionName
//     );
// });

console.log("Creating collection...");

export {
    db, client
}

// export const connection = mysql.createConnection(config);

// connection.connect((e) => {
//     if (e) {
//         console.log("Error connecting to the database : ", e);
//     } else {
//         console.log("Successfully connected to database as " + process.env.DB_USER);
//     }
// });
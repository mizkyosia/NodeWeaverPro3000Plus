import { Db, MongoClient } from 'mongodb';

const config = {
    host: 'db',
    port: parseInt(process.env.DB_DOCKER_PORT ?? "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_ROOT_PASSWORD,
    database: process.env.DB_NAME
};

const client = new MongoClient(`mongodb://${config.user}:${config.password}@localhost:${config.port}`);

// connect to the database
export async function connect(): Promise<void> {
    await client.connect();
}

// disconnect from the database
export async function disconnect(): Promise<void> {
    await client.close();
}

// get the database
export function getDB(): Db {
    return client.db(config.database);
}
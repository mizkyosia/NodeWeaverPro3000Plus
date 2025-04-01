import { connect } from '$db/connection';

// Connect to MongoDB before starting the server
connect().then((): void => {
    console.log("MongoDB started");
}).catch((e: Error) => {
    console.log("MongoDB failed to start");
    console.log(e);
});
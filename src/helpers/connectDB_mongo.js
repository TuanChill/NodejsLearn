const mongoose = require("mongoose");
const {createConnection} = require("mongoose");

const connectDB_mongo = createConnection(process.env.MONGO_URL);

connectDB_mongo.on("connected", function ()  {
    console.log(`Connected to MongoDB ${this.name}`);
});

connectDB_mongo.on("error", (err) => {
    console.log("Error connecting to MongoDB: ", err);
});

connectDB_mongo.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
});

process.once("SIGINT", async () => {
    await connectDB_mongo.close();
    await process.exit(0);
});

module.exports = connectDB_mongo;

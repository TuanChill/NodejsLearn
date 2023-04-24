const mongoose = require("mongoose");
const {createConnection} = require("mongoose");

const connectMongo = createConnection(process.env.MONGO_URL);

connectMongo.on("connected", function ()  {
    console.log(`Connected to MongoDB ${this.name}`);
});

connectMongo.on("error", (err) => {
    console.log("Error connecting to MongoDB: ", err);
});

connectMongo.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
});

process.once("SIGINT", async () => {
    await connectMongo.close();
    await process.exit(0);
});

module.exports = connectMongo;

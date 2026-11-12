const mongoose = require("mongoose");
const dns = require("node:dns");

dns.setServers(["8.8.8.8"], ["1.1.1.1"]);

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    }
    catch(err){
        console.error("Database failed to connect");
    }
}

module.exports = connectDB;
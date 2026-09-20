const mongoose = require('mongoose');

// Connects to MongoDB Atlas (or local MongoDB) using the connection
// string stored in the MONGO_URI environment variable.
// Called once, from server.js, before the server starts accepting requests.
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
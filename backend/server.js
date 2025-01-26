require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require('./routes/auth');


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/post"));

// MongoDB Connection
mongoose
    .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit the process with an error code
    });

// Start Server
app.listen(PORT, () => console.log(`http://localhost.com//${PORT}`));

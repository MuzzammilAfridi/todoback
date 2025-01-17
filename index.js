const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Frontend domain
  // origin: "https://todo-front-mern.vercel.app", // Frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Include this if cookies/auth headers are required
}));
 
app.use(bodyParser.json());
 
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI) 
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes

app.get('/', (req, res)=>{
  res.send("Hi this is Todo list")
})
 
const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 